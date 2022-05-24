import { ethers } from 'ethers';
import { getServerChainInfoForClient } from '$lib/web3/contract';

import { signer } from 'svelte-ethers-store';

// setup subscripting for address changing
signer.subscribe(async (s) => {
	// early return if no signer or address
	if (!s) return;

	const address = await s.getAddress();
	if (!address) return;

	window.heap.addUserProperties({ wallet: address });
});

export const connect = async (): Promise<void> => {
	// import client-side libraries
	const { defaultEvmStores } = await import('svelte-ethers-store');
	const Web3Modal = await import('web3modal');
	const WalletConnectProvider = await import('@walletconnect/web3-provider');
	const CoinbaseWalletSDK = await import('@coinbase/wallet-sdk');

	const chain = await getServerChainInfoForClient();

	const providerOptions = {
		/* [> See Provider Options Section <] */
		walletconnect: {
			// NOTE: VITE Bundling Issue Workaround
			package: WalletConnectProvider.default,
			options: {
				rpc: {
					[chain.id]: chain.rpc
				}
			}
		},
		coinbasewallet: {
			// NOTE: VITE Bundling Issue Workaround
			package: CoinbaseWalletSDK.default,
			options: {
				appName: 'lexiconomy',
				rpc: chain.rpc
			}
		}
	};

	// NOTE: VITE Bundling Issue Workaround
	const web3Modal = new Web3Modal.default({
		network: chain.name.toLowerCase(), // optional
		cacheProvider: false, // optional
		providerOptions // required
	});

	const instance = await web3Modal.connect();

	const provider = new ethers.providers.Web3Provider(instance);
	// save to global store
	defaultEvmStores.setProvider(provider);

	try {
		window.heap.track('Connect', { Method: 'Button' });
	} catch (err) {
		console.log('failed to track connect event', err);
	}
};
