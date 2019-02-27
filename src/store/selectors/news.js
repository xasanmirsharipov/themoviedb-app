import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import newsScheme from "../schemas/news";

const getEntities = state => state.entities;

const getAll = createSelector(
	getEntities,
	state => state.news.all.ids,
	(entities, ids) => {
		const normalized = denormalize({ news: ids }, { news: [ newsScheme ] }, entities);
		return normalized.news;
	}
);

export default {
	getAll
};