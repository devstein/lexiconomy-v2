export interface ChainInfo {
	name: string;
	lexiconomyAddress: string;
	blockExplorerURI: string;
}

const chains: Record<number, ChainInfo> = {
	// 1: { name: 'Mainet', lexiconomyAddress: '', blockExplorerURI: 'https://etherscan.io/' },
	3: {
		name: 'Ropsten',
		lexiconomyAddress: '0xa4097dADAA50DBe0fEF2dD2D5c6699a930F287a6',
		blockExplorerURI: 'https://ropsten.etherscan.io/'
	},
	4: {
		name: 'Rinkeby',
		lexiconomyAddress: '0x5E665E41dF55470FD7284Cf9E48cE427FC34f7b5',
		blockExplorerURI: 'https://rinkeby.etherscan.io/'
	},
	// 137: { name: 'Polygon', lexiconomyAddress: '', blockExplorerURI: 'https://polygonscan.com/' },
	80001: {
		name: 'Mumbai',
		lexiconomyAddress: '0x1E17a1ED19E4617Cae8f5d713009ac326f156eee',
		blockExplorerURI: 'https://mumbai.polygonscan.com/'
	}
};

export const isChainSupported = (id: number): boolean => Boolean(chains[id]);

export default chains;
