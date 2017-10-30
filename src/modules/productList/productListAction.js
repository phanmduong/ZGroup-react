import * as productListApi from './productListApi';
import * as types from '../../constants/actionTypes';
import {showErrorNotification, showNotification} from "../../helpers/helper";

export function getProducts() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PRODUCTS
        });
        productListApi.getProductsApi()
            .then(function (response) {
                dispatch({
                    type: types.LOAD_PRODUCTS_SUCCESS,
                    products: response.data.goods
                });
                dispatch({
                    type: types.UPDATED_PRODUCT_LIST_MODAL,
                    updated: false
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function updatePrice(productPresent) {
    return function (dispatch) {
        dispatch(updatingProductListModal(true));
        productListApi.updatePriceApi(productPresent)
            .then(function () {
                dispatch(updatingProductListModal(false));
                dispatch({
                    type: types.TOGGLE_PRICE_MODAL
                });
                dispatch({
                    type: types.UPDATED_PRODUCT_LIST_MODAL,
                    modalUpdated: true
                });
            })
            .catch(function (error) {
                throw (error);
            });
    };
}

export function updatingProductListModal(updating) {
    return ({
        type: types.UPDATING_PRODUCT_LIST_MODAL,
        updating
    });
}

export function changeAvatar(file) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            console.log(data);
            showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_PRODUCT_AVATAR_COMPLETE,
                avatar_url: data.link
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_PRODUCT_AVATAR_PROGRESS,
                percent: percentComplete
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_PRODUCT_AVATAR
        });

        productListApi.changeAvatarApi(file,
            completeHandler, progressHandler, error);
    };
}

export function getCategoriesProductsList() {
    return function (dispatch) {
        productListApi.getCategoriesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_CATEGORIES_PRODUCTS_LIST,
                    categories: response.data.data[0].good_categories
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function uploadEditProduct(productPresent) {
    return function (dispatch) {
        dispatch(updatingProductListModal(true));
        productListApi.uploadEditProductApi(productPresent)
            .then(function () {
                dispatch(updatingProductListModal(false));
                dispatch({
                    type: types.TOGGLE_AVATAR_MODAL
                });
                dispatch({
                    type: types.UPDATED_PRODUCT_LIST_MODAL,
                    modalUpdated: true
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function getManufacturesProductsList() {
    return function (dispatch) {
        productListApi.getManufacturesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_MANUFACTURES_PRODUCTS_LIST,
                    manufactures: response.data.manufactures
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}


