import type { RequestHandler } from '@sveltejs/kit';

import { getContract } from '$lib/web3/contract';
import { getSVG } from '$lib/nft/svg';

export const get: RequestHandler = async ({ params }) => {
	const contract = await getContract();
	const { lemma } = params;

	console.time(`get: ${lemma}`);

	// don't allow untrimmed lemmas
	if (lemma.trim() !== lemma) {
		return {
			status: 301,
			headers: {
				location: `/lemma/${lemma.trim()}/image.svg`
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
		headers: {
			'Content-Type': 'image/svg+xml',
			'Content-Disposition': `attachment; filename="nft.svg"`,
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET,OPTIONS',
			'Access-Control-Allow-Headers':
				'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Authorization'
		},
		body: getSVG({ lemma, definition, example, number })
	};
};
