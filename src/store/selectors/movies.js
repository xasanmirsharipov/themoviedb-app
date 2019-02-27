import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import movieScheme from "../schemas/movies";

const getEntities = state => state.entities;

const getAll = createSelector(
	getEntities,
	state => state.movies.all.ids,
	(entities, ids) => {
		const normalized = denormalize({ movies: ids }, { movies: [ movieScheme ] }, entities);
		return normalized.movies;
	}
);

export default {
	getAll
};