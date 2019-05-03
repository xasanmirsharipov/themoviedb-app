import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import history from './history';

export const sagaMiddleware = createSagaMiddleware();

const middlewares = [
	routerMiddleware(history),
	sagaMiddleware
];

if (process.env.NODE_ENV === 'development') {
	const { createLogger } = require('redux-logger');

	middlewares.push(createLogger());
}

export default middlewares;
