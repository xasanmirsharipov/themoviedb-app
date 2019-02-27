import merge from 'lodash/merge';
import Action from "../actions/entities";

const initialState = {
	news: {},
	movies: {}
};

export default (state = initialState, action) => {

	switch (action.type){

		case Action.Load.SUCCESS:
			return merge({}, state, action.payload);

		default:
			return state;
	}

}