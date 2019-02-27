import axios from 'axios';
import buildUrl from 'build-url';
import qs from 'query-string';

import config from 'config';

axios.defaults.params = {};
axios.defaults.params['_f'] = 'json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

const queryBuilder = (url, { fields = [], include = [], limit = 0, sort = '', filter = '', page = 1 } = {}) => {

	let query = {};

	if(fields.length){
		query.fields = fields;
	}

	if(include.length){
		query.include = include;
	}

	if(limit > 0){
		query['per-page'] = Number(limit);
	}

	if(sort){
		query.sort = sort;
	}

	if(filter){
		query = qs.stringify(filter);
	}

	if(page){
		query.page = Number(page);
	}

	return buildUrl({
		path: url,
		queryParams: query
	});
};

const request = axios.create({
	baseURL: config.API_ROOT
});

export default {
	request,
	queryBuilder
};