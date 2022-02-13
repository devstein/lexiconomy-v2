import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';

export const get: RequestHandler = async ({ params }) => {
	const contract = await getContract();

	const { id } = params;
	console.time(`get: token ${id}`);

	console.time(`get: token ${id} - lemmas`);
	const { lemma } = await contract.lemmas(id);
	console.timeEnd(`get: token ${id} - lemmas`);

	if (!lemma) {
		// TODO: Handle 404
	}

	return {
		status: 301,
		headers: {
			// TODO: Encode URI components?
			location: `/lemma/${lemma}`
		}
	};
};
