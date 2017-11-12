import * as types from '../../constants/actionTypes';
import * as importGoodsApi from './importGoodsApi';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';


export function loadImportOrders(startTime, endTime) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_IMPORT_ORDERS});
        importGoodsApi.loadImportOrders(startTime, endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_IMPORT_ORDERS_SUCCESS,
                    importOrders: res.data.data.import_orders,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_IMPORT_ORDERS_ERROR
            });
        });
    };
}

export function loadImportGoodsOrder(orderId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_IMPORT_GOOD_ORDERS});
        importGoodsApi.loadImportGoodsOrder(orderId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_IMPORT_GOOD_ORDERS_SUCCESS,
                    importOrder: res.data.data.import_order,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_IMPORT_GOOD_ORDERS_ERROR
            });
        });
    };
}

export function initDataImport() {
    return ({
        type: types.INIT_DATA_IMPORT_GOOD_ORDERS
    });

}

export function updateFormImportGood(formImportGood) {
    return ({
        type: types.UPDATE_FORM_IMPORT_GOOD,
        formImportGood
    });
}

export function storeImportGood(formImportGood) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_IMPORT_GOOD
        });
        importGoodsApi.createImportGoods(formImportGood)
            .then((res) => {
                if (res.data.status === 1) {
                    browserHistory.push('/import-goods');
                    dispatch({
                        type: types.STORE_IMPORT_GOOD_SUCCESS
                    });
                } else {
                    dispatch({
                        type: types.STORE_IMPORT_GOOD_ERROR
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: types.STORE_IMPORT_GOOD_ERROR
                });
            });

    };
}

export function getAllWarehouses() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_GET_ALL_WAREHOUSES_IMPORT_GOODS
        });
        importGoodsApi.allWarehouses()
            .then(res => {

                dispatch({
                    type: types.GET_ALL_WAREHOUSES_IMPORT_GOODS_SUCCESS,
                    warehouses: res.data.data.warehouses
                });
            })
            .catch({
                type: types.GET_ALL_WAREHOUSES_IMPORT_GOODS_ERROR
            });
    };
}

export function storeSupplier(supplier, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_SUPPLIER_IMPORT_GOOD
        });
        importGoodsApi.storeSupplier(supplier)
            .then(res => {
                if (res.data.status === 1) {
                    closeModal();
                    let supplier = res.data.data.supplier;
                    dispatch({
                        type: types.STORE_SUPPLIER_IMPORT_GOOD_SUCCESS,
                        supplier: {
                            ...supplier,
                            ...{
                                label: `${supplier.name} (${supplier.phone})`,
                                value: supplier.id
                            }
                        }
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.STORE_SUPPLIER_IMPORT_GOOD_ERROR
                    });
                }
            })
            .catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.STORE_SUPPLIER_IMPORT_GOOD_ERROR
                });
            });
    };
}

export function beginCheckGoods() {
    return {
        type: types.BEGIN_CHECK_GOODS_IMPORT_GOODS
    };
}

export function checkGoods(goods) {
    return function (dispatch) {
        importGoodsApi.checkGoods(goods)
            .then(res=>{
                dispatch({
                    type: types.CHECK_GOODS_IMPORT_GOODS_SUCCESS,
                    existsGoods: res.data.data.exists,
                    notExistsGoods: res.data.data.not_exists,
                });
            })
            .catch(()=>{
                dispatch({
                    type: types.CHECK_GOODS_IMPORT_GOODS_ERROR
                });
            });
    };
}
