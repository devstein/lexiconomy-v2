import type { RequestHandler } from '@sveltejs/kit';
import { getServerChainInfo } from '$lib/web3/contract';

// return server chain information to the client
export const get: RequestHandler = async () => {
	const body = await getServerChainInfo();
	return {
		body
	};
};
