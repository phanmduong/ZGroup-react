import * as types from '../../constants/actionTypes';
import * as helper from '../../helpers/helper';
import * as goodOrdersApi from './goodOrdersApi';

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
export function changeStatusOrder(orderId, status) {
    return function (dispatch) {
        helper.showTypeNotification("Đang thay đổi trạng thái", "info");
        dispatch({type: types.BEGIN_CHANGE_STATUS_ORDER});
        goodOrdersApi.changeStatusOrder(orderId, status)
            .then(() => {
                helper.showNotification("Thay đổi trạng thái thành công");
                dispatch({
                    type: types.CHANGE_STATUS_ORDER_SUCCESS,
                    order_id: orderId,
                    status
                });
            }).catch(() => {
            helper.showErrorNotification("Thay đổi trạng thái xảy ra lỗi");
            dispatch({
                type: types.CHANGE_STATUS_ORDER_ERROR
            });
        });
    };
}
