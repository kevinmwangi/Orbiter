
<template>
    <div :class="$style.orbitContainer" ref="containerRef">
        <div
                v-for="(orbit, orbitIndex) in displayedOrbits"
                :key="orbit.contact_date"
                :class="$style.orbit"
                :style="{
                    width: `${getOrbitDiameter(orbitIndex)}px`,
                    height: `${getOrbitDiameter(orbitIndex) * 0.5}px`,
                    transform: `translateY(${-20}px) scale(${orbit.scale})`,
                    transition: 'transform 0.3s ease, opacity 0.3s ease',
                    'z-index': props.maxOrbits - (orbitIndex + 1),
                }">
            <div v-if="(orbitIndex + 1) === props.maxOrbits" :class="$style.currentDate" :style="getCurrentDate(orbitIndex)" ref="currentDate">{{ formatDate(orbit.contact_date) }}</div>
            <ProfileAvatar v-for="(avatar, avatarIndex) in getVisibleAvatars(orbit.array, orbitIndex)"
                           :key="avatar.id"
                           :avatarData="avatar"
                           :class="$style.avatarWrapper"
                           :style="getAvatarPosition(avatarIndex, getMaxAvatars(orbitIndex), orbitIndex)"
            />

            <button
                    v-if="hasNextAvatars(orbit.array, orbitIndex)"
                    aria-label="Show Next"
                    :class="$style.nextButton"
                    :style="getPrevNextPosition('next', orbitIndex)"
                    @click="showNextAvatars(orbitIndex)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
            </button>
            <button
                    v-if="hasPreviousAvatars(orbitIndex)"
                    aria-label="Show Previous"
                    :class="$style.prevButton"
                    :style="getPrevNextPosition('prev', orbitIndex)"
                    @click="showPreviousAvatars(orbitIndex)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, useCssModule } from 'vue';
import throttle from 'lodash/throttle'
import anime from 'animejs/lib/anime';
import type { PropType } from 'vue';
import type { OrbitData } from '~/types';
import ProfileAvatar from './ProfileAvatar.vue';
import { formatDate } from "~/utils"; // Assuming you have this component

const props = defineProps( {
	orbitData: {
		type: Array as PropType<OrbitData[]>, required: true,
	},
    maxOrbits: {
		type: Number, default: 7,
	},
    maxAvatars: {
		type: Number, default: 8,
	},
    baseRadius: {
		type: Number, default: 245,
	},
    distanceBetweenOrbits: {
		type: Number, default: 120,
	},
	distanceBetweenAvatars: {
		type: Number,
        default: 200,
	},
	scaleFactor: {
		type: Number,
		default: 1,
	},
} );

const containerRef = ref<HTMLDivElement | null>( null );
const currentDate = ref<HTMLDivElement | null>( null );
const isAnimating = ref(false);
const orbitPages = ref<number[]>(Array(props.orbitData.length).fill(0));
const $style = useCssModule();
const scrollPosition = ref( 0 );

const displayedOrbits = computed(() => {
	/** In this code, the scale factor is calculated as
	 *  1 + (scrollPosition.value / (props.orbitData.length * props.distanceBetweenOrbits))
	 *
	 *  This means that the scale factor will increase proportionally to the scroll position
	 *  and inversely proportionally to the total distance covered by all orbits.
	 */
	let scaleFactor = (scrollPosition.value / (props.orbitData.length * props.distanceBetweenOrbits));
	const scale = containerRef.value ? props.scaleFactor + scaleFactor : props.scaleFactor;

	return props.orbitData.slice(
		Math.floor(scrollPosition.value), Math.floor(scrollPosition.value) + props.maxOrbits
	).sort((a, b) =>
		new Date(a.contact_date).getTime() - new Date(b.contact_date).getTime()
	).map((orbit, index) => {
		const diameter = getOrbitDiameter(index);
		const isVisible = containerRef.value && diameter > 0 && diameter < getOrbitDiameter(props.maxOrbits) ;
		return { ...orbit, diameter, isVisible, scale };
	});
});

