import * as types from '../../../constants/actionTypes';

export function showPriceModal() {
    return ({
        type: types.TOGGLE_PRICE_MODAL,
    });
}

export function handleProduct(product) {
    return ({
        type: types.HANDLE_PRODUCT,
        product
    });
}

export function handleManufacture(manufacture) {
    return ({
        type: types.HANDLE_MANUFACTURE,
        manufacture
    });
}

export function handleCategory(category) {
    return ({
        type: types.HANDLE_CATEGORY,
        category
    });
}

export function showWareHouseModal() {
    return ({
        type: types.TOGGLE_WARE_HOUSE_MODAL
    });
}

export function showAvatarModal() {
    return function (dispatch) {
        dispatch({
            type: types.TOGGLE_AVATAR_MODAL
        });
        dispatch({
            type: types.UPDATE_CATEGORIES_COMPLETE,
            categoriesUpdated: false
        });
        dispatch({
            type: types.UPDATE_MANUFACTURES_COMPLETE,
            manufacturesUpdated: false
        });
    };
}