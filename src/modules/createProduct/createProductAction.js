import * as types from '../../constants/actionTypes';
import * as createProductApi from './createProductApi';
import {showErrorNotification, showNotification} from "../../helpers/helper";
import {browserHistory} from 'react-router';

export function getManufacturesCreateProduct() {
    return function (dispatch) {
        createProductApi.getManufacturesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_MANUFACTURES_CREATE_PRODUCT,
                    manufactures: response.data.data.manufactures
                });
            });
    };
}

export function getCategoriesCreateProduct() {
    return function (dispatch) {
        createProductApi.getCategoriesApi()
            .then(function (response) {
                dispatch(saveCategoriesCreateProduct(superSortCategories(response.data.data[0].good_categories)));
            });
    };
}

export function saveCategoriesCreateProduct(categories) {
    return ({
        type: types.GET_CATEGORIES_CREATE_PRODUCT,
        categories
    });
}

export function changeAvatar(file) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_AVATAR_COMPLETE_CREATE_PRODUCT,
                avatar_url: data.url
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_AVATAR_PROGRESS_CREATE_PRODUCT,
                percent: percentComplete
            });
        };
        dispatch({
            type: types.BEGIN_UPLOAD_AVATAR_CREATE_PRODUCT
        });
        createProductApi.changeAvatarApi(file,
            completeHandler, progressHandler, error);
    };
}

export function changeImage(file, length, first_length) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên ảnh thành công");
            dispatch({
                type: types.UPLOAD_IMAGE_COMPLETE_CREATE_PRODUCT,
                image: data.url,
                length,
                first_length
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_AVATAR_PROGRESS_CREATE_PRODUCT,
                percent: percentComplete
            });
        };
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_CREATE_PRODUCT
        });
        createProductApi.changeAvatarApi(file,
            completeHandler, progressHandler, error);
    };
}

export function endUpload() {
    return ({
        type: types.END_UPLOAD_IMAGE_CREATE_PRODUCT
    });
}

export function handleProductCreate(product) {
    return ({
        type: types.HANDLE_PRODUCT_CREATE,
        product
    });
}

export function saveProductCreate(product) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.saveProductApi(product)
            .then(function () {
                browserHistory.push("/goods/products");
                showNotification("Thêm sản phẩm thành công");
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function saveProductEdit(product) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.editProductApi(product)
            .then(function () {
                browserHistory.push("/goods/products");
                showNotification("Thêm sản phẩm thành công");
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}


export function loadProduct(productId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PRODUCT_DETAIL
        });
        createProductApi.loadProductApi(productId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_PRODUCT_DETAIL_SUCCESS,
                    product: res.data.data.good
                });
            });
    };
}

export function deleteImage(image) {
    return {
        type: types.DELETE_IMAGE_CREATE_PRODUCT,
        image
    };
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
