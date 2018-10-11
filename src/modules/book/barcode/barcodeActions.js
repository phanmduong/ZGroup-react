/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from "../../../constants/actionTypes";
import * as barcodeApi from "./barcodeApi";
import {showWarningNotification} from '../../../helpers/helper';

/*eslint no-console: 0 */

export function showCreateBarcodeModal(barcode) {
    return function(dispatch) {
        dispatch({
            type: types.SHOW_CREATE_BARCODE_MODAL,
            barcode,
        });
    };
}

export function closeCreateBarcodeModal(data) {
    return function(dispatch) {
        dispatch({
            type: types.CLOSE_CREATE_BARCODE_MODAL,
            data,
        });
    };
}

export function createBarcode(barcode, reload) {
    return dispatch => {
        dispatch({
            type: types.BEGIN_CREATE_BARCODE,
        });
        barcodeApi.createBarcode(barcode).then(res => {
            if(res.data.status == 0){
                dispatch({type: types.CREATE_BARCODE_ERROR});   
                showWarningNotification(res.data.message) ;
            }else{
            reload();
                dispatch({
                type: types.CREATE_BARCODE_SUCCESS,
                barcode: res.data.data.barcode,
            });
            }
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

export function loadBarcodes(page = 1, type = "book", search) {
    return dispatch => {
        dispatch({
            type: types.BEGIN_LOAD_BARCODES,
        });
        barcodeApi.loadBarcodes(page, type, search).then(res => {
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
