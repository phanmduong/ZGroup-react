import * as exportOrderApi from "./exportOrderApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import {browserHistory} from 'react-router';


export function loadExportOrders(filter) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_EXPORT_ORDERS});
        exportOrderApi.loadExportOrders(filter)
            .then((res) => {
                dispatch({
                    type: types.LOAD_EXPORT_ORDERS_SUCCESS,
                    listExportOrder: res.data.exportorders,
                    paginator: res.data.paginator,
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_EXPORT_ORDERS_ERROR});
            });
    };
}
export function loadExportOrdersNoPaging(success) {
    return function () {
        
        exportOrderApi.loadExportOrdersNoPaging()
            .then((res) => {
                success(res.data.data.exportorders);
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                success(null);
            });
    };
}


export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOODS_EXPORT_ORDER});
        exportOrderApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOODS_EXPORT_ORDER_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOODS_EXPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOODS_EXPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}
export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_EXPORT_ORDER});
        exportOrderApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_EXPORT_ORDER_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_EXPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_EXPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}
export function loadAllWarehourses() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_WAREHOUSES_EXPORT_ORDER});
        exportOrderApi.loadAllWarehourses()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_SUCCESS,
                        warehouses : res.data.data.warehouses,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}


export function createExportOrder(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_EXPORT_ORDER});
        exportOrderApi.createExportOrder(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CREATE_EXPORT_ORDER_SUCCESS,
                    });
                    helper.showNotification("Thêm thành công.");
                    browserHistory.push("/business/export-order");
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.CREATE_EXPORT_ORDER_ERROR});
                }
            }).catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.CREATE_EXPORT_ORDER_ERROR});
            });
    };
}

export function loadExportOrder(id, callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_INFO_EXPORT_ORDER});
        exportOrderApi.loadExportOrder(id)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_INFO_EXPORT_ORDER_SUCCESS,
                    });
                    callback(res.data.data.exportOrder);
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.LOAD_INFO_EXPORT_ORDER_ERROR});
                }
            });
    };
}

export function editExportOrder(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_EXPORT_ORDER});
        exportOrderApi.editExportOrder(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.EDIT_EXPORT_ORDER_SUCCESS,
                    });
                    helper.showNotification("Thêm thành công.");
                    browserHistory.push("/business/export-order");
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.EDIT_EXPORT_ORDER_ERROR});
                }
            });
    };
}


export function confirmOrder(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CONFIRM_EXPORT_ORDER});
        exportOrderApi.confirmOrder(id)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CONFIRM_EXPORT_ORDER_SUCCESS,
                    });
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.CONFIRM_EXPORT_ORDER_ERROR});
                }
            }).catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                dispatch({type: types.CONFIRM_EXPORT_ORDER_ERROR});
                
            });
    };
}


export function loadAllOrderedGood() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_ORDERED_GOOD_EXPORT_ORDER});
        exportOrderApi.loadAllOrderedGood()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_ORDERED_GOOD_EXPORT_ORDER_SUCCESS,
                        orderedGoods : res.data.data.orders,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra. status=0");
                    dispatch({type: types.LOAD_ALL_ORDERED_GOOD_EXPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_ORDERED_GOOD_EXPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}