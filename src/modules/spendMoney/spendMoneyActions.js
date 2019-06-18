import * as types from '../../constants/actionTypes';
import * as spendMoneyApi from './spendMoneyApi';
import {showNotification, showErrorMessage, sweetAlertSuccess} from "../../helpers/helper";

export function loadHistoryTransactions(page, type) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_HISTORY_TRANSACTION_SPEND_MONEY});
        spendMoneyApi.loadHistoryTransactions(page, type)
            .then(res => {
                dispatch({
                    type: types.LOAD_HISTORY_TRANSACTION_SPEND_MONEY_SUCCESS,
                    transactions: res.data.transactions,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_HISTORY_TRANSACTION_SPEND_MONEY_ERROR});
            });
    };
}

export function loadCategoryTransactions() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_CATEGORY_TRANSACTIONS_SPEND_MONEY});
        spendMoneyApi.getCategoryTransactions()
            .then(res => {
                dispatch({
                    type: types.LOAD_CATEGORY_TRANSACTIONS_SPEND_MONEY_SUCCESS,
                    categories: res.data.data.categories,
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_CATEGORY_TRANSACTIONS_SPEND_MONEY_ERROR});
            });
    };
}

export function createCategoryTransactions(data,callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_CATEGORY_TRANSACTION});
        spendMoneyApi.createCategoryTransactions(data)
            .then(() => {
                dispatch({
                    type: types.CREATE_CATEGORY_TRANSACTION_SUCCESS,
                });
                showNotification('Lưu thành công!');
            })
            .catch(() => {
                dispatch({type: types.CREATE_CATEGORY_TRANSACTION_ERROR});
                showErrorMessage('Có lỗi xảy ra!');
            }).finally(callback);
    };
}

export function getUser() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_USER_SPEND_MONEY});
        spendMoneyApi.loadUser()
            .then(res => {
                dispatch({
                    type: types.LOAD_USER_SPEND_MONEY_SUCCESS,
                    user: res.data.data.staff
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_USER_SPEND_MONEY_ERROR});
            });
    };
}

export function createSpendMoney(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_TRANSACTION_SPEND_MONEY});
        spendMoneyApi.createSpendMoney(data)
            .then(res => {
                if (res.data.status == 1) {
                    sweetAlertSuccess("Bạn vừa tạo giao dịch thành công.");
                    dispatch({
                        type: types.CREATE_TRANSACTION_SPEND_MONEY_SUCCESS,
                        transaction: res.data.data.transaction,
                        moneyStaff: res.data.data.money_staff,
                    });
                } else {
                    showErrorMessage("Tạo giao dịch thất bại", res.data.message);
                    dispatch({type: types.CREATE_TRANSACTION_SPEND_MONEY_ERROR});
                }

            })
            .catch(() => {
                showErrorMessage("Tạo giao dịch thất bại", "Có lỗi xảy ra. Thử lại");
                dispatch({type: types.CREATE_TRANSACTION_SPEND_MONEY_ERROR});
            });
    };
}