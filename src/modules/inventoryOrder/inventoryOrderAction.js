import * as inventoryOrderApi from './inventoryOrderApi';
import * as types from '../../constants/actionTypes';

export function getInventoriesOrder(page, search, staff_id, user_id, start_time, end_time) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_INVENTORIES_ORDER
        });
        const infoPromise = new Promise((resolve) => {
            inventoryOrderApi.getInfoInventoriesOrderApi(page, search, staff_id, user_id, start_time, end_time)
                .then(function (response) {
                    resolve(response);
                });
        });
        const getInventoryPromise = new Promise((resolve) => {
            inventoryOrderApi.getInventoriesOrderApi(page, search, staff_id, user_id, start_time, end_time)
                .then(function (response) {
                    resolve(response);
                });
        });
        Promise.all([infoPromise, getInventoryPromise]).then((data) => {
            const infoRes = data[0];
            const inventoryRes = data[1];
            dispatch({
                type: types.LOAD_INVENTORIES_ORDER_SUCCESS,
                inventories: inventoryRes.data.delivery_orders,
                totalPages: inventoryRes.data.paginator.total_pages,
                currentPage: inventoryRes.data.paginator.current_page,
                limit: inventoryRes.data.paginator.limit,
                totalCount: inventoryRes.data.paginator.total_count,
                totalQuantity: infoRes.data.data.total_quantity,
                totalMoney: infoRes.data.data.total_money
            });
        });
    };
}

export function getAllStaffs() {
    return function (dispatch) {
        inventoryOrderApi.getAllStaffApi()
            .then(res => {
                dispatch({
                    type: types.GET_ALL_STAFFS_INVENTORIES_ORDER,
                    staffs: res.data.staffs
                });
            });
    };
}


