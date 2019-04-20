import { createRoutine } from "redux-saga-routines";

const LoadAll = createRoutine("LOAD_ALL_MOVIES");
const LoadPopular = createRoutine("LOAD_POPULAR_MOVIES");
const LoadNowPlaying = createRoutine("LOAD_NOW_PLAYING");

export default {
	LoadAll,
    LoadPopular,
    LoadNowPlaying
};