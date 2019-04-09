import { createRoutine } from 'redux-saga-routines';


const LoadAll = createRoutine('LOAD_ALL_NEWS');
const Reset = createRoutine('RESET');


export default {
	LoadAll,
	Reset,
}