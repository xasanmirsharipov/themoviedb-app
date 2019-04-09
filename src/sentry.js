import * as Sentry from '@sentry/browser';

export const init = () => {
	const { REACT_APP_SENTRY_DSN } = process.env;

	if (REACT_APP_SENTRY_DSN) {
		Sentry.init({ dsn: REACT_APP_SENTRY_DSN });
	}
};

export default {
	init
};