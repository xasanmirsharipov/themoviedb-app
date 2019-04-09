import { put, call } from 'redux-saga/effects';

import { LoadAll } from '../sagas';
import Actions from "store/actions";

import { api } from "services";

describe('movie sagas', () => {

	describe('LoadAll', () => {

		const saga = LoadAll();

		it('should request', () => {
			const output = saga.next().value;
			const expected = put(Actions.movie.LoadAll.request());

			expect(output).toEqual(expected);
		});

		it('should call api', () => {
			const output = saga.next().value;
			const expected = call(api.request.get, api.queryBuilder(`/movies`));

			expect(output).toEqual(expected);
		});

		it('should load entities', () => {
			const output = saga.next().value;
			const expected = put(Actions.entities.Load.success());

			expect(output).toEqual(expected);
		});

	});

});