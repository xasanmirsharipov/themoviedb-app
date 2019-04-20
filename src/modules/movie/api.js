import { api } from "services";

export default {

	getPopular: (data, meta) => api.request.get(api.queryBuilder("/movie/popular", meta)),
	getNowPlaying: (options, meta) => api.request.get(api.queryBuilder(`/movie/${options.slug}`, meta))

};