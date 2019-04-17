import axios from 'axios';
import * as Sentry from '@sentry/browser';

import config from 'config';
import { query } from 'js-query-builder';

const request = axios.create({
	baseURL: config.API_ROOT
});

request.defaults.params = {};
request.defaults.params['_f'] = 'json';
request.defaults.params['api_key'] = config.API_KEY;
request.defaults.headers.common['Accept'] = 'application/json';
request.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';

request.interceptors.response.use(
	(response) => response,
	(error) => {
		Sentry.captureException(error);
		return Promise.reject(error);
	}
);

const queryBuilder = (url, { fields = [], include = [], limit = 0, sort = '', filter = '', page = 1 } = {}) => {

	let queryObj = query(url);

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

	if(filter.length){
		queryObj.filter(filter);
	}

	if(page > 1){
		queryObj.page(Number(page));
	}

	return decodeURIComponent(queryObj.build());
};

export default {
	request,
	queryBuilder
};