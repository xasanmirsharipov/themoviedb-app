import { takeLatest, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';
import { api } from 'services';

import entityAction from '../actions/entities';
import newsAction from '../actions/news';

import newsScheme from '../schemas/news';

function* LoadAll(){

	try {

		yield put(newsAction.LoadAll.request());

		const query = {
			fields: [
				'first',
				'second'
			],
			include: [
				'first',
				'second'
			],
			limit: 1,
			sort: '-id',
			filter: {
				top: 1,
				level: 0
			},
			page: 10
		};

		const { data } = yield call(api.request.get, api.queryBuilder('/department', query));

		const normalizedData = yield call(normalize, data.data, [ newsScheme ]);

		yield put(entityAction.Load.success(normalizedData.entities));

		yield put(newsAction.LoadAll.success({
			ids: normalizedData.result,
			meta: data._meta
		}));

	} catch(e){

		yield put(newsAction.LoadAll.failure(e.data));

	} finally {

		yield put(newsAction.LoadAll.fulfill());

	}
}

export default function* root() {
	yield all([
		takeLatest(newsAction.LoadAll.TRIGGER, LoadAll),
	]);
}