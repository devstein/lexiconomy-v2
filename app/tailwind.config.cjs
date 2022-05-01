const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			minWidth: {
				32: '8rem'
			},
			fontFamily: {
				mono: [
					'IBM Plex Mono',
					'ui-monospace',
					'SFMono-Regular',
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace'
				]
			}
		}
	},

	plugins: []
};

module.exports = config;
