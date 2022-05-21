import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';

export const get: RequestHandler = async () => {
	const contract = await getContract();

	console.time(`get: explore - invent events`);
	const filter = contract.filters.Invent();
	const events = await contract.queryFilter(filter);
	console.timeEnd(`get: explore - invent events`);

	// TODO: Add a fromBlock
	const lemmas = events.map(({ args: { lemma } }) => lemma);

	return {
		body: {
			lemmas
		}
	};
};
