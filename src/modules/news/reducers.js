import Actions from "./actions";


const initialState = {
	all: {
		ids: [],
		isFetched: false,
		meta: {}
	},
};


export default (state = initialState, action) => {

	switch (action.type){

		case Actions.LoadAll.REQUEST:
			return {
				...state,
				all: {
					...state.all,
					isFetched: false
				}
			};

		case Actions.LoadAll.SUCCESS:
			return {
				...state,
				all: {
					...state.all,
					isFetched: true,
					ids: action.payload
				}
			};

		case Actions.LoadAll.FAILURE:
			return {
				...state,
				all: {
					...state.all,
					isFetched: true
				}
			};

		default:
			return state;
	}

}