// Memoized function to calculate orbit diameter
const getOrbitDiameter = (() => {
	const cache = new Map<number, number>();

	return (orbitIndex: number) => {
		if (cache.has(orbitIndex)) {
			return cache.get(orbitIndex)!; // Non-null assertion as cache.has() ensures existence
		} else {
			const diameter = roundTo((props.baseRadius + orbitIndex * props.distanceBetweenOrbits) * 2, 4);
			cache.set(orbitIndex, diameter);
			return diameter;
		}
	};
})();

// Convert degrees to radians
const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

const roundTo = (value: number, decimals: number): number => {
	const factor = Math.pow(10, decimals);
	return Math.round(value * factor) / factor;
};

const getOrbitPage = (orbitIndex: number): number => {
	if (orbitIndex >= 0 && orbitIndex < orbitPages.value.length) {
		return orbitPages.value[orbitIndex];
	} else {
		return orbitPages.value[orbitIndex] = 0; // Or throw an error, etc.
	}
};

const setOrbitPage = (orbitIndex: number, page: number) => {
	orbitPages.value[orbitIndex] = page;
};

const getMaxAvatars = (orbitIndex: number) => {
	const orbitDiameter = getOrbitDiameter(orbitIndex);

	// Constants for angle calculations
	const startAngle = 10;
	const endAngle = 175;
	const totalArcAngle = endAngle - startAngle; // This is 165 degrees

	// Calculate the arc length (165 degrees is 11/24 of a full circle)
	const arcLength = (11 / 24) * (Math.PI * orbitDiameter);

	if ((orbitIndex + 1) === props.maxOrbits) {
		// For the outermost orbit
		const gapSize = 20; // 20 degree gap for the current date
		const availableArcLength = ((totalArcAngle - gapSize) / totalArcAngle) * arcLength;
		let maxAvatarsForOrbit = Math.floor(availableArcLength / props.distanceBetweenAvatars);

		// Ensure the number is even
		maxAvatarsForOrbit = maxAvatarsForOrbit - (maxAvatarsForOrbit % 2);

		// Ensure we have at least 2 avatars
		maxAvatarsForOrbit = Math.max(maxAvatarsForOrbit, 2);

		return Math.min(maxAvatarsForOrbit, props.maxAvatars);
	} else {
		// For inner orbits
		const maxAvatarsForOrbit = Math.floor(arcLength / props.distanceBetweenAvatars);
		return Math.min(maxAvatarsForOrbit, props.maxAvatars);
	}
};

const getVisibleAvatars = (avatars: any[], orbitIndex: number) => {
	const maxAvatars = getMaxAvatars(orbitIndex);
	const currentPage = orbitPages.value[orbitIndex] ;
	const startIndex = currentPage * maxAvatars;
	return avatars.slice(startIndex, startIndex + maxAvatars);
};

const getPrevNextPosition = (type: 'prev' | 'next', orbitIndex: number) => {
	const orbitDiameter = getOrbitDiameter(orbitIndex);
	const orbitRadius = orbitDiameter / 2;

	const prevAngle = degreesToRadians(175);
	const nextAngle = degreesToRadians(5);

	const angle = type === 'prev' ? prevAngle : nextAngle;

	const x = roundTo(Math.cos(angle) * orbitRadius, 4);
	const y = roundTo(-Math.sin(angle) * orbitRadius, 4);

	return {
		left: `calc(50% + ${x}px)`,
		top: `calc(100% + ${y}px)`,
		transform: 'translate(-50%, -50%)',
	};
};

const getCurrentDate = (orbitIndex: number) => {
	const orbitDiameter = getOrbitDiameter(orbitIndex);
	const orbitRadius = orbitDiameter / 2;
	const angle =  degreesToRadians(90);

	const x = roundTo(Math.cos(angle) * orbitRadius, 4);
	const y = roundTo(-Math.sin(angle) * orbitRadius, 4); // Negative to go upwards

	return {
		left: `calc(50% + ${x}px)`,
		top: `calc(100% + ${y}px)`, // 100% is the bottom of the container
		transform: 'translate(-50%, -50%)',
	};
}

