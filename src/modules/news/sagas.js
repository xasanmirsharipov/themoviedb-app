import { takeLatest, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';
import { api } from 'services';

import Actions from "store/actions";
import Schemas from "store/schemas";


function* LoadAll(){

	try {

		yield put(Actions.news.LoadAll.request());

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

		const { data } = yield call(api.request.get, api.queryBuilder('/department'));

		const normalizedData = yield call(normalize, data.data, [ Schemas.news ]);

		yield put(Actions.entities.Load.success(normalizedData.entities));

		yield put(Actions.news.LoadAll.success({
			ids: normalizedData.result,
			meta: data._meta
		}));

	} catch(e){

		yield put(Actions.news.LoadAll.failure(e.data));

	} finally {

		yield put(Actions.news.LoadAll.fulfill());

	}
}


export default function* root() {
	yield all([
		takeLatest(Actions.news.LoadAll.TRIGGER, LoadAll),
	]);
}