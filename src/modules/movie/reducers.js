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

		case Actions.LoadPopular.REQUEST:
        case Actions.LoadNowPlaying.REQUEST:{
			const { name } = action.payload;
			return {
				...state,
				[name]: {
					...get(state, name, []),
					isFetched: false
				}
			};
		}
        case Actions.LoadPopular.SUCCESS:
        case Actions.LoadNowPlaying.SUCCESS:{
			const { name, ids, meta } = action.payload;
			return {
				...state,
				[name]: {
					...get(state, name, []),
					ids: uniq([
						...ids
					]),
					meta,
					isFetched: true
				}
			};
		}
        case Actions.LoadPopular.FAILURE:
        case Actions.LoadNowPlaying.FAILURE:{
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