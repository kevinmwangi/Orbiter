// postcss.config.ts
import type { Config } from 'postcss-load-config'

const config: Config = {
	plugins: {
		'@fullhuman/postcss-purgecss': {
			content: [
				'./components/**/*.{js,vue,ts}',
				'./layouts/**/*.vue',
				'./pages/**/*.vue',
				'./plugins/**/*.{js,ts}',
				'./nuxt.config.{js,ts}',
			],
			safelist: ['body', 'html', 'nuxt-progress']
		}
	}
}

export default config