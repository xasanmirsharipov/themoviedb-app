import { all } from 'redux-saga/effects';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';

import movies from './movies';
import news from './news';

export default function* rootSaga() {
	yield all([
		movies,
		news,
		routinePromiseWatcherSaga
	]);
}