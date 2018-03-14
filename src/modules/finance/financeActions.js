import * as types from '../../constants/actionTypes';
import * as financeApi from "./financeApi";
import * as helper from "../../helpers/helper";

/*eslint no-console: 0 */

export const loadBankTransfers = (page = 1, search = "", status, bank_account_id) => {
    return async (dispatch) => {
        dispatch({
            type: types.BEGIN_LOAD_BANK_TRANSFERS
        });
        const res = await financeApi.loadBankTransfers(page, search, status, bank_account_id);
        dispatch({
            type: types.LOAD_BANK_TRANSFERS_SUCCESS,
            bankTransfers: res.data.transfers,
            totalPages: res.data.paginator.total_pages,
            currentPage: res.data.paginator.current_page,
            limit: res.data.paginator.limit,
            totalCount: res.data.paginator.total_count
        });
    };
};

export function loadCustomers(search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMERS_BANK_TRANSFER
        });
        if (search === "") {
            dispatch({
                type: types.LOAD_CUSTOMERS_BANK_TRANSFER_COMPLETE,
                customers: []
            });
        } else financeApi.loadCustomers(search)
            .then(res => {
                dispatch({
                    type: types.LOAD_CUSTOMERS_BANK_TRANSFER_COMPLETE,
                    customers: res.data.data.customers
                });
            });
    };
}

export const updateBankTransferStatus = (bankTransfer) => {
    return (dispatch) => {
        financeApi.updateBankTransfer(bankTransfer);
        dispatch({
            type: types.UPDATE_BANK_TRANSFER_STATUS,
            bankTransfer
        });
    };
};

export function updateTransferStatus(id, status, note, money) {
    return function (dispatch) {
        helper.showTypeNotification("Đang cập nhật trạng thái", "info");
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        financeApi.updateTransferStatus(id, status, note, money)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.UPDATE_STATUS_BANK_TRANSFER_SUCCESS,
                        status,
                        id
                    });
                    helper.showNotification("Cập nhật trạng thái thành công");
                } else {
                    helper.showErrorNotification(res.data.message);
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function showCancelReasonModal() {
    return ({
        type: types.TOGGLE_CANCEL_REASON_MODAL
    });
}

export function handleCancelReasonModal(transfer) {
    return ({
        type: types.HANDLE_CANCEL_REASON_MODAL,
        transfer
    });
}

export function editTransfer(bankTransfer) {
    return function (dispatch) {
        helper.showTypeNotification("Đang chỉnh sửa thông báo chuyển khoản", "info");
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        financeApi.editTransfer(bankTransfer)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.EDIT_BANK_TRANSFER_SUCCESS,
                        bankTransfer
                    });
                    helper.showNotification("Chỉnh sửa thông báo chuyển khoản thành công");
                } else {
                    helper.showErrorNotification(res.data.message);
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function showBankTransferEditModal() {
    return ({
        type: types.TOGGLE_BANK_TRANSFER_EDIT_MODAL
    });
}

export function handleBankTransferEditModal(transfer) {
    return ({
        type: types.HANDLE_BANK_TRANSFER_EDIT_MODAL,
        transfer
    });
}

export function showLoadMoneyToWalletModal() {
    return ({
        type: types.TOGGLE_LOAD_MONEY_TO_WALLET_MODAL
    });
}

export function handleLoadMoneyToWalletModal(transfer) {
    return ({
        type: types.HANDLE_LOAD_MONEY_TO_WALLET_MODAL,
        transfer
    });
}

export function loadMoneyToWallet(transfer) {
    return function (dispatch) {
        helper.showTypeNotification("Đang nạp tiền vào ví", "info");
        dispatch({
            type: types.BEGIN_LOAD_MONEY_TO_WALLET
        });
        financeApi.loadMoneyToWallet(transfer)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Nạp tiền vào ví thành công");
                } else {
                    helper.showErrorNotification(res.data.message);
                }
                dispatch({
                    type: types.LOAD_MONEY_TO_WALLET_COMPLETE
                });
            });
    };
}