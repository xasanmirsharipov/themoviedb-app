import { createRoutine } from "redux-saga-routines";

const LoadPopular = createRoutine("LOAD_POPULAR_MOVIES");
const LoadNowPlaying = createRoutine("LOAD_NOW_PLAYING");

export default {
    LoadPopular,
    LoadNowPlaying
};