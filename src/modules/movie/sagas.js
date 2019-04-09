import { takeEvery, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';

import api from "./api";
import Actions from "store/actions";
import Schemas from "store/schemas";

export function* LoadAll(action){

	const { name, data, meta, cb } = action.payload;

	try {

		const { data } = yield call(api.getAll, data, meta);

		// const data = {
		// 	data: [
		// 		{
		// 			id: 1,
		// 			name: 'Movie 1'
		// 		},
		// 		{
		// 			id: 2,
		// 			name: 'Movie 2'
		// 		},
		// 	],
		// 	_meta: {
		// 		totalCount: 1,
		// 		perPage: 20,
		// 		currentPage: 1,
		// 		pageCount: 1
		// 	}
		// };

		const normalized = normalize(data.data, [ Schemas.movie ]);

		yield put(Actions.entities.Load.success(normalized.entities));

		yield put(Actions.movie.LoadAll.success({
			name,
			ids: normalized.result,
			meta: data._meta
		}));

		yield call(cb.success);

	} catch(error){

		yield put(Actions.movie.LoadAll.failure({
			name,
			error
		}));

		yield call(cb.error);

	}
}

export default function* root() {
	yield all([
		takeEvery(Actions.movie.LoadAll.REQUEST, LoadAll),
	]);
}