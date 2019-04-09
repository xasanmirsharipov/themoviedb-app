import requireContext from 'require-context.macro';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { importAll } from "store/utils";

const moduleReducers = importAll(requireContext('modules', true, /\/reducers.js$/), 'reducers.js');
const reducers = importAll(requireContext('.', true, /^\.\/(?!index)\w+$/), '.js');

const rootReducer = combineReducers({
	router: routerReducer,
	...moduleReducers,
	...reducers
});

export default (state, action) => (
	action.type === 'RESET/TRIGGER' ? rootReducer(undefined, action) : rootReducer(state, action)
)