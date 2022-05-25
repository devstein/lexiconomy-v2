import type { RequestHandler } from '@sveltejs/kit';

// TODO: Change to "https://lexiconomy.org";
const BASE_URL = 'https://lexiconomy-v2.vercel.app';

export const get: RequestHandler = async () => {
	return {
		body: {
			name: 'Lexiconomy v2',
			description:
				'the lexiconomy is the world’s first decentralized and economized dictionary, empowering anyone to coin a word or phrase. it’s a dictionary for all languages, people, and cultures.',
			image: `${BASE_URL}/images/lexiconomy.svg`,
			external_link: BASE_URL,
			// 2.5%
			seller_fee_basis_points: 250,
			// ceo address
			fee_recipient: '0x361e1401E01DAA5990c4A351Ed052bb79649833A'
		}
	};
};
