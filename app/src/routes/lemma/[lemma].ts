import type { RequestHandler } from '@sveltejs/kit';

import { getContract, getServerProvider } from '$lib/web3/contract';
import { ZERO_ADDR } from '$lib/web3/utils';

export const get: RequestHandler = async ({ params }) => {
	const provider = getServerProvider();
	const { chainId } = await provider.getNetwork();

	const contract = await getContract();

	const { lemma } = params;
	console.time(`get: ${lemma}`);

	// don't allow non-lowercase, untrimmed lemmas
	if (lemma.toLowerCase().trim() !== lemma) {
		return {
			status: 301,
			headers: {
				location: `/lemma/${lemma.toLowerCase().trim()}`
			}
		};
	}

	console.time(`get: ${lemma} - tokenId`);
	const tokenId = await contract.getTokenId(lemma);
	console.timeEnd(`get: ${lemma} - tokenId`);

	console.time(`get: ${lemma} - lemmas`);
	const { definition, example, number } = await contract.lemmas(tokenId);
	console.timeEnd(`get: ${lemma} - lemmas`);

	let owner = ZERO_ADDR;
	let approved = ZERO_ADDR;
	console.time(`get: ${lemma} - ownerOf`);
	try {
		owner = await contract.ownerOf(tokenId);
	} catch (e) {
		console.log('');
	}
	console.timeEnd(`get: ${lemma} - ownerOf`);
	console.time(`get: ${lemma} - getApproved`);
	try {
		approved = await contract.getApproved(tokenId);
	} catch (e) {
		console.log('');
	}
	console.timeEnd(`get: ${lemma} - getApproved`);

	console.timeEnd(`get: ${lemma}`);
	return {
		body: {
			lemma,
			definition,
			example,
			number: number.toString(),
			tokenId: tokenId.toString(),
			owner,
			approved,
			chainId
		}
	};
};
