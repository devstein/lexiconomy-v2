import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';

// TODO: Update before going to production
const BASE_URL = 'https://lexiconomy-v2.vercel.app';
const NUMBER_OF_V1_TOKENS = 160;

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
# ${lemma}

---

## definition
${definition}

## example
${example}`;

	// - [ ] animation_url -> TBD!
	// - [ ] background color?
	// - [ ] Attributes
	// - [ ] inverted? rare
	// - [ ] back_color
	// - [ ] color

	// compute rarity based off some hash??
	// change colors accordingly (gradient, kaleidescope, etc)

	return {
		body: {
			name: lemma,
			description,
			external_url: `${BASE_URL}/lemma/${lemma}`,
			image_data: `${BASE_URL}/lemma/${lemma}/image.svg`,
			// TODO: Decide on animation_url
			// animation_url: `https://lexiconomy.org/lemma/${lemma}/animation`,
			attributes: [
				{
					display_type: 'number',
					trait_type: 'Number',
					value: number.toString()
				},
				{
					trait_type: 'Generation',
					// number < NUMBER_OF_V1_TOKENS then it's a 1  else 2
					value: number.lt(NUMBER_OF_V1_TOKENS) ? 'v1' : 'v2'
				}
			]
		}
	};
};
