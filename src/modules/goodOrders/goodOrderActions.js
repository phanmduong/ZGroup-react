import * as types from '../../constants/actionTypes';
import * as helper from '../../helpers/helper';
import * as goodOrdersApi from './goodOrdersApi';
import moment from 'moment';

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

export function changeStatusOrder(status, orderId) {
    return function (dispatch) {
        helper.showTypeNotification("Đang thay đổi trạng thái", "info");
        dispatch({type: types.BEGIN_CHANGE_STATUS_ORDER});
        goodOrdersApi.changeStatusOrder(status, orderId)
            .then((res) => {
                if (res.data.status === 0) {
                    helper.showErrorNotification(res.data.message.message);
                } else {
                    helper.showNotification("Thay đổi trạng thái thành công");
                    dispatch({
                        type: types.CHANGE_STATUS_ORDER_SUCCESS,
                        order_id: orderId,
                        status
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Thay đổi trạng thái xảy ra lỗi");
            });
    };
}

export function showShipGoodModal(isUpdate = false) {
    return ({
        type: types.TOGGLE_SHIP_GOOD_MODAL,
        isUpdate
    });
}

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

function sendShipOrderSuccess(res, dispatch, orderId) {
    const {data} = res;
    if (!data.success) {
        helper.showErrorMessage("Có lỗi xảy ra", data.message);
    } else {
        helper.showNotification("Gửi thành công");
        dispatch({
            type: types.SEND_SHIP_ORDER_COMPLETE,
            shippedGoodResponse: data,
            orderId,
            labelId: data.order.label
        });
    }
}

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

export function sendShipOrder(shippingGood, orderId, labelId) {
    shippingGood = {
        ...shippingGood,
        pick_date: moment().format("YYYY-MM-DD"),
        order: {
            ...shippingGood.order,
            id: shippingGood.order.id + ":" + moment().format("X")
        }
    };
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SEND_SHIP_ORDER
        });
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        if (labelId || labelId < 0) {
            goodOrdersApi.cancelShipOrder(labelId)
                .then(() => {
                    goodOrdersApi.sendShipOrder(shippingGood)
                        .then((res) => {
                            dispatch({
                                type: types.HIDE_GLOBAL_LOADING
                            });
                            dispatch(showShipGoodModal(false));
                            sendShipOrderSuccess(res, dispatch, orderId);
                        });
                });
        } else {
            goodOrdersApi.sendShipOrder(shippingGood)
                .then((res) => {
                    dispatch({
                        type: types.HIDE_GLOBAL_LOADING
                    });
                    dispatch(showShipGoodModal(false));
                    sendShipOrderSuccess(res, dispatch, orderId);
                });
        }
    };
}

export function updateOrderFormData(order) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_ORDER_FORM_DATA,
            order: order,
        });
    };
}

export function editOrder(order, orderId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_ORDER});
        goodOrdersApi.editOrderApi(order, orderId)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification('Đã chỉnh sửa thành công', 'success');
                    dispatch({
                        type: types.EDIT_ORDER_SUCCESS,
                        // customer: res.data.data.user,
                    });
                    // browserHistory.push('/goods/customer');
                }
                else {
                    helper.showErrorNotification(res.data.message.message);
                    dispatch({
                        type: types.EDIT_ORDER_ERROR,
                    });
                }
            })
            .catch(() => {
                    helper.showErrorNotification("Lỗi");
                    dispatch({
                        type: types.EDIT_ORDER_ERROR
                    });
                }
            );
    };
}
