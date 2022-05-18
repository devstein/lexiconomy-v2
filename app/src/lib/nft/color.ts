import { version } from '$lib/nft/version';

interface ColorPalette {
	background: string;
	primary: string;
	secondary: string;
}

const BLACK = '#000000';
const WHITE = '#ffffff';

// background = color, white, or black
// primary = color, white, or black
// secondary = color, white, or black

// original pastels with black text
const palettesV1: ColorPalette[] = [
	{ background: '#fea3aa80', primary: BLACK, secondary: BLACK }, // salmon-ish
	{ background: '#f8b88b66', primary: BLACK, secondary: BLACK }, // light orange
	{ background: '#fef16073', primary: BLACK, secondary: BLACK }, // yellow
	{ background: '#baed9173', primary: BLACK, secondary: BLACK }, // green
	{ background: '#b2cefe80', primary: BLACK, secondary: BLACK }, // purple blue
	{ background: '#f2a2e84d', primary: BLACK, secondary: BLACK }, // pink
	{ background: '#b0f4e880', primary: BLACK, secondary: BLACK }, // light blue green
	{ background: '#a7f69a66', primary: BLACK, secondary: BLACK }, // green
	{ background: '#f4a1a180', primary: BLACK, secondary: BLACK }, // a pink
	{ background: '#f6b6f180', primary: BLACK, secondary: BLACK }, // a pink
	{ background: '#edf29280', primary: BLACK, secondary: BLACK }, // a yellow
	{ background: '#6eb5ff73', primary: BLACK, secondary: BLACK }, // a green
	{ background: '#77dd7780', primary: BLACK, secondary: BLACK }, // a green
	{ background: '#ffcb0573', primary: BLACK, secondary: BLACK } // orange
];

const palettesV2: ColorPalette[] = [
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
		primary: BLACK,
		secondary: BLACK
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
		background: WHITE,
		primary: '#ff2e63',
		secondary: '#252a34'
	},
	{
		background: '#ff2e63',
		primary: '#fef16b',
		secondary: BLACK
	},
	{
		background: WHITE,
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
		primary: WHITE,
		secondary: BLACK
	},
	{
		background: WHITE,
		primary: '#bc5921',
		secondary: '#7b782f'
	},
	{
		background: '#f38181',
		primary: BLACK,
		secondary: BLACK
	},
	{
		background: '#fce38a',
		primary: BLACK,
		secondary: BLACK
	},
	{
		background: '#eaffd0',
		primary: BLACK,
		secondary: BLACK
	},
	{
		background: '#95e1d3',
		primary: BLACK,
		secondary: '#95e1d3'
	},
	{
		background: '#bae8e8',
		primary: '#272343',
		secondary: BLACK
	},
	{
		background: '#6e5773',
		primary: WHITE,
		secondary: WHITE
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
		secondary: BLACK
	}
];

export const getColorPalette = (lemma: string): ColorPalette => {
	const palettes = version(lemma) === 'v1' ? palettesV1 : palettesV2;

	const lemmaCode =
		lemma.length === 1
			? lemma.codePointAt(0)
			: lemma.split('').reduce((sum = 0, char, index) => sum + char.codePointAt(0) * index, 0);

	const colorPosition = lemmaCode % palettes.length;

	return palettes[colorPosition];
};
