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

// https://colorhunt.co/palettes/popular
export const colors = [
	// https://colorhunt.co/palette/a8d8eaaa96dafcbad3ffffd2
	'#A8D8EA',
	'#AA96DA',
	'#FCBAD3',
	'#FFFFD2',

	// https://colorhunt.co/palette/ffb6b9fae3d9bbded661c0bf
	'#FFB6B9',
	'#FAE3D9',
	'#BBDED6',
	'#61C0BF',

	// https://colorhunt.co/palette/ffcfdffefdcae0f9b5a5dee5
	'#FFCFDF',
	'#FEFDCA',
	'#E0F9B5',
	'#A5DEE5',

	// https://colorhunt.co/palette/9adcfffff89affb2a6ff8aae
	'#9ADCFF',
	'#FFF89A',
	'#FFB2A6',
	'#FF8AAE',

	// https://colorhunt.co/palette/f38181fce38aeaffd095e1d3
	'#F38181',
	'#FCE38A',
	'#EAFFD0',
	'#95E1D3',

	// https://colorhunt.co/palette/f38181fce38aeaffd095e1d3
	'#D9D7F1',
	'#FFFDDE',
	'#E7FBBE',
	'#FFCBCB'

	// https://colorhunt.co/palette/222831393e4600adb5eeeeee
];

// TODO: Pair background colors w/ text color
// what about definition and example text?
// get background color
// get text color
//
// For every color,
// background (bg)
// primary (lemma, titles)
// secondary (example, definition, number)

export const getColor = (lemma: string): string => {
	const lemmaCode =
		lemma.length === 1
			? lemma.codePointAt(0)
			: lemma.split('').reduce((sum = 0, char, index) => sum + char.codePointAt(0) * index, 0);

	const colorPosition = lemmaCode % colors.length;

	return colors[colorPosition];
};

export const getBackgroundColor = (lemma: string): string => getColor(lemma);
