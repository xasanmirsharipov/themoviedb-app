import { takeLatest, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';
import { api } from 'services';

import entityAction from '../actions/entities';
import moviesAction from '../actions/movies';

import movieScheme from '../schemas/movies';

function* LoadAll(){

	try {

		yield put(moviesAction.LoadAll.request());

		const { data } = yield call(api.request.get, api.queryBuilder(`/movies`));

		const normalizedData = normalize(data.data, [ movieScheme ]);

		yield put(entityAction.Load.success(normalizedData.entities));

		yield put(moviesAction.LoadAll.success({
			ids: normalizedData.result,
			meta: data._meta
		}));

	} catch(e){

		yield put(entityAction.Load.failure(e.response.data));

	}
}

export default function* root() {
	yield all([
		takeLatest(moviesAction.LoadAll.TRIGGER, LoadAll),
	]);
}