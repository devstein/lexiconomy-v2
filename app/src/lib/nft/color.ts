// export const colors = [
// '#fea3aa80', // salmon-ish
// '#f8b88b66', // light orange
// '#fef16073', // yellow
// '#baed9173', // green
// '#b2cefe80', // purple blue
// '#f2a2e84d', // pink
// '#b0f4e880', // light blue green
// '#a7f69a66', // green
// '#f4a1a180', // a pink
// '#f6b6f180', // a pink
// '#edf29280', // a yellow
// '#6eb5ff73', // a green
// '#77dd7780', // a green
// '#ffcb0573' // orange
// ];

interface ColorPalette {
	background: string;
	primary: string;
	secondary: string;
}

const WHITE = '#ffffff';
const BLACK = '#000000';

// TODO: Create palette for v1 lemmas

// background = color, white, or black
// primary = color, white, or black
// secondary = color, white, or black

const palettes: ColorPalette[] = [
	{
		background: '#222831',
		primary: '#00adb5',
		secondary: '#eeeeee'
	},
	{
		background: '#eeeeee',
		primary: '#006e7f',
		secondary: '#222831'
	},
	{
		background: '#fce38a',
		primary: '#000',
		secondary: '#000'
	},
	{
		background: '#f9ed69',
		primary: '#007479',
		secondary: '#b83b5e'
	},
	{
		background: '#e3fdfd',
		primary: '#a95a5a',
		secondary: '#222831'
	},
	{
		background: '#ffffff',
		primary: '#ff2e63',
		secondary: '#252a34'
	},
	{
		background: '#ff2e63',
		primary: '#fef16b',
		secondary: '#000000'
	},
	{
		background: '#ffffff',
		primary: '#6a2c70',
		secondary: '#222831'
	},
	{
		background: '#ffc7c7',
		primary: '#364f6b',
		secondary: '#112d4e'
	},
	{
		background: '#252a34',
		primary: '#ff2e63',
		secondary: '#eaeaea'
	},
	{
		background: '#f9ed69',
		primary: '#112d4e',
		secondary: '#6a2c70'
	},
	{
		background: '#e84545',
		primary: '#ffffff',
		secondary: '#000000'
	},
	{
		background: '#ffffff',
		primary: '#bc5921',
		secondary: '#7b782f'
	},
	{
		background: '#f38181',
		primary: '#000000',
		secondary: '#000000'
	},
	{
		background: '#fce38a',
		primary: '#000000',
		secondary: '#000000'
	},
	{
		background: '#eaffd0',
		primary: '#000000',
		secondary: '#000000'
	},
	{
		background: '#95e1d3',
		primary: '#000000',
		secondary: '#95e1d3'
	},
	{
		background: '#bae8e8',
		primary: '#272343',
		secondary: '#000000'
	},
	{
		background: '#6e5773',
		primary: '#ffffff',
		secondary: '#ffffff'
	},
	{
		background: '#1c2938',
		primary: '#ff9c91',
		secondary: '#f4f6f6'
	},
	{
		background: '#e7fbbe',
		primary: '#080808',
		secondary: '#080808'
	},
	{
		background: '#fdc7ff',
		primary: '#010b13',
		secondary: '#010b13'
	},
	{
		background: '#007f5c',
		primary: '#f5f5f5',
		secondary: '#fefefa'
	},
	{
		background: '#222831',
		primary: '#ffadad',
		secondary: '#eeeeee'
	},
	{
		background: '#212529',
		primary: '#ff85a1',
		secondary: '#eeeeee'
	},
	{
		background: '#a8dadc',
		primary: '#343a40',
		secondary: '#000000'
	}
];

export const getColorPalette = (lemma = 'lexiconomy'): ColorPalette => {
	const lemmaCode =
		lemma.length === 1
			? lemma.codePointAt(0)
			: lemma.split('').reduce((sum = 0, char, index) => sum + char.codePointAt(0) * index, 0);

	const colorPosition = lemmaCode % palettes.length;

	return palettes[colorPosition];
};
