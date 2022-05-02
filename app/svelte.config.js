import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('vite').Plugin} */
const cors = {
	name: 'cors',
	configureServer(server) {
		// TODO: Use only one
		server.headers = {
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,OPTIONS',
			'Access-Control-Allow-Headers':
				'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Authorization'
		};
		server.middlewares.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
			res.setHeader(
				'Access-Control-Allow-Headers',
				'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Authorization'
			);
			return next();
		});
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({})],

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [cors]
		}
	}
};

export default config;
