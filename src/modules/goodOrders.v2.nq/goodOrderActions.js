import * as types from '../../constants/actionTypes';
import * as helper from '../../helpers/helper';
import * as goodOrdersApi from '../goodOrders/goodOrdersApi';
//import moment from 'moment';
import {browserHistory} from "react-router";

export function loadAllOrders(page = 1, search, startTime, endTime, staff, status) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_GOOD_ORDERS});
        const infoPromise = new Promise((resolve) => {
            goodOrdersApi.loadOrderInfo(page, search, startTime, endTime, staff, status)
                .then(res => resolve(res));
        });
        const orderPromise = new Promise((resolve) => {
            goodOrdersApi.loadAllOrders(page, search, startTime, endTime, staff, status)
                .then(res => resolve(res));
        });
        Promise.all([infoPromise, orderPromise]).then(data => {
            const infoRes = data[0];
            const orderRes = data[1];
            dispatch({
                type: types.LOAD_GOOD_ORDERS_SUCCESS,
                totalOrder: infoRes.data.data.total_orders,
                totalMoney: infoRes.data.data.total_money,
                totalPaidMoney: infoRes.data.data.total_paid_money,
                orders: orderRes.data.orders,
                currentPage: orderRes.data.paginator.current_page,
                totalPages: orderRes.data.paginator.total_pages,
                limit: orderRes.data.paginator.limit,
                totalCount: orderRes.data.paginator.total_count
            });
        });
    };
}

export function loadDetailOrder(orderId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_DETAIL_ORDER});
        goodOrdersApi.loadDetailOrder(orderId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_DETAIL_ORDER_SUCCESS,
                    total: res.data.data.total,
                    paid: res.data.data.paid,
                    debt: res.data.data.debt,
                    order: res.data.data.order,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_DETAIL_ORDER_ERROR
            });
        });
    };
}

export function loadStaffs() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_STAFFS_ORDERS});
        goodOrdersApi.loadStaffs()
            .then((res) => {
                dispatch({
                    type: types.LOAD_STAFFS_ORDERS_SUCCESS,
                    staffs: res.data.data.staffs
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_STAFFS_ORDERS_ERROR
            });
        });
    };
}


export function getAllStaffs() {
    return function (dispatch) {
        goodOrdersApi.getAllStaffs()
            .then((response) => {
                dispatch({
                    type: types.GET_ALL_STAFFS_COMPLETE_GOOD_ORDER,
                    allStaffs: response.data.data.staffs
                });
            });
    };
}

export function loadWareHouse(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_WAREHOUSES_GOOD_ORDER
        });
        goodOrdersApi.loadWareHouseApi(page, search)
            .then(res => {
                dispatch({
                    type: types.GET_WAREHOUSES_GOOD_ORDER,
                    warehousesList: res.data.warehouses,
                    totalCountWarehouse: res.data.paginator.total_count,
                    totalPagesWarehouse: res.data.paginator.total_pages,
                    currentPageWarehouse: res.data.paginator.current_page
                });
            });
    };
}

export function showSelectWarehouseModal(nextStatus, orderIdWarehouseModal) {
    return ({
        type: types.TOGGLE_SELECT_WAREHOUSE_MODAL,
        nextStatus,
        orderIdWarehouseModal
    });
}

