/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function summaryFinanceReducer(state = initialState.summaryFinance, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_DATA_SUMMARY_FINANCE:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                    errorGens: false
                }
            };
        case types.LOAD_GENS_SUMMARY_FINANCE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: false,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_SUMMARY_FINANCE_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: true
                }
            };
        case types.BEGIN_LOAD_SUMMARY_FINANCE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_SUMMARY_FINANCE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    summary: action.summary
                }
            };
        case types.LOAD_SUMMARY_FINANCE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_LOAD_HISTORY_TRANSACTION_SUMMARY_FINANCE:
            return {
                ...state,
                historyTransaction: {
                    ...state.historyTransaction,
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_HISTORY_TRANSACTION_SUMMARY_FINANCE_SUCCESS:
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
        case types.LOAD_HISTORY_TRANSACTION_SUMMARY_FINANCE_ERROR:
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