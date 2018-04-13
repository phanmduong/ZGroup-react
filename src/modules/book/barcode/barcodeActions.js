/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from "../../../constants/actionTypes";
import * as barcodeApi from "./barcodeApi";

/*eslint no-console: 0 */

export function showCreateBarcodeModal(showModal) {
    return function(dispatch) {
        dispatch({
            type: types.SHOW_CREATE_BARCODE_MODAL,
            showModal,
        });
    };
}

export function createBarcode(barcode) {
    return dispatch => {
        dispatch({
            type: types.BEGIN_CREATE_BARCODE,
        });
        barcodeApi.createBarcode(barcode).then(res => {
            dispatch({
                type: types.CREATE_BARCODE_SUCCESS,
                barcode: res.data.data.barcode,
            });
        });
    };
}

export function updateBarcodeFormData(barcode) {
    return dispatch => {
        dispatch({
            type: types.UPDATE_BARCODE_FORM_DATA,
            barcode,
        });
    };
}

export function loadBarcodes(type, page = 1) {
    return dispatch => {
        dispatch({
            type: types.BEGIN_LOAD_BARCODES,
        });
        barcodeApi.loadBarcodes(page).then(res => {
            dispatch({
                type: types.LOAD_BARCODES_SUCCESS,
                barcodes: res.data.barcodes,
                currentPage: res.data.paginator.current_page,
                totalPages: res.data.paginator.total_pages,
            });
        });
    };
}

export function deleteBarcode(barcodeId) {
    return dispatch => {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING,
        });
        return new Promise(resolve => {
            barcodeApi.deleteBarcode(barcodeId).then(() => {
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING,
                });
                resolve();
            });
        });
    };
}
