import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function historyTransactionsReducer(state = initialState.historyTransactions, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_HISTORY_TRANSACTIONS:
            return {
                ...state,
                isLoading: true,
                error: false,
            };
        case types.LOAD_HISTORY_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                transactions: action.transactions,
                currentPage: action.currentPage,
                totalPages: action.totalPages
            };
        case types.LOAD_HISTORY_TRANSACTIONS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        default:
            return state;
    }
}
