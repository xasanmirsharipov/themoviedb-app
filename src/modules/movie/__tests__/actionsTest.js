import Actions from '../actions';

describe('actions', () => {
	it('should create an action for LOAD_ALL_TRIGGER', () => {
		expect(Actions.LoadAll.trigger()).toEqual({ type: Actions.LoadAll.TRIGGER });
	});
	it('should create an action for LOAD_ALL_REQUEST', () => {
		expect(Actions.LoadAll.request()).toEqual({ type: Actions.LoadAll.REQUEST });
	});
	it('should create an action for LOAD_ALL_SUCCESS', () => {
		const payload = {
			values: {
				data: 1
			},
			cb: () => {}
		};
		expect(Actions.LoadAll.success(payload)).toEqual({ type: Actions.LoadAll.SUCCESS, payload });
	});
});