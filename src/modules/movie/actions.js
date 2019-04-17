import { createRoutine } from "redux-saga-routines";

const LoadAll = createRoutine("LOAD_ALL_MOVIES");
const LoadPopular = createRoutine("LOAD_POPULAR_MOVIES");

export default {
	LoadAll,
    LoadPopular
};