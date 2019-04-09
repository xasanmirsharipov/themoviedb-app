import requireContext from 'require-context.macro';
import { all, fork } from 'redux-saga/effects';
import { importAll } from "store/utils";

let moduleSagas = importAll(requireContext('../../modules', true, /\/sagas.js$/), 'sagas.js');
moduleSagas = Object.keys(moduleSagas).reduce((prev, curr) => [...prev, fork(moduleSagas[curr])], []);

export default function* rootSaga() {
	yield all([
		...moduleSagas
	]);
}