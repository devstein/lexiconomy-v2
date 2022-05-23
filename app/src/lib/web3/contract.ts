import { ethers, Contract, providers, BigNumber } from 'ethers';
import type { Provider } from '@ethersproject/abstract-provider';

import abi from './abi';
import chains, { isChainSupported } from './chains';
import type { ChainInfo } from './chains';
import lemmas from './store';

// TODO: Clean this file up

// CLIENT-SIDE
export const LEXICONOMY_CONTRACT_ADDRESS = import.meta.env.VITE_LEXICONOMY_CONTRACT_ADDRESS;

export const getProviderChainInfo = async (provider: Provider): Promise<ChainInfo> => {
	const { chainId } = await provider.getNetwork();

	if (!isChainSupported(chainId)) {
		throw Error(`unsupported chain id: ${chainId}`);
	}

	console.log('using chain', chainId);

	return chains[chainId];
};

// events
// from, to, BigNumber
type TransferEvent = [string, string, BigNumber];

// owner, tokenId, lemma, number
type InventEvent = [string, BigNumber, string, BigNumber];

// owner, tokenId, definition
type DefinitionEvent = [string, BigNumber, string];

// owner, tokenId, example
type ExampleEvent = [string, BigNumber, string];

// [EVENT_NAME] => FUNCTION
const eventFunctions = {
	Transfer: (...args: TransferEvent) => {
		console.log('Transfer', ...args);

		const [, to, tokenId] = args;
		const id = tokenId.toString();

		lemmas.update((state) => {
			const cur = state[id] || { tokenId: id };
			state[id] = { ...cur, owner: to };
			return state;
		});
	},
	Invent: (...args: InventEvent) => {
		console.log('Invent', ...args);

		const [owner, tokenId, lemma, number] = args;
		const id = tokenId.toString();

		lemmas.update((state) => {
			state[id] = { tokenId: id, owner, lemma, number: number.toString() };
			console.log(state);
			return state;
		});
	},
	Definition: (...args: DefinitionEvent) => {
		console.log('Definition', ...args);

		const [owner, tokenId, definition] = args;
		const id = tokenId.toString();

		lemmas.update((state) => {
			const cur = state[id] || { tokenId: id };
			state[id] = { ...cur, owner, definition };
			return state;
		});
	},
	Example: (...args: ExampleEvent) => {
		console.log('Example', ...args);

		const [owner, tokenId, example] = args;
		const id = tokenId.toString();

		lemmas.update((state) => {
			const cur = state[id] || { tokenId: id };
			state[id] = { ...cur, owner, example };
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

export const getContractWithProvider = async (provider: Provider): Promise<Contract> => {
	let contract = new Contract(LEXICONOMY_CONTRACT_ADDRESS, abi, provider);

	// setup event subscriptions
	contract = setContractEventSubscriptions(contract);

	// wallet-based and JsonRpcProvider have this method
	const signer = (provider as providers.JsonRpcProvider).getSigner();

	return contract.connect(signer);
};

// SERVER-SIDE
export const getServerProvider = (): Provider => {
	const rpc = import.meta.env.VITE_WEB3_PROVIDER;

	if (!rpc) {
		throw Error('web3 provider required');
	}

	return new ethers.providers.JsonRpcProvider(String(rpc));
};

export const getServerChainInfo = async (): Promise<ChainInfo> => {
	const provider = getServerProvider();
	return getProviderChainInfo(provider);
};

interface ChainInfoWithRPC extends ChainInfo {
	rpc: string;
}

let chainInfoCache: ChainInfoWithRPC;

export const getServerChainInfoForClient = async (): Promise<ChainInfoWithRPC> => {
	if (chainInfoCache) return chainInfoCache;

	const resp = await fetch('/chain', {
		headers: {
			'Content-Type': 'application/json'
		}
	});

	chainInfoCache = await resp.json();

	return chainInfoCache;
};

// only create the Ether JS contract once
let contractPromise = null;

export const getContract = async (): Promise<Contract> => {
	if (contractPromise) return contractPromise;

	const provider = getServerProvider();

	contractPromise = new Promise((resolve) => {
		let contract = new Contract(LEXICONOMY_CONTRACT_ADDRESS, abi, provider);

		// setup event subscriptions
		contract = setContractEventSubscriptions(contract);

		return resolve(contract);
	});

	return contractPromise;
};

export const getLatestLemmas = async (): Promise<string[]> => {
	const contract = await getContract();
	const filter = contract.filters.Invent();
	const events = await contract.queryFilter(filter);
	return events.map(({ args: { lemma } }) => lemma);
};
