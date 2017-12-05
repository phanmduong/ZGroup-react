import * as inventoryGoodApi from './inventoryGoodApi';
import * as types from '../../constants/actionTypes';
import * as helper from "../../helpers/helper";

export function getInventories(page, search, manufacture_id, good_category_id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_INVENTORIES_GOODS
        });
        inventoryGoodApi.getInventoriesApi(page, search, manufacture_id, good_category_id)
            .then(function (response) {
                dispatch({
                    type: types.LOAD_INVENTORIES_GOODS_SUCCESS,
                    inventories: response.data.inventories,
                    totalPages: response.data.paginator.total_pages,
                    currentPage: response.data.paginator.current_page,
                    limit: response.data.paginator.limit,
                    totalCount: response.data.paginator.total_count
                });
            });
    };
}

export function getManufacturesInventoryGood() {
    return function (dispatch) {
        inventoryGoodApi.getManufacturesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_MANUFACTURES_INVENTORY_GOOD,
                    manufactures: response.data.data.manufactures
                });
            });
    };
}

export function getCategoriesInventoryGood() {
    return function (dispatch) {
        inventoryGoodApi.getCategoriesApi()
            .then(function (response) {
                dispatch(saveCategoriesInventoryGood(helper.superSortCategories(response.data.data[0].good_categories)));
            });
    };
}

export function saveCategoriesInventoryGood(categories) {
    return ({
        type: types.GET_CATEGORIES_INVENTORY_GOOD,
        categories
    });
}

export function getHistoryInventories(inventory, page, warehouse_id, loadMore) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_MORE_HISTORY_INVENTORY_GOOD
        });
        inventoryGoodApi.getHistoryInventoriesApi(inventory.id, page, warehouse_id)
            .then(function (response) {
                dispatch({
                    type: types.SAVE_HISTORY_INVENTORY_GOOD,
                    histories: response.data.history,
                    inventoryInfo: inventory,
                    totalPages: response.data.paginator.total_pages,
                    currentPage: response.data.paginator.current_page,
                    loadMore
                });
            });
    };
}

export function getWarehouseInventories(inventory) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_INVENTORY_GOOD
        });
        inventoryGoodApi.getWarehouseApi(inventory.id)
            .then(function (response) {
                dispatch({
                    type: types.SAVE_WAREHOUSE_INVENTORY_GOOD,
                    warehouses: response.data.data.warehouses
                });
                dispatch(getHistoryInventories(inventory, null, null, false));
            });
    };
}

export function getInfoInventories() {
    return function (dispatch) {
        inventoryGoodApi.getInfoInventoriesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_INFO_INVENTORY_GOOD,
                    count: response.data.data.count,
                    totalImportMoney: response.data.data.total_import_money,
                    totalMoney: response.data.data.total_money
                });
            });
    };
}

export function getWarehouseList() {
    return function (dispatch) {
        inventoryGoodApi.getWarehouseListApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_WAREHOUSES_INVENTORY_GOOD,
                    warehousesList: response.data.data.warehouses
                });
            });
    };
}

export function showHistoryModal() {
    return ({
        type: types.TOGGLE_HISTORY_MODAL_INVENTORY_GOOD
    });
}