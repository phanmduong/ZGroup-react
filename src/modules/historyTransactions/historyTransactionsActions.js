import * as types from '../../constants/actionTypes';
import * as historyTransactionsApi from './historyTransactionsApi';


export function loadHistoryTransactions(page, type) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_HISTORY_TRANSACTIONS});
        historyTransactionsApi.loadHistoryTransactions(page, type)
            .then(res => {
                dispatch({
                    type: types.LOAD_HISTORY_TRANSACTIONS_SUCCESS,
                    transactions: res.data.transactions,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_HISTORY_TRANSACTIONS_ERROR});
            });
    };
}