import { takeEvery, takeLatest, call, put, all } from "redux-saga/effects";
import { normalize } from 'normalizr';

import api from "./api";
import Actions from "store/actions";
import Schemas from "store/schemas";

export function* LoadAll(action){

	const { name, meta, cb } = action.payload;

	try {

		const { data } = yield call(api.getAll, data, meta);

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

export function* LoadPopular(action){

    const { name, meta, cb } = action.payload;

    try {

        const { data } = yield call(api.getPopular, data, meta);

        const normalized = normalize(data.results, [ Schemas.movie ]);

        yield put(Actions.entities.Load.success(normalized.entities));

        yield put(Actions.movie.LoadPopular.success({
            name,
            ids: normalized.result,
            meta: {page: data.page, total_pages: data.total_pages, total_results: data.total_results}
        }));

        yield call(cb.success);

    } catch(error){

        yield put(Actions.movie.LoadPopular.failure({
            name,
            error
        }));

        yield call(cb.error);

    }
}

export function* LoadNowPlaying(action){

    const { name, meta, cb } = action.payload;

    try {

        const { data } = yield call(api.getNowPlaying, data, meta);

        const normalized = normalize(data.results, [ Schemas.movie ]);

        yield put(Actions.entities.Load.success(normalized.entities));

        yield put(Actions.movie.LoadNowPlaying.success({
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
		takeLatest(Actions.movie.LoadPopular.REQUEST, LoadPopular),
		takeLatest(Actions.movie.LoadNowPlaying.REQUEST, LoadNowPlaying),
	]);
}