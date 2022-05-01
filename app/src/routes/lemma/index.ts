import type { RequestHandler } from '@sveltejs/kit';

// for now redirect to explore
export const get: RequestHandler = async () => {
	return {
		status: 301,
		headers: {
			location: `/explore`
		}
	};
};
