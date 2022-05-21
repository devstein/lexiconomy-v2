import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

import nodePolyfills from 'rollup-plugin-polyfill-node';
const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({}), mdsvex({ extensions: ['.svx', '.md'] })],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [
				// ↓ Needed for development mode
				!production &&
					nodePolyfills({
						include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')]
					})
			],
			build: {
				rollupOptions: {
					plugins: [
						// ↓ Needed for build
						nodePolyfills()
					]
				},
				commonjsOptions: {
					transformMixedEsModules: true
				}
			}
		}
	}
};

export default config;
