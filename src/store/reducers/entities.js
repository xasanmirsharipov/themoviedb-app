import merge from 'lodash/merge';
import Actions from "store/actions";


const initialState = {
};


export default (state = initialState, action) => {

	switch (action.type){

		case Actions.entities.Load.SUCCESS:
			return merge({}, state, action.payload);

		default:
			return state;
	}

}