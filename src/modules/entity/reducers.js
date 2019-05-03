import Actions from "./actions";
import get from "lodash/get";
import uniq from "lodash/uniq";

const initialState = {
    all: {
        ids: [],
        isFetched: false,
        meta: {}
    },
};

export default (state = initialState, action) => {

    switch (action.type){

        case Actions.LoadAll.REQUEST: {
            const { entity, name } = action.payload;
            return {
                ...state,
                [entity]: {
                    ...get(state, entity, []),
                    [name]: {
                        ...get(state, `${entity}.${name}`, []),
                        isFetched: false
                    }
                }
            };
        }

        case Actions.LoadAll.SUCCESS: {
            const { entity, name, ids, meta, appendIds } = action.payload;

            const oldIds = appendIds ? get(state, `${entity}.${name}.ids`, []) : [];

            return {
                ...state,
                [entity]: {
                    ...get(state, entity, []),
                    [name]: {
                        ...get(state, `${entity}.${name}`, []),
                        ids: uniq([
                            ...oldIds,
                            ...ids
                        ]),
                        meta,
                        isFetched: true
                    }
                }
            };
        }

        case Actions.LoadAll.FAILURE: {
            const { entity, name, error } = action.payload;
            return {
                ...state,
                [entity]: {
                    ...get(state, entity, []),
                    [name]: {
                        ...get(state, `${entity}.${name}`, []),
                        error,
                        isFetched: true
                    }
                }
            };
        }

        case Actions.LoadOne.REQUEST: {
            const { entity, name } = action.payload;

            return {
                ...state,
                [entity]: {
                    ...get(state, entity, []),
                    [`${name}One`]: {
                        ...get(state, `${entity}.${name}One`, []),
                        isFetched: false
                    }
                }
            };
        }

        case Actions.LoadOne.SUCCESS: {
            const { entity, name, id } = action.payload;
            return {
                ...state,
                [entity]: {
                    ...get(state, entity, []),
                    [`${name}One`]: {
                        ...get(state, `${entity}.${name}One`, []),
                        id,
                        isFetched: true
                    }
                }
            };
        }

        case Actions.LoadOne.FAILURE: {
            const { entity, name, error } = action.payload;
            return {
                ...state,
                [entity]: {
                    ...get(state, entity, []),
                    [`${name}One`]: {
                        ...get(state, `${entity}.${name}One`, []),
                        error,
                        isFetched: true
                    }
                }
            };
        }

        default:
            return state;
    }
}
