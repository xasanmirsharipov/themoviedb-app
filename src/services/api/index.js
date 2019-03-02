import axios from 'axios';

import config from 'config';
import { query } from 'js-query-builder';

axios.defaults.params = {};
axios.defaults.params['_f'] = 'json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

const queryBuilder = (url, { fields = [], include = [], limit = 0, sort = '', filter = '', page = 1 }) => {

	let queryObj = query(url);

	console.log(queryObj);

	if(fields.length){
		queryObj.param('fields', fields);
	}

	if(include.length){
		queryObj.include(include);
	}

	if(limit > 0){
		queryObj.param('per-page', Number(limit));
	}

	if(sort){
		queryObj.sort(sort);
	}

	if(filter){
		queryObj.filter(filter);
	}

	if(page){
		queryObj.page(Number(page));
	}

	return decodeURIComponent(queryObj.build());
};

const request = axios.create({
	baseURL: config.API_ROOT
});

export default {
	request,
	queryBuilder
};