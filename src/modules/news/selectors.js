import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import get from "lodash/get";

import newsScheme from "./schema";


const getEntities = state => state.entities;

const getAll = createSelector(
	getEntities,
	state => state.news.all.ids,
	(entities, ids) => {
		const normalized = denormalize({ news: ids }, { news: [ newsScheme ] }, entities);
		return get(normalized, 'news', []);
	}
);


export default {
	getAll
};