import * as types from '../../constants/actionTypes';
import * as historyCollectMoneyApi from './historyCollectMoneyApi';

/*eslint no-console: 0 */

export function historyCollectMoney(filter) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_COLLECT_MONEY
        });
        historyCollectMoneyApi.historyCollectMoney(filter)
            .then((res) => {
                dispatch({
                    type: types.LOAD_HISTORY_COLLECT_MONEY_SUCCESS,
                    registers: res.data.registers,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_HISTORY_COLLECT_MONEY_ERROR
            });
        });
    };
}






