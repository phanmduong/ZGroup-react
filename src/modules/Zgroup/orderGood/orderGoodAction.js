import * as orderGoodApi from "./orderGoodApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import {browserHistory} from 'react-router';


export function loadAllOrderGood(page) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_ORDER_GOOD});
        orderGoodApi.loadAllOrderGood(page)
            .then((res) => {
               
                    dispatch({
                        type: types.LOAD_ALL_ORDER_GOOD_SUCCESS,
                        orderList : res.data.orders,
                        paginator: res.data.paginator,
                    });
               
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                dispatch({type: types.LOAD_ALL_ORDER_GOOD_ERROR});
                
            });
    };
}

export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOODS_ORDER_GOOD});
        orderGoodApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOODS_ORDER_GOOD_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOODS_ORDER_GOOD_ERROR});
                    browserHistory.push("/business/order-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOODS_ORDER_GOOD_ERROR});
                browserHistory.push("/business/order-good");
            });
    };
}


export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_ORDER_GOOD});
        orderGoodApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_ORDER_GOOD_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_ORDER_GOOD_ERROR});
                    browserHistory.push("/business/order-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_ORDER_GOOD_ERROR});
                browserHistory.push("/business/order-good");
            });
    };
}



export function createOrderGood(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_ORDER_GOOD});
        orderGoodApi.createOrderGood(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CREATE_ORDER_GOOD_SUCCESS,
                    });
                    helper.showNotification("Thêm thành công!");
                    browserHistory.push("/business/order-good");
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.CREATE_ORDER_GOOD_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.CREATE_ORDER_GOOD_ERROR});
            });
    };
}


export function editOrderGood(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_ORDER_GOOD});
        orderGoodApi.editOrderGood(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.EDIT_ORDER_GOOD_SUCCESS,
                    });
                    helper.showNotification("Sửa thành công!");
                    browserHistory.push("/business/order-good");
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.EDIT_ORDER_GOOD_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.EDIT_ORDER_GOOD_ERROR});
            });
    };
}

export function loadOrderGood(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ORDER_GOOD});
        orderGoodApi.loadOrderGood(id)
            .then((res) => {
               
                    dispatch({
                        type: types.LOAD_ORDER_GOOD_SUCCESS,
                    });
                    success(res.data.data.order);
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                dispatch({type: types.LOAD_ORDER_GOOD_ERROR});
                
            });
    };
}

export function confirmOrder(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CONFIRM_ORDER_GOOD});
        orderGoodApi.confirmOrder(id)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CONFIRM_ORDER_GOOD_SUCCESS,
                    });
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.CONFIRM_ORDER_GOOD_ERROR});
                }
            }).catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                dispatch({type: types.CONFIRM_ORDER_GOOD_ERROR});
                
            });
    };
}