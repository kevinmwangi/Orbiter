<template>
        <section :class="$style.sectionOrbiter">
            <div v-if="status === 'success'" :class="$style.orbitsContainer" ref="container">
                <DatePicker :initial-date="startDate" @dateSelected="updateDate" />
                <Orbit :orbit-data="sortedOrbits"/>
                <SpeedInsights />
            </div>
            
            <Loader v-else/>
        </section>
</template>

<script setup lang="ts">
import { definePageMeta, useHead, useAsyncData } from '#imports'
import { ref, computed } from 'vue';
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

let startDate = ref(new Date().toISOString().split('T')[0]);

// Server-Side Fetch Using useAsyncData
const { data: orbits, status, execute } = await useAsyncData('orbits', async () => {
	try {
		return await $fetch<SingleOrbit[]>('https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week', {
			params: { start_date: startDate.value },
			headers: { 'accept': 'application/json' }
		});
	} catch (error) {
		console.error('Error fetching orbits:', error);
		return [];
	}
}, {
	watch: [startDate]
});

const sortedOrbits = computed(() => {
	return [...(orbits.value || [])].sort((a, b) =>
		new Date(b.contact_date).getTime() - new Date(a.contact_date).getTime()
	);
});

const updateDate = async (newDate: string) => {
	startDate.value = new Date(newDate + 'T00:00:00Z').toISOString().split('T')[0];
	await execute()
};

// const updateDate = async (newDate: string) => {
// 	// Ensure the new date is treated as UTC
// 	const date = new Date(newDate + 'T00:00:00Z');
// 	startDate.value = date.toISOString().split('T')[0];
// 	await execute();
// };

</script>

<style module>
.sectionOrbiter {
    width: 100vw;
    height: 100vh;
    
    .orbitsContainer {
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        width: 100%;
        height: 100%;
    }
}
</style>
