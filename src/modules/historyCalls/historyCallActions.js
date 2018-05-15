import * as types from '../../constants/actionTypes';
import * as historyCallsApi from './historyCallsApi';

/*eslint no-console: 0 */

export function historyCalls(page, salerId, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_CALLS
        });
        historyCallsApi.historyCalls(page, salerId, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_HISTORY_CALLS_SUCCESS,
                    teleCalls: res.data.tele_calls,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    totalCount: res.data.paginator.total_count,
                    limit: res.data.paginator.limit
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_HISTORY_CALLS_ERROR
            });
        });
    };
}






