import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entities from './entities';
import movies from './movies';
import news from './news';

export default combineReducers({
	router: routerReducer,
	entities,
	movies,
	news,
});