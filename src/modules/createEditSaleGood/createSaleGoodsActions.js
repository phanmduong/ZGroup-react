import * as types from '../../constants/actionTypes';
import * as createSaleGoodApis from './createSaleGoodApis';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';



export function updateCustomerFormData(customer) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_CUSTOMER_IN_SALE_GOODS,
            customer: customer,
        });
    };
}

export function updateInfoOrderFormData(infoOrder) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_INFO_ORDER_IN_SALE_GOODS,
            infoOrder: infoOrder,
        });
    };
}

export function updateTmpQuantity(goodsShowInTable) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_TMP_QUANTITY_IN_SALE_GOODS,
            goodsShowInTable: goodsShowInTable,
        });
    };
}

export function changeWarehouse(id) {

    return function (dispatch) {
        dispatch({
            type: types.CHANGE_WAREHOUSE_IN_SALE_GOOD,
            id: id,
        });
    };
}


export function loadGoodsInModal(page, limit, query, warehouse) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOOD_IN_MODAL_IN_CREATE_SALE_GOOD,
        });
        createSaleGoodApis.loadGoodsInModalApi(limit, page, query, warehouse)
            .then((res) => {
                dispatch({
                    type: types.LOADED_GOOD_SUCCESS_IN_MODAL_IN_CREATE_SALE_GOOD,
                    goodsList: res.data.inventories,
                    total_pages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_GOOD_ERROR_IN_MODAL_IN_CREATE_SALE_GOOD,
                });
            });
    };
}

export function assignGoodFormData(good) {
    return function (dispatch) {
        dispatch({
            type: types.ASSIGN_GOOD_FORM_DATA_IN_CREATE_SALE_GOOD,
            good: good,
        });
    };
}

export function removeGood(good) {
    return function (dispatch) {
        dispatch({
            type: types.REMOVE_GOOD_FORM_DATA_IN_CREATE_SALE_GOOD,
            good,
        });
    };
}

export function createSaleGood(createSaleGood) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_SALE_GOOD,
        });
        createSaleGoodApis.createSaleGoodApi(createSaleGood)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.CREATE_SALE_GOOD_SUCCESS,
                    });
                    helper.showTypeNotification('Đã thêm đơn hàng' , 'success');
                    browserHistory.push("/good/goods/orders");
                }
                else {dispatch({
                    type: types.CREATE_SALE_GOOD_ERROR,
                });
                helper.showErrorNotification('Lỗi');}
            })
            .catch(() => {
                dispatch({
                    type: types.CREATE_SALE_GOOD_ERROR,
                });
            });
    };
}
export function loadCustomers() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMERS_SALE_GOOD,
        });
        createSaleGoodApis.loadCustomersApi()
            .then((res) => {
                    dispatch({
                        type: types.LOADED_CUSTOMERS_SALE_GOOD_SUCCESS,
                        customers : res.data.customers,
                    });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_CUSTOMERS_SALE_GOOD_ERROR,
                });
            });
    };
}