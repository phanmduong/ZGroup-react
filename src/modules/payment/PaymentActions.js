import * as types from '../../constants/actionTypes';
import * as PaymentApi from './PaymentApi';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';


export function loadPayments(page = 1, search = "") {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PAYMENTS,
        });
        PaymentApi.loadPayments(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_PAYMENTS_SUCCESS,
                    data: res.data.payment,
                    paginator: res.data.paginator,
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_PAYMENTS_ERROR,
            });
        });
    };

}

export function loadPayment(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PAYMENT,
        });
        PaymentApi.loadPayment(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_PAYMENT_SUCCESS,
                    data: res.data.data.payment,
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_PAYMENT_ERROR,
            });
        });
    };
}

export function loadCompanies() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_COMPANIES_PAYMENT,
        });
        PaymentApi.loadCompanies()
            .then((res) => {
                dispatch({
                    type: types.LOAD_COMPANIES_SUCCESS_PAYMENT,
                    data: res.data.data.company,

                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_COMPANIES_ERROR_PAYMENT,
            });
        });
    };
}

export function addPayment(object) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_PAYMENT,
        });
        PaymentApi.createPayment(object)
            .then(() => {
                helper.showNotification('Tạo thành công');
                dispatch({
                    type: types.ADD_PAYMENT_SUCCESS,
                });
                browserHistory.push("/business/company/payments");
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.ADD_PAYMENT_ERROR,
            });
        });
    };
}

export function editPayment(id,object){
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_PAYMENT,
        });
        PaymentApi.editPayment(id,object)
            .then(() => {
                helper.showNotification('Sửa thành công');
                dispatch({
                    type: types.EDIT_PAYMENT_SUCCESS,
                });
                browserHistory.push("/business/company/payments");
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.EDIT_PAYMENT_ERROR,
            });
        });
    };
}

export function uploadImage(file,pp){
    return function (dispatch) {
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            helper.showNotification("Tải lên ảnh thành công");
            const data = JSON.parse(event.currentTarget.responseText);
            dispatch({
                type: types.UPLOAD_IMAGE_PAYMENT_SUCCESS,
                data: data.link,
                pp: pp,
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_IMAGE_PROGRESS_PAYMENT,
                percent: percentComplete
            });
        };
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_PAYMENT,
        });
        PaymentApi.uploadImage(file,
            completeHandler, progressHandler, error);
    };
}

export function updateFormData(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_CREATE_PAYMENT,
            data : data,
        });
    };
}
export function resetDataPayment(){
    return function (dispatch){
        dispatch({
            type: types.RESET_DATA_PAYMENT,
        });
    };
}