import { createRoutine } from "redux-saga-routines";

const LoadAll = createRoutine("LOAD_ALL");
const LoadOne = createRoutine("LOAD_ONE");

export default {
    LoadAll,
    LoadOne
};