import { ethers } from 'ethers';
import { getServerChainInfoForClient } from '$lib/web3/contract';

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
		cacheProvider: true, // optional
		providerOptions // required
	});

	const instance = await web3Modal.connect();

	const provider = new ethers.providers.Web3Provider(instance);
	// save to global store
	defaultEvmStores.setProvider(provider);
};
