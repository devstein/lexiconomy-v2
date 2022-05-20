import type { Provider } from '@ethersproject/abstract-provider';

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

export const isZeroAddr = (address: string): boolean =>
	address.toLowerCase() === ZERO_ADDR.toLowerCase();

export const displayAddress = async (address: string, provider?: Provider): Promise<string> => {
	const shortendAddress = `${address.slice(0, 8)}...`;

	if (!provider) return shortendAddress;

	try {
		const ens = await provider.lookupAddress(address);

		if (!ens) return shortendAddress;

		// TODO: Avatar
		// IF name exists,
		// const resolver = await provider.getResolver("ricmoo.eth");
		// const { url } =  await resolver.getAvatar();

		return ens;
	} catch {
		return shortendAddress;
	}
};
