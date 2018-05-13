import * as orderedGoodApi from "./orderedGoodApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import {browserHistory} from 'react-router';
//import {browserHistory} from 'react-router';

export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOODS_ORDERED_GOOD});
        orderedGoodApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOODS_ORDERED_GOOD_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOODS_ORDERED_GOOD_ERROR});
                    browserHistory.push("/business/ordered-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOODS_ORDERED_GOOD_ERROR});
                browserHistory.push("/business/ordered-good");
            });
    };
}


export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_ORDERED_GOOD});
        orderedGoodApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_ORDERED_GOOD_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_ORDERED_GOOD_ERROR});
                    browserHistory.push("/business/ordered-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_ORDERED_GOOD_ERROR});
                browserHistory.push("/business/ordered-good");
            });
    };
}

export function createOrderedGood(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_ORDERED_GOOD});
        orderedGoodApi.createOrderedGood(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CREATE_ORDERED_GOOD_SUCCESS,
                    });
                    helper.showNotification("Thêm thành công!");
                    browserHistory.push("/business/ordered-good");
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.CREATE_ORDERED_GOOD_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.CREATE_ORDERED_GOOD_ERROR});
            });
    };
}

export function editOrderedGood(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_ORDERED_GOOD});
        orderedGoodApi.editOrderedGood(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.EDIT_ORDERED_GOOD_SUCCESS,
                    });
                    helper.showNotification("Sửa thành công!");
                    browserHistory.push("/business/ordered-good");
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.EDIT_ORDERED_GOOD_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.EDIT_ORDERED_GOOD_ERROR});
            });
    };
}

export function loadAllOrderedGood(page,companyId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_ORDERED_GOOD});
        orderedGoodApi.loadAllOrderedGood(page,companyId)
            .then((res) => {
               
                    dispatch({
                        type: types.LOAD_ALL_ORDERED_GOOD_SUCCESS,
                        orderedList : res.data.orders,
                        paginator: res.data.paginator,
                    });
               
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                dispatch({type: types.LOAD_ALL_ORDERED_GOOD_ERROR});
                
            });
    };
}
export function loadAllOrderedGoodNoPaging(success) {
    return function (dispatch) {
        
        orderedGoodApi.loadAllOrderedGoodNoPaging(success)
            .then((res) => {
                    success(res.data.data.orders);
               
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                success(null);
            });
    };
}

export function loadOrderedGood(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ORDERED_GOOD});
        orderedGoodApi.loadOrderedGood(id)
            .then((res) => {
               
                    dispatch({
                        type: types.LOAD_ORDERED_GOOD_SUCCESS,
                    });
                    success(res.data.data.order);
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                dispatch({type: types.LOAD_ORDERED_GOOD_ERROR});
                
            });
    };
}

export function confirmOrder(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CONFIRM_ORDERED_GOOD});
        orderedGoodApi.confirmOrder(id)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CONFIRM_ORDERED_GOOD_SUCCESS,
                    });
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.CONFIRM_ORDERED_GOOD_ERROR});
                }
            }).catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                dispatch({type: types.CONFIRM_ORDERED_GOOD_ERROR});
                
            });
    };
}