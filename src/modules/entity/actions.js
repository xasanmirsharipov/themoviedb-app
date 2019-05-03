import { createRoutine } from "redux-saga-routines";

const LoadAll = createRoutine("LOAD_ALL_ENTITY");
const LoadOne = createRoutine("LOAD_ONE_ENTITY");

export default {
	LoadAll,
	LoadOne
};