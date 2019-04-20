import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import get from "lodash/get";

import Schemas from "store/schemas";

const getEntities = state => state.entities;

const getAll = () => (
	createSelector(
		getEntities,
		(state, props) => get(state.movie, props.name, []),
		(entities, data) => {

			const { ids, isFetched, meta } = data;
			const normalized = denormalize({ movie: ids }, { movie: [ Schemas.movie ] }, entities);

			return {
				items: get(normalized, 'movie', []),
				isFetched,
				meta
			};
		}
	)
);

const getPopular = () => (
    createSelector(
        getEntities,
        (state, props) => get(state.movie, props.name, []),
        (entities, data) => {

            const { ids, isFetched, meta } = data;
            const normalized = denormalize({ movie: ids }, { movie: [ Schemas.movie ] }, entities);

            return {
                items: get(normalized, 'movie', []),
                isFetched,
                meta
            };
        }
    )
);

const getNowPlaying = () => (
    createSelector(
        getEntities,
        (state, props) => get(state.movie, props.name, []),
        (entities, data) => {

            const { ids, isFetched, meta } = data;
            const normalized = denormalize({ movie: ids }, { movie: [ Schemas.movie ] }, entities);

            return {
                items: get(normalized, 'movie', []),
                isFetched,
                meta
            };
        }
    )
);

export default {
	getAll,
    getPopular,
    getNowPlaying
};