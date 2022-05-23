import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = <T>(array: T[]): T[] => {
	let currentIndex = array.length;
	let randomIndex: number;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
};

const fromBlock = parseInt(import.meta.env.VITE_LEXICONOMY_CREATION_BLOCK);

export const get: RequestHandler = async () => {
	const contract = await getContract();

	console.time(`get: explore - invent events`);
	const filter = contract.filters.Invent();
	const events = await contract.queryFilter(filter, fromBlock);
	console.timeEnd(`get: explore - invent events`);

	// TODO: Add a fromBlock
	const lemmas = events.map(({ args: { lemma } }) => lemma);

	return {
		body: {
			lemmas: shuffle(lemmas)
		}
	};
};
