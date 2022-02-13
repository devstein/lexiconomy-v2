import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	// redirect to /home
	return {
		status: 301,
		headers: {
			location: '/home'
		}
	};
};
