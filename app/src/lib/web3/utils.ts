export const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

export const isZeroAddr = (address: string): boolean =>
	address.toLowerCase() === ZERO_ADDR.toLowerCase();
