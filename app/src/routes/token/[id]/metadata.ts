import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';

export const get: RequestHandler = async ({ params }) => {
	const contract = await getContract();

	const { id } = params;
	console.time(`get: token metadata ${id}`);

	console.time(`get: token metadata ${id} - lemmas`);
	const { lemma, definition, example, number } = await contract.lemmas(id);
	console.timeEnd(`get: token metadata ${id} - lemmas`);

	// TODO: What is the appropriate response?
	if (!lemma) {
		return {
			status: 404
		};
	}

	const description = `
	definition
	${definition}

	example
	${example}
	`;

	// - [ ] name -> lemma
	// - [ ] description -> definition
	// - [ ] external url -> lemma page
	// - [ ] image_url -> TBD!
	// - [ ] animation_url -> TBD!
	// - [ ] background colors
	// - [ ] Attributes
	// - [ ] inverted? rare
	// - [ ] generation?
	// - [ ] back_color
	// - [ ] number
	//

	// compute rarity based off some hash??
	// change colors accordingly (gradient, kaleidescope, etc)

	return {
		body: {
			name: lemma,
			description,
			external_url: `https://lexiconomy.org/lemma/${lemma}`,
			image_url: `https://lexiconomy.org/lemma/${lemma}/image`,
			animation_url: `https://lexiconomy.org/lemma/${lemma}/animation`,
			attributes: [
				{
					display_type: 'number',
					trait_type: 'Number',
					value: number
				}
			]
			// background_color: 'TODO',
		}
	};
};
