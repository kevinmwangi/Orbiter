// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig( {
	devtools: { enabled: true }, dev: true, debug: false, pages: true,

	modules: [ [ '@nuxtjs/google-fonts', {
		families: {
			Inter: '100..900',
		}
	} ], '@nuxtjs/color-mode', ],

	colorMode: {
		preference: 'dark', // default value of $colorMode.preference
		fallback: 'light', // fallback value if not system preference found
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use "sass:color";
						@use "~/assets/_colors.scss" as *;
					  `
				}
			}
		}
	},

	compatibilityDate: '2024-07-05'
} )