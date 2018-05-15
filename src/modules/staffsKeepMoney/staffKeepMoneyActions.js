import * as types from '../../constants/actionTypes';
import * as staffKeepMoneyApi from './staffKeepMoneyApi';

/*eslint no-console: 0 */
export function loadStaffsKeepMoney(page, search) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_STAFFS_KEEP_MONEY});
        staffKeepMoneyApi.loadStaffsKeepMoney(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_STAFFS_KEEP_MONEY_SUCCESS,
                    staffs: res.data.staffs,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    totalCount: res.data.total_staffs,
                    totalMoney: res.data.total_money,
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_STAFFS_KEEP_MONEY_ERROR});
            });
    };
}

export function loadHistoryTransactionStaff(staffId, page, type) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_HISTORY_TRANSACTION_STAFF_KEEP_MONEY});
        staffKeepMoneyApi.loadHistoryTransactionStaff(staffId, page, type)
            .then(res => {
                dispatch({
                    type: types.LOAD_HISTORY_TRANSACTION_STAFF_KEEP_MONEY_SUCCESS,
                    transactions: res.data.transactions,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_HISTORY_TRANSACTION_STAFF_KEEP_MONEY_ERROR});
            });
    };
}