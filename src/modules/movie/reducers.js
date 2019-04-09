import Actions from "./actions";
import get from "lodash/get";
import uniq from "lodash/uniq";

const initialState = {
	all: {
		ids: [],
		isFetched: false,
		meta: {}
	}
};

export default (state = initialState, action) => {
	switch (action.type){
		case Actions.LoadAll.REQUEST:{
			const { name } = action.payload;
			return {
				...state,
				[name]: {
					...get(state, name, []),
					isFetched: false
				}
			};
		}
		case Actions.LoadAll.SUCCESS:{
			const { name, ids, meta } = action.payload;
			return {
				...state,
				[name]: {
					...get(state, name, []),
					ids: uniq([
						...get(state[name], "ids", []),
						...ids
					]),
					meta,
					isFetched: true
				}
			};
		}
		case Actions.LoadAll.FAILURE:{
			const { name, error } = action.payload;
			return {
				...state,
				[name]: {
					...get(state, name, []),
					error,
					isFetched: true
				}
			};
		}
		default:
			return state;
	}
}