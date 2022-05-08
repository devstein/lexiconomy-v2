import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';

export const get: RequestHandler = async ({ params }) => {
	const contract = await getContract();

	const { lemma } = params;
	console.time(`get: ${lemma}`);

	// don't allow untrimmed lemmas
	if (lemma.trim() !== lemma) {
		return {
			status: 301,
			headers: {
				location: `/lemma/${lemma.trim()}/image`
			}
		};
	}

	console.time(`get: ${lemma} - tokenId`);
	const tokenId = await contract.getTokenId(lemma);
	console.timeEnd(`get: ${lemma} - tokenId`);

	console.time(`get: ${lemma} - lemmas`);
	const { definition, example, number } = await contract.lemmas(tokenId);
	console.timeEnd(`get: ${lemma} - lemmas`);

	console.timeEnd(`get: ${lemma}`);

	return {
		body: {
			lemma,
			definition,
			example,
			number: number.toString()
		}
	};
};
