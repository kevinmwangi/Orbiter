import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
	devtools: { enabled: false },
	dev: false,
	debug: true,
	pages: true,

	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			htmlAttrs: {
				lang: 'en'
			},
			title: 'Orbiter',
			titleTemplate: '%s - Orbiter'
		}
	},

	modules: [['@nuxtjs/google-fonts', {
        families: {
            Inter: '100..900',
        },
		display: 'swap',
		preload: true,
		preconnect: true,
		injectTo: 'head-prepend',
		download: true,
		base64: true,
    }], '@nuxtjs/color-mode', "@nuxt/image"],

	colorMode: {
		preference: 'dark',
		fallback: 'light',
	},

	image: {
		quality: 80,
		format: ['webp', 'jpg', 'png', 'jpeg'],
		domains: ['images.unsplash.com', 'plus.unsplash.com', 'i.pravatar.cc', 's3-eu-west-1.amazonaws.com'],
		alias: {
			unsplash: 'https://images.unsplash.com'
		},
		presets: {
			avatar: {
				modifiers: {
					format: 'webp',
					width: 60,
					height: 60
				}
			},
			profile: {
				modifiers: {
					format: 'webp',
					width: 23,
					height: 23
				}
			}
		}
	},

	build: {
		analyze: true,
		transpile: ['lodash-es'], // Transpile ES modules
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
		},
		build: {
			target: 'esnext',
			minify: 'terser',
			cssMinify: true,
		},
		optimizeDeps: {
			include: ['vue', 'lodash', 'date-fns', 'air-datepicker', '@popperjs/core', 'animejs', '@vercel/speed-insights']
		},
		server: {
			middlewareMode: true
		}
	},

	nitro: {
		compressPublicAssets: {
			gzip: true,
			brotli: true
		},
		prerender: {
			crawlLinks: true,
			routes: ['/']
		},
		esbuild: {
			options: {
				target: 'esnext'
			}
		}
	},

	experimental: {
		payloadExtraction: true,
		viewTransition: true
	},

	routeRules: {
		'/**': { headers: { 'Cache-Control': 'max-age=300, s-maxage=3600' } },
		'/': { prerender: true }, // Generated at build time for SEO purpose
	},

	compatibilityDate: '2024-07-05'
})