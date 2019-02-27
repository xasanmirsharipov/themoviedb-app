import { all, fork } from 'redux-saga/effects';

import movies from './movies';
import news from './news';

export default function* rootSaga() {
	yield all([
		fork(movies),
		fork(news)
	]);
}