import {
    BEGIN_LOAD_BANK_TRANSFERS, LOAD_BANK_TRANSFERS_SUCCESS,
    UPDATE_BANK_TRANSFER_STATUS
} from "../../constants/actionTypes";
import * as financeApi from "./financeApi";

/*eslint no-console: 0 */

export const loadBankTransfers = (page = 1, search = "") => {
    return async (dispatch) => {
        dispatch({
            type: BEGIN_LOAD_BANK_TRANSFERS
        });
        const res = await financeApi.loadBankTransfers(page, search);
        dispatch({
            type: LOAD_BANK_TRANSFERS_SUCCESS,
            bankTransfers: res.data.bank_transfers
        });
    };
};

export const updateBankTransferStatus = (bankTransfer) => {
    return (dispatch) => {
        financeApi.updateBankTransfer(bankTransfer);
        dispatch({
            type: UPDATE_BANK_TRANSFER_STATUS,
            bankTransfer
        });
    };
};