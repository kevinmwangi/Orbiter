import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
	devtools: { enabled: true },
	ssr: true,
	sourcemap: true,
	typescript: {
		strict: true,
		typeCheck: true
	},

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
					width: 44,
					height: 44
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
			sourcemap: true
		},
		optimizeDeps: {
			include: ['vue', 'lodash', 'date-fns', 'air-datepicker', '@popperjs/core', 'animejs', '@vercel/speed-insights']
		},
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

	routeRules: {
		'/**': { headers: { 'Cache-Control': 'max-age=300, s-maxage=3600' } },
		'/': { prerender: true },
	},

	compatibilityDate: '2024-07-24'
})