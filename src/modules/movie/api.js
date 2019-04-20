import { api } from "services";

export default {

	getAll: (data, meta) => api.request.get(api.queryBuilder("/movies", meta)),
	getPopular: (data, meta) => api.request.get(api.queryBuilder("/movie/popular", meta)),
	getNowPlaying: (data, meta) => api.request.get(api.queryBuilder("/movie/now_playing", meta))

};