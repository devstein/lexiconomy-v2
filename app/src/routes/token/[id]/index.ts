import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';
import { getColorPalette } from '$lib/nft/color';
import { version } from '$lib/nft/version';

// TODO: Update before going to production
const BASE_URL = 'https://lexiconomy-v2.vercel.app';

export const get: RequestHandler = async ({ params }) => {
	const contract = await getContract();

	const { id } = params;
	console.time(`get: token metadata ${id}`);

	console.time(`get: token metadata ${id} - lemmas`);
	const { lemma, definition, example, number } = await contract.lemmas(id);
	console.timeEnd(`get: token metadata ${id} - lemmas`);

	if (!lemma) {
		return {
			body: {
				msg: `token ${id} doesn't exist`
			},
			status: 404
		};
	}

	const definitionDescription = definition
		? `
## definition
${definition}
	`
		: '';

	const exampleDescription = example
		? `
## example
_${example}_
	`
		: '';

	const description = `
# ${lemma}

${definitionDescription}
${exampleDescription}
`;

	const { background, primary, secondary } = getColorPalette(lemma);

	return {
		body: {
			name: lemma,
			description,
			external_url: `${BASE_URL}/lemma/${lemma}`,
			image_data: `${BASE_URL}/lemma/${lemma}/nft.svg`,
			// background_color: background.slice(1),
			attributes: [
				{
					display_type: 'number',
					trait_type: 'Number',
					value: number.toString()
				},
				{
					trait_type: 'Generation',
					value: version(lemma)
				},
				{
					trait_type: 'Background Color',
					value: background
				},
				{
					trait_type: 'Primary Color',
					value: primary
				},
				{
					trait_type: 'Secondary Color',
					value: secondary
				}
			]
		}
	};
};