const getAvatarPosition = (avatarIndex: number, maxAvatars: number, orbitIndex: number) => {
	const orbitDiameter = getOrbitDiameter(orbitIndex);
	const orbitRadius = orbitDiameter / 2;

	// Constants for angle calculations
	const startAngle = 10;
	const endAngle = 175;
	const totalArcAngle = endAngle - startAngle;

	// Use the actual number of avatars if less than maxAvatars
	const actualAvatars = Math.min(displayedOrbits.value[orbitIndex].array.length, maxAvatars);

	if ((orbitIndex + 1) === props.maxOrbits) {
		// For the outermost orbit
		const gapSize = 20; // 20 degree gap
		const gapCenter = 90;
		const availableAngle = totalArcAngle - gapSize;

		// Ensure actualAvatars is even for the outermost orbit
		const adjustedAvatars = actualAvatars - (actualAvatars % 2);

		const avatarAngleSpread = availableAngle / (Math.max(adjustedAvatars - 1, 1));

		let baseAngle;
		if (avatarIndex < adjustedAvatars / 2) {
			// First half of avatars
			baseAngle = startAngle + avatarIndex * avatarAngleSpread;
		} else {
			// Second half of avatars
			baseAngle = gapCenter + gapSize / 2 + (avatarIndex - adjustedAvatars / 2) * avatarAngleSpread;
		}

		// Apply page offset
		const pageOffset = (getOrbitPage(orbitIndex || 0) % 4) * 30;
		let angle = baseAngle + pageOffset;

		// Ensure angle stays within the valid range
		if (angle > endAngle) {
			angle -= totalArcAngle;
		} else if (angle < startAngle) {
			angle += totalArcAngle;
		}

		// Convert to radians
		angle = degreesToRadians(angle);

		const x = roundTo(Math.cos(angle) * orbitRadius, 4);
		const y = roundTo(-Math.sin(angle) * orbitRadius, 4);

		return {
			left: `calc(50% + ${x}px)`,
			top: `calc(100% + ${y}px)`,
			transform: 'translate(-50%, -50%)',
		};
	} else {
		// For inner orbits
		const avatarAngleSpread = totalArcAngle / (Math.max(actualAvatars + 1, 2));
		const avatarAngle = startAngle + (avatarIndex + 1) * avatarAngleSpread;

		// Apply page offset
		const pageOffset = (getOrbitPage(orbitIndex) % 4) * 30;
		let angle = avatarAngle + pageOffset;

		// Ensure angle stays within the valid range
		if (angle > endAngle) {
			angle -= totalArcAngle;
		} else if (angle < startAngle) {
			angle += totalArcAngle;
		}

		// Convert to radians
		angle = degreesToRadians(angle);

		const x = roundTo(Math.cos(angle) * orbitRadius, 4);
		const y = roundTo(-Math.sin(angle) * orbitRadius, 4); // Negative to go upwards

		return {
			left: `calc(50% + ${x}px)`,
			top: `calc(100% + ${y}px)`,
			transform: 'translate(-50%, -50%)',
		};
	}
};

const hasNextAvatars = (avatars: any[], orbitIndex: number) => {
	const maxAvatars = getMaxAvatars(orbitIndex);
	const currentPage = getOrbitPage(orbitIndex);
	const totalAvatars = avatars.length;

	return (currentPage + 1) * maxAvatars < totalAvatars;
};

const hasPreviousAvatars = (orbitIndex: number) => {
	return getOrbitPage(orbitIndex) > 0;
};

const showNextAvatars = (orbitIndex: number) => {
	const maxAvatars = getMaxAvatars(orbitIndex);
	const currentPage = getOrbitPage(orbitIndex);
	const totalAvatars = displayedOrbits.value[orbitIndex].array.length;

	const nextPage = currentPage + 1;
	const totalPages = Math.ceil(totalAvatars / maxAvatars);

	if (nextPage < totalPages) {
		setOrbitPage(orbitIndex, nextPage);
	}
};

const showPreviousAvatars = (orbitIndex: number) => {
	const currentPage = getOrbitPage(orbitIndex);
	if (currentPage > 0) {
		setOrbitPage(orbitIndex, currentPage - 1);
	}
};

const initialAnimation = () => {
	const orbits = containerRef.value?.querySelectorAll(`.${$style.orbit}`);
	if (!orbits) return;

	const timeline = anime.timeline({
		easing: 'easeInOutQuad',
		duration: 600
	});

	timeline.add({
		targets: Array.from(orbits).slice(1),
		opacity: [0, 1],
		width: (el: Element, i: number) => [
			getOrbitDiameter(i),
			getOrbitDiameter(i + 1)
		],
		height: (el: Element, i: number) => [
			getOrbitDiameter(i) * 0.5, // Half Orbit
			getOrbitDiameter(i + 1) * 0.5
		],
		delay: anime.stagger(100)
	}, '-=50');

	timeline.play();
};

