import Action from "../actions/movies";

const initialState = {
	all: {
		ids: [],
		isFetched: false,
		meta: {}
	},
};

export default (state = initialState, action) => {

	switch (action.type){

		case Action.LoadAll.REQUEST:
			return {
				...state,
				isFetched: false
			};

		case Action.LoadAll.SUCCESS:
			return {
				...state,
				isFetched: true,
				ids: action.payload
			};

		case Action.LoadAll.FAILURE:
			return {
				...state,
				isFetched: true
			};

		default:
			return state;
	}

}