import * as types from '../../constants/actionTypes';
import * as bankAccountApi from './bankAccountApi';
import * as helper from '../../helpers/helper';

export function loadAllBankAccounts() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BANK_ACCOUNTS
        });
        bankAccountApi.loadAllBankAccountsApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BANK_ACCOUNTS_SUCCESS,
                    accounts: res.data.data.bank_accounts
                });
            });
    };
}

export function showAddEditBankAccountModal() {
    return ({
        type: types.TOGGLE_ADD_EDIT_BANK_ACCOUNTS_MODAL
    });
}

export function handleBankAccount(bankAccount) {
    return ({
        type: types.HANDLE_BANK_ACCOUNTS,
        bankAccount
    });
}


export function saveBankAccount(bankAccount) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_BANK_ACCOUNTS
        });
        bankAccountApi.saveBankAccountApi(bankAccount)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Thêm tài khoản ngân hàng thành công");
                    dispatch({
                        type: types.SAVE_BANK_ACCOUNTS_SUCCESS,
                        bankAccount
                    });
                } else {
                    helper.showNotification(res.data.message);
                    dispatch({
                        type: types.ADD_BANK_ACCOUNT_ERROR,
                    });
                }
            });
    };
}

export function editBankAccount(bankAccount) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_BANK_ACCOUNTS
        });
        bankAccountApi.editBankAccountApi(bankAccount)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Chỉnh sửa tài khoản ngân  thành công");
                    dispatch({
                        type: types.EDIT_BANK_ACCOUNTS_SUCCESS,
                        bankAccount
                    });
                } else {
                    helper.showNotification(res.data.message);
                    dispatch({
                        type: types.ADD_BANK_ACCOUNT_ERROR,
                    });
                }
            });
    };
}
