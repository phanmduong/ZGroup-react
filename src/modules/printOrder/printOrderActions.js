import * as printOrderApi from "./printOrderApi";
import * as helper from "../../helpers/helper";
import * as types from "../../constants/actionTypes";
import {browserHistory} from 'react-router';

export function loadPrintOrders(page,command_code, good_id, status) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_PRINT_ORDERS});
        printOrderApi.loadPrintOrders(page,command_code, good_id, status)
            .then((res) => {
                    dispatch({
                        type: types.LOAD_PRINT_ORDERS_SUCCESS,
                        listPrintOrder: res.data.printorders,
                        paginator: res.data.paginator,
                    });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_PRINT_ORDERS_ERROR});
            });
    };
}



export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOODS_PRINT_ORDER});
        printOrderApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOODS_PRINT_ORDER_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOODS_PRINT_ORDER_ERROR});
                    browserHistory.push("/business/print-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOODS_PRINT_ORDER_ERROR});
                browserHistory.push("/business/print-order");
            });
    };
}
export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_PRINT_ORDER});
        printOrderApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_PRINT_ORDER_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_PRINT_ORDER_ERROR});
                    browserHistory.push("/business/print-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_PRINT_ORDER_ERROR});
                browserHistory.push("/business/print-order");
            });
    };
}

export function createPrintOrder(data, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_PRINT_ORDER});
        printOrderApi.createPrintOrder(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CREATE_PRINT_ORDER_SUCCESS,
                    });
                    helper.showNotification("Thêm thành công.");
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.CREATE_PRINT_ORDER_ERROR});
                }
            });
    };
}
export function editPrintOrder(data, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_PRINT_ORDER});
        printOrderApi.editPrintOrder(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.EDIT_PRINT_ORDER_SUCCESS,
                    });
                    helper.showNotification("Lưu thành công.");
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.EDIT_PRINT_ORDER_ERROR});
                }
            });
    };
}

export function loadPrintOrderInfo(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_INFO_PRINT_ORDER});
        printOrderApi.loadPrintOrderInfo(id)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_INFO_PRINT_ORDER_SUCCESS,
                    });
                    success(res.data.data.printOrder);
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.LOAD_INFO_PRINT_ORDER_ERROR});
                }
            });
    };
}

export function confirmOrder(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CONFIRM_PRINT_ORDER});
        printOrderApi.confirmOrder(id)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CONFIRM_PRINT_ORDER_SUCCESS,
                    });
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.CONFIRM_PRINT_ORDER_ERROR});
                }
            });
    };
}
export function getAllCodes() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_CODES_PRINT_ORDER});
        printOrderApi.getAllCodes()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_CODES_PRINT_ORDER_SUCCESS,
                        codes: res.data.data.codes ,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.LOAD_CODES_PRINT_ORDER_ERROR});
                }
            });
    };
}


export function getAllproperties() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_PROPERTIES_PRINT_ORDER});
        printOrderApi.getAllproperties()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_PROPERTIES_PRINT_ORDER_SUCCESS,
                        properties: res.data.data.props ,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.LOAD_PROPERTIES_PRINT_ORDER_ERROR});
                }
            });
    };
}


export function editProperty(propId, data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_PROPERTIES_PRINT_ORDER});
        printOrderApi.editProperty(propId, data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.EDIT_PROPERTIES_PRINT_ORDER_SUCCESS,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.EDIT_PROPERTIES_PRINT_ORDER_ERROR});
                }
            });
    };
}