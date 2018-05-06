/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function historyCallsReducer(state = initialState.historyCalls, action) {
	switch (action.type) {
		case types.BEGIN_LOAD_HISTORY_CALLS:
			return {
				...state,
				...{
					isLoading: true,
					error: false
				}
			};
		case types.LOAD_HISTORY_CALLS_SUCCESS:
			return {
				...state,
				...{
					isLoading: false,
					error: false,
					teleCalls: action.teleCalls,
					currentPage: action.currentPage,
					totalPages: action.totalPages,
					totalCount: action.totalCount,
					limit: action.limit
				}
			};
		case types.LOAD_HISTORY_CALLS_ERROR:
			return {
				...state,
				...{
					isLoading: false,
					error: true
				}
			};
		default:
			return state;
	}
}
