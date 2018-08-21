import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function historyDebtReducer(state = initialState.historyDebt, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_COMPANIES: {
            return {
                ...state,
                isLoadingCompanies: true,
            };
        }
        case types.LOAD_COMPANIES_SUCCESS: {
            return {
                ...state,
                isLoadingCompanies: false,
                companies: action.data,
                paginatorCompanies: action.paginator,
            };
        }
        case types.LOAD_COMPANIES_ERROR: {
            return {
                ...state,
                isLoadingCompanies: false,
            };
        }
        case types.BEGIN_LOAD_HISTORY_DEBT: {
            return {
                ...state,
                isLoadingHistoryDebt: true,
            };
        }
        case types.LOAD_HISTORY_DEBT_SUCCESS: {
            return {
                ...state,
                isLoadingHistoryDebt: false,
                historyDebt: action.data,
                paginatorHistoryDebt: action.paginator,
            };
        }
        case types.LOAD_HISTORY_DEBT_ERROR: {
            return {
                ...state,
                isLoadingHistoryDebt: false,
            };
        }
        default:
            return state;

    }

}