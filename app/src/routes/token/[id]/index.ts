import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';

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

	const description = `
	definition
	${definition}

	example
	${example}
	`;

	// - [ ] animation_url -> TBD!
	// - [ ] background color?
	// - [ ] Attributes
	// - [ ] inverted? rare
	// - [ ] generation?
	// - [ ] back_color
	// - [ ] number

	// compute rarity based off some hash??
	// change colors accordingly (gradient, kaleidescope, etc)

	return {
		body: {
			name: lemma,
			description,
			external_url: `${BASE_URL}/lemma/${lemma}`,
			image: `${BASE_URL}/lemma/${lemma}/image.svg`,
			// TODO: Decide on animation_url
			// animation_url: `https://lexiconomy.org/lemma/${lemma}/animation`,
			attributes: [
				{
					display_type: 'number',
					trait_type: 'Number',
					value: number
				}
			]
		}
	};
};
