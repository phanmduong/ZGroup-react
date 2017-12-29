import * as types from '../../constants/actionTypes';
import * as helper from '../../helpers/helper';
import * as goodOrdersApi from './goodOrdersApi';
import moment from 'moment';
import {showErrorMessage} from "../../helpers/helper";
import {showNotification} from "../../helpers/helper";
import {showErrorNotification} from "../../helpers/helper";

export function loadAllOrders(page = 1, search, startTime, endTime, staff, status) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_GOOD_ORDERS});
        goodOrdersApi.loadAllOrders(page, search, startTime, endTime, staff, status)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOOD_ORDERS_SUCCESS,
                    totalOrder: res.data.total_order,
                    totalMoney: res.data.total_money,
                    totalPaidMoney: res.data.total_paid_money,
                    orders: res.data.orders,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    limit: res.data.paginator.limit,
                    totalCount: res.data.paginator.total_count
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GOOD_ORDERS_ERROR
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
                    showErrorNotification(res.data.message.message);
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

function sendShipOrderSuccess(res, dispatch) {
    const {data} = res;
    if (!data.success) {
        showErrorMessage("Có lỗi xảy ra", data.message);
    }
    if (data.success) {
        showNotification("Gửi thành công");
    }
    dispatch({
        type: types.SEND_SHIP_ORDER_COMPLETE,
        shippedGoodResponse: data
    });
    return data.order.label;
}

function changeStatusOrderSuccess(res, dispatch, orderId) {
    helper.showNotification("Thay đổi trạng thái thành công");
    if (res.data.status === 0) {
        showErrorNotification(res.data.message);
    } else {
        dispatch({
            type: types.CHANGE_STATUS_ORDER_SUCCESS,
            order_id: orderId,
            status: "ship_order"
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

export function sendShipOrder(shippingGood) {
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
        const {orderId} = shippingGood.order;
        goodOrdersApi.sendShipOrder(shippingGood)
            .then((res) => {
                const labelId = sendShipOrderSuccess(res, dispatch);
                goodOrdersApi.changeStatusOrder(orderId, "ship_order", labelId)
                    .then((res) => {
                        changeStatusOrderSuccess(res, dispatch, orderId);
                        dispatch({
                            type: types.HIDE_GLOBAL_LOADING
                        });
                    });
            });
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
                    showErrorNotification(res.data.message.message);
                    dispatch({
                        type: types.EDIT_ORDER_ERROR,
                    });
                }
            })
            .catch(() => {
                    showErrorNotification("Lỗi");
                    dispatch({
                        type: types.EDIT_ORDER_ERROR
                    });
                }
            );
    };
}
