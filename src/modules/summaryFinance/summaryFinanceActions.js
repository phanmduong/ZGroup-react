import * as types from '../../constants/actionTypes';
import * as summaryFinanceApi from './summaryFinanceApi';

/*eslint no-console: 0 */
export function loadSummaryFinance(genId, startTime, endTime) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_FINANCE
        });
        summaryFinanceApi.loadSummaryFinance(genId, startTime, endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SUMMARY_FINANCE_SUCCESS,
                    summary: res.data.data,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_SUMMARY_FINANCE_ERROR
            });
        });
    };
}

export function loadGensData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA_SUMMARY_FINANCE
        });
        summaryFinanceApi.loadGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_SUMMARY_FINANCE_SUCCESS,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GENS_SUMMARY_FINANCE_ERROR
            });
        });
    };
}

export function loadHistoryTransactions(page, type, genId, startTime, endTime) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_HISTORY_TRANSACTION_SUMMARY_FINANCE});
        summaryFinanceApi.loadHistoryTransactions(page, type, genId, startTime, endTime)
            .then(res => {
                dispatch({
                    type: types.LOAD_HISTORY_TRANSACTION_SUMMARY_FINANCE_SUCCESS,
                    transactions: res.data.transactions,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_HISTORY_TRANSACTION_SUMMARY_FINANCE_ERROR});
            });
    };
}


