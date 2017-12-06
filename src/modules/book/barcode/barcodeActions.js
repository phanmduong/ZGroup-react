/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../../constants/actionTypes';
import * as barcodeApi from './barcodeApi';

/*eslint no-console: 0 */

export function showCreateBarcodeModal(showModal) {
    return function (dispatch) {
        dispatch({
            type: types.SHOW_CREATE_BARCODE_MODAL,
            showModal
        });
    };
}

export function createBarcode() {
    return (dispatch) => {
        dispatch({
            type: types.BEGIN_CREATE_BARCODE
        });
        barcodeApi.createBarcode()
            .then((res) => {
                dispatch({
                    type: types.CREATE_BARCODE_SUCCESS,
                    barcode: res.data.data.barcode
                });
            });
    };
}


export function updateBarcodeFormData(barcode) {
    return (dispatch) => {
        dispatch({
            type: types.UPDATE_BARCODE_FORM_DATA,
            barcode
        });
    };
}
