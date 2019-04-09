import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import history from './history';

const sagaMonitor = process.env.NODE_ENV !== 'production' ? console.tron.createSagaMonitor() : null;

export const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [
	routerMiddleware(history),
	sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require('redux-logger');

	const USE_LOGGING = false;
	const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'];

	const logger = createLogger({
		predicate: (getState, { type }) => USE_LOGGING && SAGA_LOGGING_BLACKLIST.includes(type)
	});

	middlewares.push(logger);
}

export default middlewares;
