import { SEND_ANSWERS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SEND_ANSWERS:
			console.log('action.payload.data ', action.payload.data);
			return [action.payload.data, ...state];
		default:
			return state;
	}
};