export function changeStatusOrder(status, orderId, warehouse_id) {
    return function (dispatch) {
        helper.showTypeNotification("Đang thay đổi trạng thái", "info");
        goodOrdersApi.changeStatusOrder(status, orderId, warehouse_id)
            .then((res) => {
                if (res.data.status === 0) {
                    helper.showErrorNotification(res.data.message.message);
                } else {
                    helper.showNotification("Thay đổi trạng thái thành công");
                    dispatch({
                        type: types.CHANGE_STATUS_ORDER_SUCCESS,
                        status,
                        order_id: orderId
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Thay đổi trạng thái xảy ra lỗi");
            });
    };
}

// export function showShipGoodModal(isUpdate = false) {
//     return ({
//         type: types.TOGGLE_SHIP_GOOD_MODAL,
//         isUpdate
//     });
// }

export function showAddNoteModal() {
    return ({
        type: types.TOGGLE_ADD_NOTE_MODAL
    });
}

export function handleAddNoteModal(order) {
    return ({
        type: types.HANDLE_ADD_NOTE_MODAL,
        order
    });
}

export function handleShipOrderBegin(order) {
    return ({
        type: types.HANDLE_SHIP_ORDER_BEGIN,
        order
    });
}

export function handleShipOrder(order) {
    return ({
        type: types.HANDLE_SHIP_ORDER,
        order
    });
}

// function sendShipOrderSuccess(res, dispatch, orderId) {
//     const {data} = res;
//     if (!data.success) {
//         helper.showErrorMessage("Có lỗi xảy ra", data.message);
//     } else {
//         helper.showNotification("Gửi thành công");
//         dispatch({
//             type: types.SEND_SHIP_ORDER_COMPLETE,
//             shippedGoodResponse: data,
//             orderId,
//             labelId: data.order.label
//         });
//     }
// }

export function editNote(order) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_NOTE_GOOD_ORDER
        });
        helper.showTypeNotification("Đang chỉnh sửa ghi chú", "info");
        goodOrdersApi.editNote(order)
            .then(() => {
                dispatch({
                    type: types.EDIT_NOTE_SUCCESS_GOOD_ORDER,
                    order
                });
                helper.showNotification("Thay đổi ghi chú thành công");
            });
    };
}
//
// export function sendShipOrder(shippingGood, orderId, labelId) {
//     shippingGood = {
//         ...shippingGood,
//         pick_date: moment().format("YYYY-MM-DD"),
//         order: {
//             ...shippingGood.order,
//             id: shippingGood.order.id + ":" + moment().format("X")
//         }
//     };
//     return function (dispatch) {
//         dispatch({
//             type: types.BEGIN_SEND_SHIP_ORDER
//         });
//         dispatch({
//             type: types.DISPLAY_GLOBAL_LOADING
//         });
//         if (labelId || labelId < 0) {
//             goodOrdersApi.cancelShipOrder(labelId)
//                 .then(() => {
//                     goodOrdersApi.sendShipOrder(shippingGood)
//                         .then((res) => {
//                             dispatch({
//                                 type: types.HIDE_GLOBAL_LOADING
//                             });
//                             dispatch(showShipGoodModal(false));
//                             sendShipOrderSuccess(res, dispatch, orderId);
//                         });
//                 });
//         } else {
//             goodOrdersApi.sendShipOrder(shippingGood)
//                 .then((res) => {
//                     dispatch({
//                         type: types.HIDE_GLOBAL_LOADING
//                     });
//                     dispatch(showShipGoodModal(false));
//                     sendShipOrderSuccess(res, dispatch, orderId);
//                 });
//         }
//     };
// }

export function updateOrderFormData(order) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_ORDER_FORM_DATA,
            order: order,
        });
    };
}

export function editOrder(order, orderId, isQuantity, index) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_ORDER, index: index, isQuantity});
        goodOrdersApi.editOrderApi(order, orderId)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification('Đã chỉnh sửa thành công', 'success');
                    dispatch({
                        type: types.EDIT_ORDER_SUCCESS,
                        index: index,
                        isQuantity
                    });
                    if (!isQuantity) {
                        browserHistory.push("/good/goods/orders");
                    }
                }
                else {
                    helper.showErrorNotification(res.data.message.message);
                    dispatch({
                        type: types.EDIT_ORDER_ERROR,
                        index: index,
                        isQuantity
                    });
                }
            })
            .catch(() => {
                    helper.showErrorNotification("Lỗi");
                    dispatch({
                        type: types.EDIT_ORDER_ERROR,
                        index: index,
                        isQuantity
                    });
                }
            );
    };
}


export function editReturnOrders(order, orderId, isQuantity, index) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_RETURN_ORDER, isQuantity, index});
        goodOrdersApi.editReturnOrdersApi(order, orderId)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.EDIT_RETURN_ORDER_SUCCESS,
                        isQuantity, index
                    });
                    helper.showTypeNotification('Đã chỉnh sửa đơn trả hàng', 'success');
                }
                else {
                    dispatch({
                        type: types.EDIT_RETURN_ORDER_ERROR,
                        isQuantity, index
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: types.EDIT_RETURN_ORDER_ERROR,
                    isQuantity, index
                });
            });
    };
}


export function openReturnOrder(isOpenReturnOrder) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_RETURN_ORDER_IN_ORDER,
            isOpenReturnOrder: isOpenReturnOrder
        });
    };
}

export function changeWarehouse(id) {

    return function (dispatch) {
        dispatch({
            type: types.CHANGE_WAREHOUSE_RETURN_ORDERS,
            id: id,
        });
    };
}

export function resetReturnOrders() {
    return function (dispatch) {
        dispatch({
            type: types.RESET_RETURN_ORDERS,
        });
    };
}

export function loadGoodsInOverlay(page, limit, query, good_orders) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOODS_IN_OVERLAY_IN_ORDER,
        });
        goodOrdersApi.loadGoodsApi(page, limit, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_GOODS_SUCCESS_IN_OVERLAY_IN_ORDER,
                    goods: res.data.goods,
                    total_pages: res.data.paginator.total_pages,
                    good_orders: good_orders,
                });
            })

            .catch(dispatch({
                type: types.LOADED_GOODS_ERROR_IN_OVERLAY_IN_ORDER
            }));
    };
}

export function assignGoodFormData(good) {
    return function (dispatch) {
        dispatch({
            type: types.ASSIGN_GOOD_FORM_DATA_IN_ORDER,
            good,
        });
    };
}



