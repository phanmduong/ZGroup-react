import * as types from '../../constants/actionTypes';
import * as importGoodsApi from './importGoodsApi';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';
import async from 'async';

export function loadImportOrders(page, search, startTime, endTime, status, staff) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_IMPORT_ORDERS});
        importGoodsApi.loadImportOrders(page, search, startTime, endTime, status, staff)
            .then((res) => {
                dispatch({
                    type: types.LOAD_IMPORT_ORDERS_SUCCESS,
                    importOrders: res.data.import_orders,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
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
                    supplier: res.data.data.import_order.user,
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

export function storeImportGood(formImportGood, status, importGoodsId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_IMPORT_GOOD
        });
        importGoodsApi.createImportGoods(formImportGood, status, importGoodsId)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Lưu thành công.");
                    browserHistory.push('/good/import-goods');
                    dispatch({
                        type: types.STORE_IMPORT_GOOD_SUCCESS
                    });
                } else {
                    helper.showNotification("Có lỗi xảy ra.");
                    dispatch({
                        type: types.STORE_IMPORT_GOOD_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({
                    type: types.STORE_IMPORT_GOOD_ERROR
                });
            });

    };
}

export function addPaidMoney(paidMoney, orderId, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_PAID_MONEY_IMPORT_GOODS
        });
        importGoodsApi.addPaidMoney(paidMoney, orderId)
            .then((res) => {
                if (res.data.status === 1) {
                    closeModal();
                    helper.showNotification("Thêm thanh toán thành công.");
                    dispatch({
                        type: types.ADD_PAID_MONEY_IMPORT_GOODS_SUCCESS,
                        orderPaidMoney: res.data.data.order_paid_money
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.ADD_PAID_MONEY_IMPORT_GOODS_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
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
            .catch(() => {
                dispatch({
                    type: types.GET_ALL_WAREHOUSES_IMPORT_GOODS_ERROR
                });
            });
    };
}

export function getHistoryPaid(orderId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_PAID_MONEY_IMPORT_ORDER
        });
        importGoodsApi.loadHistoryPaid(orderId)
            .then(res => {

                dispatch({
                    type: types.LOAD_HISTORY_PAID_MONEY_IMPORT_ORDER_SUCCESS,
                    historyPaidMoney: res.data.data.order_paid_money
                });
            })
            .catch({
                type: types.LOAD_HISTORY_PAID_MONEY_IMPORT_ORDER_ERROR
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
            .then(res => {
                dispatch({
                    type: types.CHECK_GOODS_IMPORT_GOODS_SUCCESS,
                    existsGoods: res.data.data.exists,
                    notExistsGoods: res.data.data.not_exists,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.CHECK_GOODS_IMPORT_GOODS_ERROR
                });
            });
    };
}

export function deleteImportOrder(importOrderId, page, search, startTime, endTime, status, staff) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_IMPORT_ORDERS});
        async.waterfall([
            function (callback) {
                importGoodsApi.deleteImportOrder(importOrderId)
                    .then(() => {
                        callback(null, "Xóa thành công");
                    }).catch(() => {
                    callback("Xóa thất bại");
                });
            },
            function (message, callback) {
                importGoodsApi.loadImportOrders(1);
                importGoodsApi.loadImportOrders(page, search, startTime, endTime, status, staff)
                    .then((res) => {
                        dispatch({
                            type: types.LOAD_IMPORT_ORDERS_SUCCESS,
                            importOrders: res.data.import_orders,
                            currentPage: res.data.paginator.current_page,
                            totalPages: res.data.paginator.total_pages
                        });
                        callback(null, "Tải thành công");
                    }).catch(() => {
                    dispatch({
                        type: types.LOAD_IMPORT_ORDERS_ERROR
                    });
                    callback("Có lỗi xảy ra");
                });
            }
        ], function (error) {
            if (error) {
                helper.showErrorNotification(error);
                dispatch({
                    type: types.LOAD_IMPORT_ORDERS_ERROR
                });
            }
        });
    };
}

