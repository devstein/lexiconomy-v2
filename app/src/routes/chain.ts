import type { RequestHandler } from '@sveltejs/kit';
import { getServerChainInfo } from '$lib/web3/contract';

// return server chain information to the client
export const get: RequestHandler = async () => {
	const chain = await getServerChainInfo();
	return {
		body: { ...chain, rpc: import.meta.env.VITE_WEB3_PROVIDER }
	};
};
