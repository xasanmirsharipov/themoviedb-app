import { createRoutine, promisifyRoutine } from 'redux-saga-routines';

const LoadAll = promisifyRoutine(createRoutine('LOAD_ALL_MOVIES'));

export default {
	LoadAll
}