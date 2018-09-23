import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function spendMoneyReducer(state = initialState.spendMoney, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_HISTORY_TRANSACTION_SPEND_MONEY:
            return {
                ...state,
                historyTransaction: {
                    ...state.historyTransaction,
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_HISTORY_TRANSACTION_SPEND_MONEY_SUCCESS:
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
        case types.LOAD_HISTORY_TRANSACTION_SPEND_MONEY_ERROR:
            return {
                ...state,
                historyTransaction: {
                    ...state.historyTransaction,
                    isLoading: false,
                    error: true,
                }
            };
        case types.BEGIN_LOAD_CATEGORY_TRANSACTIONS_SPEND_MONEY:
            return {
                ...state,
                isLoadingCategories: true,
                errorCategories: false,
            };
        case types.LOAD_CATEGORY_TRANSACTIONS_SPEND_MONEY_SUCCESS:
            return {
                ...state,
                isLoadingCategories: false,
                errorCategories: false,
                categories: action.categories,
            };
        case types.LOAD_CATEGORY_TRANSACTIONS_SPEND_MONEY_ERROR:
            return {
                ...state,
                isLoadingCategories: false,
                errorCategories: true,
            };
        case types.BEGIN_LOAD_USER_SPEND_MONEY:
            return {
                ...state,
                ...{
                    isLoadingUser: true,
                    errorLoadUser: false,
                }
            };
        case types.LOAD_USER_SPEND_MONEY_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingUser: false,
                    errorLoadUser: false,
                    user: action.user
                }
            };
        case types.LOAD_USER_SPEND_MONEY_ERROR:
            return {
                ...state,
                ...{
                    isLoadingUser: false,
                    errorLoadUser: true,
                }
            };
        case types.BEGIN_CREATE_TRANSACTION_SPEND_MONEY:
            return {
                ...state,
                ...{
                    isCreatingTransaction: true,
                    errorCreateTransaction: false,
                }
            };
        case types.CREATE_TRANSACTION_SPEND_MONEY_SUCCESS:
            return {
                ...state,
                ...{
                    isCreatingTransaction: false,
                    errorCreateTransaction: false,
                    historyTransaction: {
                        ...state.historyTransaction,
                        transactions: [action.transaction, ...state.historyTransaction.transactions]
                    },
                    user: {
                        ...state.user,
                        money: action.moneyStaff
                    }
                }
            };
        case types.CREATE_TRANSACTION_SPEND_MONEY_ERROR:
            return {
                ...state,
                ...{
                    isCreatingTransaction: false,
                    errorCreateTransaction: true,
                }
            };
        default:
            return state;
    }
}
