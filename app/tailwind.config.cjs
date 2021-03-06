const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			minWidth: {
				16: '4rem',
				32: '8rem'
			},
			fontFamily: {
				sans: ['Oxygen', 'sans-serif'],
				mono: ['Berkeley Mono', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
