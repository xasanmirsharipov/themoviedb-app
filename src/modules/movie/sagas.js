import { takeEvery, takeLatest, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';

import {api} from "services";
import Actions from "store/actions";
import Schemas from "store/schemas";

export function* LoadAll(action){

    const { url, options, name, meta, cb } = action.payload;

    try {

        const { data } = yield call(api.request.get, api.queryBuilder(url));

        const normalized = normalize(data.results, [ Schemas.movie ]);

        yield put(Actions.entities.Load.success(normalized.entities));

        yield put(Actions.movie.LoadAll.success({
            name,
            ids: normalized.result,
            meta: {page: data.page, total_pages: data.total_pages, total_results: data.total_results}
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