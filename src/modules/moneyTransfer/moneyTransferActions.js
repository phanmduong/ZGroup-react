import * as types from '../../constants/actionTypes';
import * as moneyTransferApi from './moneyTransferApi';
import {showErrorMessage} from "../../helpers/helper";

/*eslint no-console: 0 */
export function getUser() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_USER_MONEY_TRANSFER});
        moneyTransferApi.loadUser()
            .then(res => {
                dispatch({
                    type: types.LOAD_USER_MONEY_TRANSFER_SUCCESS,
                    user: res.data.data.user
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_USER_MONEY_TRANSFER_ERROR});
            });
    };
}

export function getTransactions(page, type, status) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_TRANSACTIONS_MONEY_TRANSFER});
        moneyTransferApi.getTransactions(page, type, status)
            .then(res => {
                dispatch({
                    type: types.LOAD_TRANSACTIONS_MONEY_TRANSFER_SUCCESS,
                    transactions: res.data.transactions,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_TRANSACTIONS_MONEY_TRANSFER_ERROR});
            });
    };
}

export function createTransaction(receiverId, money) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_TRANSACTION_MONEY_TRANSFER});
        moneyTransferApi.createTransaction(receiverId, money)
            .then(res => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.CREATE_TRANSACTION_MONEY_TRANSFER_SUCCESS,
                        transaction: res.data.data.transaction,
                    });
                } else {
                    showErrorMessage("Chuyển tiền thất bại", res.data.message);
                    dispatch({type: types.CREATE_TRANSACTION_MONEY_TRANSFER_ERROR});
                }
            })
            .catch(() => {
                showErrorMessage("Chuyển tiền thất bại", "Có lỗi xảy ra, thử lại");
                dispatch({type: types.CREATE_TRANSACTION_MONEY_TRANSFER_ERROR});
            });
    };
}

export function confirmTransaction(transactionId, status) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CONFIRM_TRANSACTION_MONEY_TRANSFER, transactionId});
        moneyTransferApi.confirmTransaction(transactionId, status)
            .then(res => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.CONFIRM_TRANSACTION_MONEY_TRANSFER_SUCCESS,
                        transaction: res.data.data.transaction,
                    });
                } else {
                    showErrorMessage("Xác nhận chuyển tiền thất bại", res.data.message);
                    dispatch({type: types.CONFIRM_TRANSACTION_MONEY_TRANSFER_ERROR, transactionId});
                }
            })
            .catch(() => {
                showErrorMessage("Xác nhận chuyển tiền thất bại", "Có lỗi xảy ra, thử lại");
                dispatch({type: types.CONFIRM_TRANSACTION_MONEY_TRANSFER_ERROR, transactionId});
            });
    };
}