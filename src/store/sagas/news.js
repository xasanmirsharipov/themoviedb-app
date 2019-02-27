import { takeLatest, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';
import { api } from 'services';

import entityAction from '../actions/entities';
import newsAction from '../actions/news';

import newsScheme from '../schemas/news';

function* LoadAll(){

	try {

		yield put(newsAction.LoadAll.request());

		const { data } = yield call(api.request.get, api.queryBuilder(`/news`));

		const normalizedData = normalize(data.data, [ newsScheme ]);

		yield put(entityAction.Load.success(normalizedData.entities));

		yield put(newsAction.LoadAll.success({
			ids: normalizedData.result,
			meta: data._meta
		}));

	} catch(e){

		yield put(entityAction.Load.failure(e.response.data));

	}
}

export default function* root() {
	yield all([
		takeLatest(newsAction.LoadAll.TRIGGER, LoadAll),
	]);
}