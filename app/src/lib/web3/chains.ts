export interface ChainInfo {
	name: string;
	lexiconomyAddress: string;
	blockExplorerURI: string;
	openSeaURI: string;
	raribleURI: string;
}

const chains: Record<number, ChainInfo> = {
	// 1: { name: 'Mainet', lexiconomyAddress: '', blockExplorerURI: 'https://etherscan.io/' },
	4: {
		name: 'Rinkeby',
		lexiconomyAddress: '0xAfEFf024498D2C78D1Eb9348aBc91912ea80b8E3',
		blockExplorerURI: 'https://rinkeby.etherscan.io',
		openSeaURI: 'https://testnets.opensea.io',
		raribleURI: 'https://rinkeby.rarible.com'
	},
	// 137: { name: 'Polygon', lexiconomyAddress: '', blockExplorerURI: 'https://polygonscan.com/' },
	80001: {
		name: 'Mumbai',
		lexiconomyAddress: '0x1E17a1ED19E4617Cae8f5d713009ac326f156eee',
		blockExplorerURI: 'https://mumbai.polygonscan.com',
		openSeaURI: 'https://testnets.opensea.io',
		raribleURI: 'https://rinkeby.rarible.com'
	}
};

export const isChainSupported = (id: number): boolean => Boolean(chains[id]);

export default chains;
