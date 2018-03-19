import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';


let transactionsData;

function changeLoadingTransactions(transactions, transactionId, status) {
    if (transactions) {
        transactions = transactions.map((transaction) => {
            if (transaction.id == transactionId) {
                return {
                    ...transaction,
                    isLoading: status
                };
            }
            return {...transaction};
        });
    }
    return transactions;
}

function changeDataTransaction(transactions, transactionData) {
    if (transactions) {
        transactions = transactions.map((transaction) => {
            if (transaction.id == transactionData.id) {
                return {...transactionData};
            }
            return {...transaction};
        });
    }
    return transactions;
}

export default function moneyTransferReducer(state = initialState.moneyTransfer, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_USER_MONEY_TRANSFER:
            return {
                ...state,
                ...{
                    isLoadingUser: true,
                    errorLoadUser: false,
                }
            };
        case types.LOAD_USER_MONEY_TRANSFER_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingUser: false,
                    errorLoadUser: false,
                    user: action.user
                }
            };
        case types.LOAD_USER_MONEY_TRANSFER_ERROR:
            return {
                ...state,
                ...{
                    isLoadingUser: false,
                    errorLoadUser: true,
                }
            };
        case types.BEGIN_LOAD_TRANSACTIONS_MONEY_TRANSFER:
            return {
                ...state,
                ...{
                    isLoadingTransactions: true,
                    errorLoadTransactions: false,
                }
            };
        case types.LOAD_TRANSACTIONS_MONEY_TRANSFER_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingTransactions: false,
                    errorLoadTransactions: false,
                    transactions: action.transactions,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_TRANSACTIONS_MONEY_TRANSFER_ERROR:
            return {
                ...state,
                ...{
                    isLoadingTransactions: false,
                    errorLoadTransactions: true,
                }
            };
        case types.BEGIN_CREATE_TRANSACTION_MONEY_TRANSFER:
            return {
                ...state,
                ...{
                    isCreatingTransaction: true,
                    errorCreatingTransaction: false,
                }
            };
        case types.CREATE_TRANSACTION_MONEY_TRANSFER_SUCCESS:
            return {
                ...state,
                ...{
                    isCreatingTransaction: false,
                    errorCreatingTransaction: false,
                    transactions: [action.transaction, ...state.transactions],
                    user: {
                        ...state.user,
                        status: 2
                    }
                }
            };
        case types.CREATE_TRANSACTION_MONEY_TRANSFER_ERROR:
            return {
                ...state,
                ...{
                    isCreatingTransaction: false,
                    errorCreatingTransaction: true,
                }
            };
        case types.BEGIN_CONFIRM_TRANSACTION_MONEY_TRANSFER:
            transactionsData = changeLoadingTransactions(state.transactions, action.transactionId, true);
            return {
                ...state,
                ...{
                    transactions: transactionsData
                }
            };
        case types.CONFIRM_TRANSACTION_MONEY_TRANSFER_SUCCESS:
            transactionsData = changeDataTransaction(state.transactions, action.transaction);
            return {
                ...state,
                ...{
                    transactions: transactionsData
                }
            };
        case types.CONFIRM_TRANSACTION_MONEY_TRANSFER_ERROR:
            transactionsData = changeLoadingTransactions(state.transactions, action.transactionId, false);
            return {
                ...state,
                ...{
                    transactions: transactionsData
                }
            };

        default:
            return state;
    }
}
