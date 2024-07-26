<template>
    <div :class="[$style.avatar, $style[directionClass]]"
         @mouseenter="(event) => handleAvatarHover(true, event)"
         @mouseleave="(event) => handleAvatarHover(false, event)">
        <div :class="$style.profileInfo">
            <div :class="$style.profileInfoHeader">
                <div :class="$style.avatarImage">
                    <nuxt-img :src="avatarImageUrl" preset="avatar" :alt="props.avatarData?.name"
                              format="webp" width="44" height="44" :class="$style.profileImage" />
                </div>
                <div :class="$style.avatarInfo">
                    <h1>{{avatarData?.name}}</h1>
                    <p>{{avatarData?.position}}</p>
                    <p>{{avatarData?.city}}</p>
    
                    <div :class="$style.mutualConnections">
                        <div :class="$style.profiles">
                            <nuxt-img preset="profile" v-for="(url, index) in profilePictureUrls"
                                      format="webp" :key="`${index}_${avatarData?.created_at}_${avatarData?.id}`" width="22.34" height="22.34" :src="url" :alt="`Profile Picture ${index}`" :class="$style.profilePicture" />
                        </div>
                        <div :class="$style.profileCount">
                            <p>
                                Jason Diamond, John Eremic,
                                and 281 other mutual connections
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="$style.orbitsLastMessage">
                <div :class="$style.messageHeader">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                        <path d="M3 7.75C3 7.21957 3.21071 6.71086 3.58579 6.33579C3.96086 5.96071 4.46957 5.75 5 5.75H19C19.5304 5.75 20.0391 5.96071 20.4142 6.33579C20.7893 6.71086 21 7.21957 21 7.75M3 7.75V17.75C3 18.2804 3.21071 18.7891 3.58579 19.1642C3.96086 19.5393 4.46957 19.75 5 19.75H19C19.5304 19.75 20.0391 19.5393 20.4142 19.1642C20.7893 18.7891 21 18.2804 21 17.75V7.75M3 7.75L12 13.75L21 7.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                    <p>Reply from Emery Wells</p>
                </div>
                <div :class="$style.messageBody">
                    <div :class="$style.date">
                        <time :datetime="formatFullDate(avatarData?.created_at)">{{ formatFullDate(avatarData?.created_at) }}</time>
                        <p>{{relativeTime}}</p>
                    </div>
                    <div :class="[$style.caption, { [$style.showingMore]: isShowingMore }]" ref="orbitMessage">
                        <h2>{{avatarData?._orbits_last_message.message_head}}</h2>
                        <p>{{avatarData?._orbits_last_message.message}}</p>
                    </div>
                    <button :class="$style.showMore" @click="showMore">
                        <span>{{ isShowingMore ? 'Less' : 'More' }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <path :d="`${isShowingMore ? 'M18 15.5732L12 9.57324L6 15.5732' : 'M6 9.75L12 15.75L18 9.75' }`" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type {  PropType } from "vue";
import { getRelativeTime, formatFullDate } from '~/utils'
import type { Avatar, IntervalId } from "~/types";

const props = defineProps( {
	avatarData: {
		type: Object as PropType<Avatar>,
        required: true,
	}
} );
const isShowingMore = ref( false );
const relativeTime = ref('')
let intervalId = ref<IntervalId | null>(null)
const directionClass = ref('');
const avatarImageUrl = computed(() => props.avatarData?.img || '')

const profilePictureUrls = [
	'https://images.unsplash.com/photo-1713190277225-9a345031e9ac?q=80&w=23&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1713245294954-c5805efcd5da?q=80&w=23&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://plus.unsplash.com/premium_photo-1713184149461-67ad584d82e6?q=80&w=23&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'https://images.unsplash.com/photo-1712781797301-ec9ee12b52b4?q=80&w=23&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
]

const handleAvatarHover = (hover: boolean, event: MouseEvent) => {
	const target = event.currentTarget as HTMLElement | null;
	if (!target) return; // Exit early if target is null

	if (hover) {

		const rect = target.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		const edgeThreshold = 10;

		const isNearLeftEdge = rect.left < edgeThreshold;
		const isNearRightEdge = rect.right > viewportWidth - edgeThreshold;
		const isNearTopEdge = rect.top < edgeThreshold;
		const isNearBottomEdge = rect.bottom > viewportHeight - edgeThreshold;
  
		if (isNearLeftEdge) {
			if (isNearBottomEdge) {
				directionClass.value = 'bottomLeftEdge';
			} else {
				directionClass.value = 'leftEdge';
			}
		} else if (isNearRightEdge) {
			if (isNearBottomEdge) {
				directionClass.value = 'bottomRightEdge';
			} else {
				directionClass.value = 'rightEdge';
			}
		} else if (isNearTopEdge) {
			directionClass.value = 'topEdge';
		} else if (isNearBottomEdge) {
			directionClass.value = 'bottomEdge';
		}

	} else {
		directionClass.value = '';
    }
};

const updateRelativeTime = () => {
	if (props.avatarData?.created_at) {
		relativeTime.value = getRelativeTime(props.avatarData.created_at)
	}
}

const showMore = () => {
	isShowingMore.value = !isShowingMore.value;
}

// Update immediately
updateRelativeTime()

// Set up an interval to update the relative time every minute
onMounted(() => {
	intervalId.value = setInterval(updateRelativeTime, 60000) // 60000 ms = 1 minute
})

// Clean up the interval when the component is unmounted
onUnmounted(() => {
	if (intervalId.value) clearInterval(intervalId.value)
})
</script>

<style module>
.avatar {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;

    .profileInfo {
        display: flex;
        align-items: flex-start;
        flex-flow: column;
        column-gap: 0.938rem;
        
        .profileInfoHeader {
            .avatarImage {
                display: flex;
                align-items: flex-end;
                justify-content: center;
                border-radius: 50%;
                border: 0.5rem solid var(--bg-primary);
                background: linear-gradient(to bottom, var(--bg-secondary) 0%, var(--bg-secondary) 50%, transparent 100%);
                box-sizing: border-box;
                overflow: hidden;
                width: 100vw;
                height: 100vh;
                max-width: 3.75rem;
                max-height: 3.75rem;

                .profileImage {
                    width: calc(100% - 0.063rem);
                    height: calc(100% - 0.063rem);
                    border-radius: 50%;
                    filter: brightness(110%);
                }
            }

            .avatarInfo {
                display: none;
                word-wrap: break-word;
                font-size: 0.8rem;

                h1 {
                    font-size: 1rem;
                    font-weight: 700;
                    margin-bottom: 0.313rem;
                }

                p {
                    font-size: 0.75rem;
                    margin-bottom: 0.313rem;
                }
            }
        }

        .orbitsLastMessage {
            display: none;
        }

    }

    &:hover {
        transform: translate(-12%, -20%) !important;
        
        &.leftEdge {
            transform: translate(calc(0% - 60px), calc(0% - 60px)) !important;
        }
        &.rightEdge {
            transform:  translate(calc(-100% + 30px), calc(0% - 60px)) !important
        }
        &.topEdge {
            transform: translate(calc(0% - 60px), calc(0% - 60px)) !important;
        }
        &.bottomEdge {
            transform: translate(calc(0% - 60px), calc(-100% + 60px)) !important;
        }
        &.bottomRightEdge {
            transform: translate(calc(-100% + 60px), calc(-100% + 60px)) !important;
        }
        &.bottomLeftEdge {
            transform: translate(calc(0% - 60px), calc(-100% + 60px)) !important;
        }
        
        .profileInfo {
            background: linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, linear-gradient(to bottom, var(--bg-secondary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%) border-box;
            border-radius: 0.625rem;
            border: 0.063rem solid transparent;
            overflow: clip;
            width: 100vw;
            max-width: 30rem;
            
            .profileInfoHeader {
                backdrop-filter: blur(25px);
                background-color: var(--bg-primary);
                display: flex;
                align-items: center;
                flex-flow: row;
                column-gap: 0.938rem;
                padding: 0.625rem;
                
                .avatarImage {
                    border-width: 0;
                    width: 100vw;
                    height: 100vh;
                    max-width: 6.25rem;
                    max-height: 6.25rem;
                }

                .avatarInfo {
                    display: flex;
                    flex-flow: column;
                    align-items: flex-start;

                    h1, h2, h3, h4, h5, h6, p {
                        margin: 0 0 0.313rem 0;
                    }

                    .mutualConnections {
                        display: flex;
                        align-items: flex-start;
                        gap: 1rem;
                        margin-top: 0.625rem;

                        .profiles {
                            display: grid;
                            grid-template-columns: repeat(4, 1rem);

                            .profilePicture {
                                height: 1.25rem;
                                width: 1.25rem;
                                object-fit: cover;
                                border-radius: 100%;
                                border: 1px solid var(--border-color);
                                filter: brightness(110%);
                            }
                        }

                        .profileCount {
                            p {
                                font-size: 0.75rem;
                                font-weight: 400;
                                white-space: pre-line;
                                word-wrap: break-word
                            }
                        }
                    }
                }
            }
            
            .orbitsLastMessage {
                background: linear-gradient(rgb(10 10 10 / 15%), rgb(10 10 10 / 15%)), linear-gradient(180deg, rgb(0 0 0 / 2%), rgba(0, 0, 0, 0)), rgb(255 255 255 / 5%);

                display: block;
                box-sizing: border-box;
                padding: 0.625rem;
                width: 100%;
                max-width: 100vw;
                
                > * {
                    box-sizing: border-box;
                }
                
                .messageHeader {
                    display: flex;
                    align-items: center;
                    flex-flow: row;
                    column-gap: 0.938rem;
                    background: linear-gradient(rgb(255 255 255 / 5%), rgb(255 255 255 / 5%)), rgb(10 10 10 / 65%);
                    padding: 0.313rem 0.625rem;

                    p {
                        font-size: 1rem;
                        font-weight: 300;
                        white-space: pre-line;
                        word-wrap: break-word;
                    }
                }
                .messageBody {
                    padding: 0.625rem;
                    border-radius: 0.313rem;
                    background: linear-gradient(rgb(10 10 10 / 85%), rgb(10 10 10 / 85%)), linear-gradient(180deg, rgb(0 0 0 / 20%), rgba(0, 0, 0, 0)), rgb(255 255 255 / 5%);
                    
                    .date {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 0.875rem;
                        padding: 0.626rem 0;
                        color: var(--color-gray);
                    }
                    
                    .caption {
                        display: block;

                        h1, h2, h3, h4, h5, h6, p {
                            margin: 0 0 0.313rem 0;
                        }
                        
                        > * {
                            margin-top: 0;
                            margin-bottom: 0.313rem;
                        }
                        
                        h2 {
                            font-size: 1rem;
                            color: var(--color-primary);
                            text-align: left;
                            white-space: pre-line;
                            word-wrap: break-word;
                        }
                        
                        p {
                            font-size: 1rem;
                            font-weight: 300;
                            color: var(--color-primary);
                            text-align: left;
                            display: inline-block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: 100%;
                        }
                        
                        &.showingMore {
                            p {
                                display: flex;
                                text-overflow: unset;
                                white-space: pre-line;
                                transition-property: all;
                                transition-timing-function: cubic-bezier(.4,0,.2,1);
                                transition-duration: .15s;
                            }
                        }
                    }
                    
                    .showMore {
                        color: var(--color-primary);
                        font-size: 1rem;
                        font-weight: 300;
                        line-height: normal;
                        padding: 0.75rem 1.5rem 0.75rem 0;
                        display: flex;
                        gap: .5rem;
                        align-items: center;
                        -webkit-appearance: none;
                        appearance: none;
                        background-color: transparent;
                        background-image: none;
                        cursor: pointer;
                        border: none;
                        margin: 0;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        user-select: none;
                    }
                }
            }
        }
    }
}
</style>