import * as importOrderApi from "./importOrderApi";
import * as helper from "../../helpers/helper";
import * as types from "../../constants/actionTypes";
import {browserHistory} from 'react-router';

export function loadOrder(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ORDER_IMPORT_ORDER,
        });
        importOrderApi.loadOrder(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ORDER_IMPORT_ORDER_SUCCESS,
                    data: res.data.order,
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_ORDER_IMPORT_ORDER_ERROR,
            });
        });
    };
}

export function loadImportOrder(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_IMPORT_ORDER,
        });
        importOrderApi.loadImportOrder(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_IMPORT_ORDER_SUCCESS,
                    data: res.data["import-order"],
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_IMPORT_ORDER_ERROR,
            });
        });
    };
}

export function createImportOrder(data) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_IMPORT_ORDER,
        });
        importOrderApi.createImportOrder(data)
            .then(() => {
                browserHistory.push("/business/import-order/item");
                dispatch({
                    type: types.CREATE_IMPORT_ORDER_SUCCESS,
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.CREATE_IMPORT_ORDER_ERROR,
            });
        });
    };
}

export function editImportOrder(data) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_IMPORT_ORDER,
        });
        importOrderApi.createImportOrder(data)
            .then(() => {
                browserHistory.push("/business/import-order/item");
                dispatch({
                    type: types.EDIT_IMPORT_ORDER_SUCCESS,
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.EDIT_IMPORT_ORDER_ERROR,
            });
        });
    };
}

export function loadAllImportOrder(page){
    return function(dispatch){
        dispatch({
           type: types.BEGIN_LOAD_ALL_IMPORT_ORDER,
        });
        importOrderApi.loadAllImportOrder(page)
            .then((res) => {
                dispatch({
                   type: types.LOAD_ALL_IMPORT_ORDER_SUCCESS,
                   data: res.data["import-orders"],
                   paginator: res.data.paginator,
                });
            }).catch(() => {
                dispatch({
                    type: types.LOAD_ALL_IMPORT_ORDER_ERROR,
                });
        });
    };
}

export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOOD_IMPORT_ORDER});
        importOrderApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOOD_IMPORT_ORDER_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOOD_IMPORT_ORDER_ERROR});
                    browserHistory.push("/business/import-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOOD_IMPORT_ORDER_ERROR});
                browserHistory.push("/business/import-order");
            });
    };
}
export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_IMPORT_ORDER});
        importOrderApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_IMPORT_ORDER_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_IMPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_IMPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}

export function loadAllWarehourses() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_WAREHOUSE_IMPORT_ORDER});
        importOrderApi.loadAllWarehourses()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_WAREHOUSE_IMPORT_ORDER_SUCCESS,
                        warehouses : res.data.data.warehouses,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_WAREHOUSE_IMPORT_ORDER_ERROR});
                    browserHistory.push("/business/export-order");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_WAREHOUSE_IMPORT_ORDER_ERROR});
                browserHistory.push("/business/export-order");
            });
    };
}

