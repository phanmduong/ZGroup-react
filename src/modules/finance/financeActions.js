import * as types from '../../constants/actionTypes';
import * as financeApi from "./financeApi";
import * as helper from "../../helpers/helper";

/*eslint no-console: 0 */

export const loadBankTransfers = (page = 1, search = "") => {
    return async (dispatch) => {
        dispatch({
            type: types.BEGIN_LOAD_BANK_TRANSFERS
        });
        const res = await financeApi.loadBankTransfers(page, search);
        dispatch({
            type: types.LOAD_BANK_TRANSFERS_SUCCESS,
            bankTransfers: res.data.transfers
        });
    };
};

export const updateBankTransferStatus = (bankTransfer) => {
    return (dispatch) => {
        financeApi.updateBankTransfer(bankTransfer);
        dispatch({
            type: types.UPDATE_BANK_TRANSFER_STATUS,
            bankTransfer
        });
    };
};

export function updateTransferStatus(id, status, note) {
    return function (dispatch) {
        helper.showTypeNotification("Đang cập nhật trạng thái", "info");
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        financeApi.updateTransferStatus(id, status, note)
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