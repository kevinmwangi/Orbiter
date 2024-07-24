// postcss.d.ts
declare module 'postcss-load-config' {
	export interface Config {
		plugins: Record<string, Record<string, any>>
	}
}