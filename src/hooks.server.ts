import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle, error } from '@sveltejs/kit';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { isValidAdmin } from './utils/auth/verify';

const adminStringLength = '/admin/'.length;

const authorization: Handle = async ({ event, resolve }) => {
	// Protect any routes under /admin
	if (event.url.pathname.startsWith('/admin')) {
		const session = await event.locals.getSession();
		if (!session || !session.user) {
			const remainingUrl = event.url.pathname.substring(adminStringLength);
			throw redirect(303, `/auth/${remainingUrl}`);
		} else if (!isValidAdmin(session.user)) {
			throw error(401, "No Arjun Allowed");
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
};

export const handle = sequence(
	SvelteKitAuth({
		providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
	}),
	authorization
);
