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
                    infoOrder: res.data.data.info_order,
                    infoUser: res.data.data.info_user,
                    infoShip: res.data.data.info_ship,
                    goodOrders: res.data.data.good_orders,
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
    return function (dispatch, getState) {

        if (status === "ship_order") {
            const {orders} = getState().goodOrders;
            const order = orders.filter((o) => {
                return orderId === o.id;
            })[0];
            dispatch({
                type: types.TOGGLE_SHIP_GOOD_MODAL,
            });
            dispatch({
                type: types.HANDLE_SHIP_ORDER_BEGIN,
                order: {
                    ...order,
                    orderId
                }

            });
        } else {
            helper.showTypeNotification("Đang thay đổi trạng thái", "info");
            dispatch({type: types.BEGIN_CHANGE_STATUS_ORDER});
            goodOrdersApi.changeStatusOrder(orderId, status)
                .then((res) => {
                    helper.showNotification("Thay đổi trạng thái thành công");
                    if (res.data.status === 0) {
                        showErrorNotification(res.data.message);
                    } else {

                        dispatch({
                            type: types.CHANGE_STATUS_ORDER_SUCCESS,
                            order_id: orderId,
                            status
                        });
                    }

                }).catch(() => {
                helper.showErrorNotification("Thay đổi trạng thái xảy ra lỗi");
                dispatch({
                    type: types.CHANGE_STATUS_ORDER_ERROR
                });
            });
        }

    };
}

export function showShipGoodModal(isUpdate = false) {
    return ({
        type: types.TOGGLE_SHIP_GOOD_MODAL,
        isUpdate
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

export function sendShipOrder(shippingGood) {
    shippingGood = {
        ...shippingGood,
        pick_date: moment().format("YYYY-MM-DD")
    };
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SEND_SHIP_ORDER
        });

        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });

        const updateStatusPromise = new Promise((resolve) => {
            const {orderId} = shippingGood.order;
            goodOrdersApi.changeStatusOrder(orderId, "ship_order")
                .then((res) => {
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
                    resolve();
                });
        });

        const sendShipOrderPromise = new Promise((resolve) => {
            resolve();
            goodOrdersApi.sendShipOrder(shippingGood)
                .then((res) => {
                    // console.log("res", res);
                    const {data} = res;
                    // console.log("data", data);
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
                    resolve();
                });
        });

        sendShipOrderPromise.then(() => {
            updateStatusPromise.then(() => {
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
        });

    };
}
