import * as inventoryGoodApi from './inventoryGoodApi';
import * as types from '../../constants/actionTypes';

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
            })
            .catch(function (error) {
                throw (error);
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
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function getCategoriesInventoryGood() {
    return function (dispatch) {
        inventoryGoodApi.getCategoriesApi()
            .then(function (response) {
                dispatch(saveCategoriesInventoryGood(superSortCategories(response.data.data[0].good_categories)));
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function saveCategoriesInventoryGood(categories) {
    return ({
        type: types.GET_CATEGORIES_INVENTORY_GOOD,
        categories
    });
}

export function getHistoryInventories(inventory) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_INVENTORY_GOOD
        });
        inventoryGoodApi.getHistoryInventoriesApi(inventory.id)
            .then(function (response) {
                dispatch({
                    type: types.SAVE_HISTORY_INVENTORY_GOOD,
                    histories: response.data.data.history,
                    inventoryInfo: inventory
                });
            })
            .catch(function (error) {
                throw(error);
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
            })
            .catch(function () {

            });
    };
}

export function showHistoryModal() {
    return ({
        type: types.TOGGLE_HISTORY_MODAL_INVENTORY_GOOD
    });
}

export function superSortCategories(categories) {
    categories.reverse();
    let result = [];
    let index = -1, id = 0, gen = 0;
    let medium = superFilter(id, categories, gen);
    result.splice(index + 1, 0, ...medium);
    for (let j = 0; j < categories.length; j++) {
        let tmp = medium[j];
        if (tmp) {
            index = result.indexOf(tmp);
            gen = tmp.gen;
            let a = superFilter(tmp.id, categories, gen);
            result.splice(index + 1, 0, ...a);
            medium = [...medium, ...a];
        }
    }
    return result;
}

export function superFilter(id, inter, gen) {
    let first = '';
    for (let j = 0; j < gen; j++) first += '--';
    let res = inter.filter(children => children.parent_id === id);
    const newArr = res.map((children) => {
        return {
            ...children,
            ...{
                gen: gen + 1,
                label: first + children.name
            }
        };
    });
    return newArr;
}