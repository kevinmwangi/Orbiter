
<template>
    <div :class="$style.orbitsContainer" ref="container">
        <DatePicker :initial-date="formattedStartDate" @dateSelected="updateDate" />
        <Orbit :orbit-data="sortedOrbits"/>
        <SpeedInsights />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import DatePicker from '../components/DatePicker.vue'
import Orbit from '../components/Orbit.vue'
import type { SingleOrbit } from '~/types';
    definePageMeta({
        colorMode: 'dark',
        pageType: 'Home'
    })

const startDate = ref(new Date());
const orbits = ref<SingleOrbit[]>([]);

const formattedStartDate = computed(() => {
	return startDate.value.toISOString().split('T')[0];
});

// Initial server-side fetch
const { data: initialOrbits } = await useFetch<SingleOrbit[]>('https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week', {
	params: { start_date: formattedStartDate.value },
	headers: { 'accept': 'application/json' }
});

orbits.value = initialOrbits.value || [];

const fetchOrbits = async (date: string) => {
	try {
		orbits.value = await $fetch<SingleOrbit[]>('https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week', {
			params: { start_date: date },
			headers: { 'accept': 'application/json' }
		});
	} catch (error) {
		console.error('Failed to fetch orbit data:', error);
	}
};

const updateDate = (newDate: string) => {
	startDate.value = new Date(newDate);
	fetchOrbits(newDate);
};

const sortedOrbits = computed(() => {
	return [...orbits.value].sort((a, b) =>
		new Date(b.contact_date).getTime() - new Date(a.contact_date).getTime()
	);
});

</script>

<style module>
@media only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and (min-resolution: 192dpi) {

    html, :host{
        font-family: Inter, sans-serif;
        font-size: clamp(16px, calc(6px + 0.5vw), 18px); /* Now 1rem = 16px at -webkit-min-device-pixel-ratio: 2 viewport width */
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-primary);
    }
}

.orbitsContainer {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    width: 100vw;
    height: 100vh;
}
</style>
