export interface ChainInfo {
	id: number;
	name: string;
	blockExplorerURI: string;
	openSeaURI: string;
	raribleURI: string;
}

const chains: Record<number, ChainInfo> = {
	// 1: { name: 'Mainnet', lexiconomyAddress: '', blockExplorerURI: 'https://etherscan.io/' },
	4: {
		id: 4,
		name: 'Rinkeby',
		blockExplorerURI: 'https://rinkeby.etherscan.io',
		openSeaURI: 'https://testnets.opensea.io',
		raribleURI: 'https://rinkeby.rarible.com'
	}
};

export const isChainSupported = (id: number): boolean => Boolean(chains[id]);

export default chains;
