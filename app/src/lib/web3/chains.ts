export interface ChainInfo {
	id: number;
	name: string;
	lexiconomyAddress: string;
	blockExplorerURI: string;
	openSeaURI: string;
	raribleURI: string;
	rpc: string;
}

const rpc = import.meta.env.VITE_WEB3_PROVIDER;

const chains: Record<number, ChainInfo> = {
	// 1: { name: 'Mainet', lexiconomyAddress: '', blockExplorerURI: 'https://etherscan.io/' },
	4: {
		id: 4,
		name: 'Rinkeby',
		lexiconomyAddress: '0xAfEFf024498D2C78D1Eb9348aBc91912ea80b8E3',
		blockExplorerURI: 'https://rinkeby.etherscan.io',
		openSeaURI: 'https://testnets.opensea.io',
		raribleURI: 'https://rinkeby.rarible.com',
		rpc
	}
};

export const isChainSupported = (id: number): boolean => Boolean(chains[id]);

export default chains;
