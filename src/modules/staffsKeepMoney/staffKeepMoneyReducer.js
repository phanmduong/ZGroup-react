import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function staffsKeepMoneyReducer(state = initialState.staffsKeepMoney, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_STAFFS_KEEP_MONEY:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_STAFFS_KEEP_MONEY_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    staffs: action.staffs,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    totalCount: action.totalCount,
                    totalMoney: action.totalMoney,
                }
            };
        case types.LOAD_STAFFS_KEEP_MONEY_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.BEGIN_LOAD_HISTORY_TRANSACTION_STAFF_KEEP_MONEY:
            return {
                ...state,
                historyTransaction: {
                    ...state.historyTransaction,
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_HISTORY_TRANSACTION_STAFF_KEEP_MONEY_SUCCESS:
            return {
                ...state,
                historyTransaction: {
                    ...state.historyTransaction,
                    isLoading: false,
                    error: false,
                    transactions: action.transactions,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_HISTORY_TRANSACTION_STAFF_KEEP_MONEY_ERROR:
            return {
                ...state,
                historyTransaction: {
                    ...state.historyTransaction,
                    isLoading: false,
                    error: true,
                }
            };
        default:
            return state;
    }
}