const animateOrbits = (direction: number, targetScrollPosition: number) => {
	const orbits = containerRef.value?.querySelectorAll(`.${$style.orbit}`);
	if (!orbits) return;

	const timeline = anime.timeline({
		duration: 800,
		easing: 'easeInOutQuad',
        complete: () => {
			isAnimating.value = false;
			scrollPosition.value = targetScrollPosition; // Update scrollPosition after animation
		}
	});

	if (direction > 0) {
		// Scrolling down: add new orbit at the top and push others down
		timeline
			.add({
				targets: Array.from(orbits).slice(0, -1),
				width: (el: Element, i: number) => [
					getOrbitDiameter(i),
					getOrbitDiameter(i + 1)
				],
				height: (el: Element, i: number) => [
					getOrbitDiameter(i) * 0.5, // Half Orbit
					getOrbitDiameter(i + 1) * 0.5
				],
				opacity: [0, 1],
			}, '-=50')
	} else {
		// Scrolling up: remove bottom orbit and pull others up
		timeline
			.add({
				targets: Array.from(orbits).slice(1),
				width: (el: Element, i: number) => [
					getOrbitDiameter(i + 1),
					getOrbitDiameter(i)
				],
				height: (el: Element, i: number) => [
					getOrbitDiameter(i + 1) * 0.5,
					getOrbitDiameter(i) * 0.5
				],
				opacity: [0, 1],
			}, '-=50')
	}
};

const handleScroll = (event: WheelEvent) => {
	if (isAnimating.value) return;
	const direction = event.deltaY > 0 ? 1 : -1; // Positive for scroll down, negative for scroll up
	const targetScrollPosition = Math.max(0, Math.min(scrollPosition.value + direction, props.orbitData.length - props.maxOrbits));

	if (targetScrollPosition === scrollPosition.value) return;
	isAnimating.value = true;

	animateOrbits(direction, targetScrollPosition);
};

const handleResize = () => {
	// Force re-render of avatars to recalculate their positions
	orbitPages.value = [...orbitPages.value];
};

// Throttled scroll handler (adjust 250ms as needed)
const throttledHandleScroll = throttle(handleScroll, 250, { leading: true, trailing: false }); // Ensure initial call

onMounted( () => {
	containerRef.value?.addEventListener( 'wheel', throttledHandleScroll, { passive: true } );
	window.addEventListener('resize', handleResize);
	initialAnimation();
});

onUnmounted(() => {
	containerRef.value?.removeEventListener('wheel', throttledHandleScroll);
	window.removeEventListener('resize', handleResize);
});

</script>

<style module>
.orbitContainer {
    background-color: transparent;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100vh;

    .orbit {
        background-color: transparent;
        position: absolute;
        bottom: 0;
        transform: translateY(-1.25rem) scale(1);
        
        display: flex;
        justify-content: center;
        align-items: center;
        
        border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        border-top-width: 0.063rem;
        border-top-color: var(--border-color);
        border-top-style: solid;
        
        .currentDate {
            background-color: var(--bg-primary);
            color: var(--color-primary);
            position: absolute;
            transform-origin: center center;
            text-align: center;
            font-family: "Inter", sans-serif;
            font-size: 1.125rem;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
            padding: 0.5rem;
        }

        .avatarWrapper {
            position: absolute;
            transform-origin: center center;
            
            &:hover {
                z-index: 100;
            }
           
        }

        &:has(.avatarWrapper:hover) {
            z-index: 999 !important;
        }
        
        .nextButton, .prevButton {
            position: absolute;
            background-color: var(--bg-secondary);
            color: var(--color-secondary);
            border: none;
            border-radius: 50%;
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1.25rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--bg-primary) 0 0.063rem 0.25rem, var(--bg-primary) 0 0 0 0.5rem;
            z-index: 10;

            &:hover {
                background-color: var(--bg-primary);
                color: var(--color-primary);
                border: 0.063rem solid var(--border-color);
            }
        }
    }
}
</style>