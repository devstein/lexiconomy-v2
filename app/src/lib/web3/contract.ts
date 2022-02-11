import { ethers, Contract } from 'ethers';
import type { Provider } from '@ethersproject/abstract-provider';

import abi from './abi';
import chains, { isChainSupported } from './chains';
import type { ChainInfo } from './chains';
import lemmas from './store';

export const getServerProvider = (): Provider => {
	const rpc = import.meta.env.VITE_WEB3_PROVIDER;

	if (!rpc) {
		throw Error('web3 provider required');
	}

	return new ethers.providers.JsonRpcProvider(String(rpc));
};

export const getProviderChainInfo = async (provider: Provider): Promise<ChainInfo> => {
	const { chainId } = await provider.getNetwork();

	if (!isChainSupported(chainId)) {
		throw Error(`unsupported chain id: ${chainId}`);
	}

	return chains[chainId];
};

// events
// [EVENT_NAME] => FUNCTION
const eventFunctions = {
	Transfer: (...args) => {
		console.log('Transfer', ...args);

		const [, to, tokenId] = args;

		lemmas.update((state) => {
			const cur = state[tokenId] || { tokenId };
			state[tokenId] = { ...cur, owner: to };
			return state;
		});
	},
	Invent: (...args) => {
		console.log('Invent', ...args);

		const [owner, tokenId, , , lemma] = args;

		lemmas.update((state) => {
			state[tokenId] = { tokenId, owner, lemma };
			return state;
		});
	},
	Definition: (...args) => {
		console.log('Definition', ...args);

		const [owner, tokenId, definition] = args;
		lemmas.update((state) => {
			const cur = state[tokenId] || { tokenId };
			state[tokenId] = { ...cur, owner, definition };
			return state;
		});
	},
	Example: (...args) => {
		console.log('Example', ...args);

		const [owner, tokenId, example] = args;
		lemmas.update((state) => {
			const cur = state[tokenId] || { tokenId };
			state[tokenId] = { ...cur, owner, example };
			return state;
		});
	}
};

const setContractEventSubscriptions = (contract: Contract): Contract => {
	const events = Object.keys(eventFunctions);
	for (const event of events) {
		contract.on(event, eventFunctions[event]);
	}

	return contract;
};

// only create the Ether JS contract once
let contractPromise = null;

export const getContract = async (): Promise<Contract> => {
	if (contractPromise) return contractPromise;

	const provider = getServerProvider();
	const { lexiconomyAddress } = await getProviderChainInfo(provider);

	contractPromise = new Promise((resolve) => {
		let contract = new Contract(lexiconomyAddress, abi, provider);

		// setup event subscriptions
		contract = setContractEventSubscriptions(contract);

		return resolve(contract);
	});

	return contractPromise;
};

export const getContractWithProvider = async (provider: Provider): Promise<Contract> => {
	const { lexiconomyAddress } = await getProviderChainInfo(provider);
	let contract = new Contract(lexiconomyAddress, abi, provider);

	// setup event subscriptions
	contract = setContractEventSubscriptions(contract);

	const signer = provider.getSigner();

	return contract.connect(signer);
};

export const getLatestLemmas = async (): Promise<string[]> => {
	const contract = await getContract();
	const filter = contract.filters.Invent();
	const events = await contract.queryFilter(filter);
	return events.map(({ args: { lemma } }) => lemma);
};

// getLatestDefinition
// getLatestExample
