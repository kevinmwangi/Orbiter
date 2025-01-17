<template>
    <div :class="$style.datePicker">
        <button :class="$style.calendar" @click="toggleDatepicker" aria-label="Select Date" ref="datepickerButton">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
        </button>
        <div :class="$style.datepickerContainer" ref="datepickerContainer"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import AirDatepicker  from 'air-datepicker';
import type { AirDatepickerOptions, AirDatepickerPosition } from 'air-datepicker';
import { createPopper } from '@popperjs/core';
import anime from 'animejs';
import 'air-datepicker/air-datepicker.css';
import localeEn from "air-datepicker/locale/en";

const datepickerButton = ref<HTMLButtonElement | null>(null);
const datepickerContainer = ref<HTMLDivElement | null>(null);
let datepicker: AirDatepicker<HTMLElement> | null = null;
let popper: any | null = null;

const props = defineProps({
    initialDate: {
        type: String,
        default: () => new Date().toISOString().split('T')[0]
    }
});

const emit = defineEmits(['dateSelected']);
const isDatepickerVisible = ref(false);
const isInitialized = ref(false);

const toggleDatepicker = async () => {
	if (!isInitialized.value || !datepicker || !datepicker.$datepicker) return;

	isDatepickerVisible.value = !isDatepickerVisible.value;

	await nextTick();

	if (datepicker && datepicker.$datepicker) {
		if (isDatepickerVisible.value) {
			datepicker.$datepicker.style.display = 'block';
			updatePopperPosition();
			animateShow(datepicker.$datepicker);
		} else {
			animateHide(datepicker.$datepicker, () => {
				if (datepicker && datepicker.$datepicker) {
					datepicker.$datepicker.style.display = 'none';
				}
			});
		}
	}
};

const updatePopperPosition = () => {
	if (popper) {
		popper.update();
	} else if (datepickerButton.value && datepicker && datepicker.$datepicker) {
		popper = createPopper(datepickerButton.value, datepicker.$datepicker, {
			placement: 'top',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 10],
					},
				},
			],
		});
	}
};

const animateShow = ($datepicker: HTMLElement) => {
	anime({
		targets: $datepicker,
		opacity: [0, 1],
		rotateX: [-90, 0],
		easing: 'spring(1.3, 80, 5, 0)',
		duration: 300
	});
};

const animateHide = ($datepicker: HTMLElement, done: () => void) => {
    anime({
        targets: $datepicker,
        opacity: 0,
        rotateX: -90,
        duration: 300,
        easing: 'easeOutCubic',
        complete: () => {
            if (popper) {
                popper.destroy();
                popper = null;
            }
            done();
        }
    });
};

onMounted(async () => {
	await nextTick();

	if (datepickerContainer.value && datepickerButton.value) {
		const options: AirDatepickerOptions<HTMLElement> = {
			dateFormat: 'yyyy-MM-dd',
			selectedDates: [props.initialDate],
			locale: localeEn,
			onSelect: ({ date }) => {
				if (date && date instanceof Date) {
					const selectedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
					emit('dateSelected', selectedDate.toISOString().split('T')[0]);
					toggleDatepicker();
				}
			},
			position: 'top center' as AirDatepickerPosition,
			isMobile: false,
			autoClose: true,
			onShow: () => {
				updatePopperPosition();
			},
		};

		datepicker = new AirDatepicker(datepickerContainer.value, options);

		if (datepicker && datepicker.$datepicker) {
			datepicker.$datepicker.style.display = 'none';
			datepicker.$datepicker.style.transformOrigin = 'top center';
			isInitialized.value = true;
		} else {
			console.error('Datepicker not properly initialized');
		}
	}
});

onUnmounted(() => {
	if (datepicker) {
		try {
			if (typeof datepicker.destroy === 'function') {
				datepicker.destroy();
			} else {
				console.warn('Datepicker destroy method not found');
			}
		} catch (error) {
			console.error('Error destroying datepicker:', error);
		}
	}
	if (popper) {
		popper.destroy();
	}
	// Remove any lingering event listeners
	if (datepickerButton.value) {
		datepickerButton.value.removeEventListener('click', toggleDatepicker);
	}
});
</script>

<style module>
.datePicker {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -3.828rem;
    transform: translateY(-50%) translateX(calc(-50% + 7.656rem));
    z-index: 99999;
    height: 7.656rem;
    width: 15.313rem;
    
    .calendar {
        border-radius: 100%;
        background-color: var(--bg-secondary);
        color: var(--color-secondary);
        cursor: pointer;
        padding: 0.75rem;
        width: 3.75rem;
        height: 3.75rem;
        
        &:hover {
            background-color: var(--bg-primary);
            color: var(--color-primary);
            border: 0.063rem solid var(--border-color);
        }
    }

    .datepickerContainer {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100000;
    }
}


:global(.air-datepicker) {
    --adp-accent-color: var(--bg-primary);
    --adp-cell-background-color-selected: var(--bg-primary);
    --adp-cell-background-color-selected-hover: var(--color-gray);
    --adp-day-name-color: var(--color-gray);
    --adp-day-name-color-hover: var(--color-primary);
    transform-origin: center bottom !important;
}
</style>