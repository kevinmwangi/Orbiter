
<template>
    <NuxtLayout>
        <div v-if="orbits" :class="$style.orbitsContainer" ref="container">
            <DatePicker :initial-date="formattedStartDate" @dateSelected="updateDate" />
            <Orbit :orbit-data="sortedOrbits"/>
            <SpeedInsights />
        </div>
        
        <Loader v-else/>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import Loader from "../components/Loader.vue"
import DatePicker from "../components/DatePicker.vue"
import Orbit from "../components/Orbit.vue"
import type { SingleOrbit } from "../types";

definePageMeta({
	title: 'Home',
	name: 'Orbiter',
	colorMode: 'dark',
	pageType: 'Home',
	keepalive: true,
	pageTransition: true,
})

useHead({
	title: `Orbiter - Home`,
	meta: [{
		name: 'description',
		content: 'User interface allowing scrolling between different orbits (representing time changes)'
	}]
})

const startDate = ref<Date | null>(null);
const formattedStartDate = computed(() => {
	if (startDate.value) {
		return startDate.value.toISOString().split('T')[0];
	} else {
		return new Date().toISOString().split('T')[0];
	}
});

// Server-Side Fetch Using useAsyncData
const { data: orbits } = await useAsyncData('orbits', () => $fetch<SingleOrbit[]>(
	'https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week',
	{ params: { start_date: formattedStartDate.value }, headers: { 'accept': 'application/json' } }
));

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

onMounted(() => {
	startDate.value = new Date(orbits.value?.[0]?.contact_date || new Date());
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
