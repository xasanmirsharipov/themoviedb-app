import { takeEvery, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';

import { api } from "services";

import Actions from "store/actions";
import EntitySchema from "./schema";

export function* LoadAll(action){

	const { entity, name, url, params, appendIds } = action.payload;

	try {

		const { data } = yield call(api.request.get, api.queryBuilder(url, params));

		const normalized = normalize(data.results, [ EntitySchema(entity) ]);

		yield put(Actions.entities.Load.success(normalized.entities));

		yield put(Actions.entity.LoadAll.success({
			entity,
			name,
			meta: {
				page: data.page,
                total_pages: data.total_pages,
                total_results: data.total_results
			},
			ids: normalized.result,
            appendIds
		}));

	} catch(error){

		yield put(Actions.entity.LoadAll.failure({
			name,
			error
		}));

	}
}

export function* LoadOne(action){

	const { entity, url, name } = action.payload;

	try {

		const { data } = yield call(api.request.get, api.queryBuilder(url));

		const normalized = normalize(data, EntitySchema(entity));

		yield put(Actions.entities.Load.success(normalized.entities));

		yield put(Actions.entity.LoadOne.success({
			entity,
			name,
			id: normalized.result
		}));

	} catch(error){

		yield put(Actions.entity.LoadOne.failure({
			entity,
			error
		}));

	}
}

export default function* root() {
	yield all([
		takeEvery(Actions.entity.LoadAll.REQUEST, LoadAll),
		takeEvery(Actions.entity.LoadOne.REQUEST, LoadOne),
	]);
}