import * as types from '../../constants/actionTypes';
import * as createProductApi from './createProductApi';
import * as helper from "../../helpers/helper";
import {browserHistory} from 'react-router';

export function getManufacturesCreateProduct() {
    return function (dispatch) {
        createProductApi.getManufacturesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_MANUFACTURES_CREATE_PRODUCT,
                    manufactures: response.data.manufactures
                });
            });
    };
}

export function getCategoriesCreateProduct() {
    return function (dispatch) {
        createProductApi.getCategoriesApi()
            .then(function (response) {
                dispatch(saveCategoriesCreateProduct(helper.superSortCategories(response.data.data[0].good_categories)));
            });
    };
}

export function getPropertiesCreateProduct() {
    return function (dispatch) {
        createProductApi.getPropertiesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_PROPERTIES_CREATE_PRODUCT,
                    properties_list: response.data.good_property_items
                });
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
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh đại diện thành công");
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
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_CREATE_PRODUCT
        });
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh thành công");
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
        createProductApi.changeAvatarApi(file,
            completeHandler, progressHandler, error);
    };
}

export function changeChildImageModal(file, length, first_length, index) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_CREATE_PRODUCT
        });
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh thành công");
            dispatch({
                type: types.UPLOAD_CHILD_IMAGE_COMPLETE_MODAL,
                image: data.url,
                length,
                first_length,
                index
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_AVATAR_PROGRESS_CREATE_PRODUCT,
                percent: percentComplete
            });
        };
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

export function addPropertiesCreate(property) {
    return ({
        type: types.ADD_PROPERTIES_CREATE,
        property
    });
}

export function handlePropertiesCreate(property_list) {
    return ({
        type: types.HANDLE_PROPERTIES_CREATE,
        property_list
    });
}

export function handleChildrenCreateProduct(children) {
    return {
        type: types.HANDLE_CHILDREN_CREATE_PRODUCT,
        children
    };
}

export function selectGoodCountCheck() {
    return ({
        type: types.SELECT_GOOD_COUNT_CHECK
    });
}

export function saveProductCreate(product) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.saveProductApi(product)
            .then(function () {
                browserHistory.push("/good/goods/products");
                helper.showNotification("Thêm sản phẩm thành công");
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
                browserHistory.push("/good/goods/products");
                helper.showNotification("Thêm sản phẩm thành công");
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
                let product = {...res.data.data.good};
                if (res.data.data.good.property_list && res.data.data.good.children) {
                    let property_list = res.data.data.good.property_list.map(property => {
                        return {
                            ...property,
                            value: property.value.map(e => {
                                return {
                                    old: true,
                                    value: e,
                                    label: e
                                };
                            })
                        };
                    });
                    let goods_count = res.data.data.good.property_list.reduce((result, property) => property.value.length * result, 1);
                    product = {
                        ...product,
                        property_list: property_list,
                        goods_count: goods_count,
                        children: helper.childrenLoadedEditSuccess(property_list, res.data.data.good.children)
                    };
                    dispatch({
                        type: types.LOAD_PRODUCT_DETAIL_SUCCESS,
                        product: product
                    });
                } else {
                    product = {
                        ...product,
                        property_list: [{
                            name: 'coool',
                            property_item_id: 3,
                            value: []
                        }],
                        goods_count: 0,
                        children: []
                    };
                    dispatch({
                        type: types.LOAD_PRODUCT_DETAIL_SUCCESS,
                        product: product
                    });
                }
            });
    };
}

export function deleteImage(image) {
    return {
        type: types.DELETE_IMAGE_CREATE_PRODUCT,
        image
    };
}

export function handleGoodCountCreate(count) {
    return {
        type: types.HANDLE_GOOD_COUNT_CREATE,
        count
    };
}

export function showAddChildImagesModal(index) {
    return {
        type: types.TOGGLE_ADD_CHILD_IMAGES_MODAL,
        index
    };
}

export function shutDownAddChildImagesModal() {
    return {
        type: types.SHUT_DOWN_ADD_CHILD_IMAGES_MODAL
    };
}

export function showPropertiesManageModal() {
    return {
        type: types.TOGGLE_PROPERTIES_MANAGE_MODAL
    };
}

export function handlePropertiesManage(properties_list) {
    return {
        type: types.HANDLE_PROPERTIES_MANAGE,
        properties_list
    };
}

export function deletePropertyModal(property) {
    return function (dispatch, getState) {
        let properties_list = getState().createProduct.properties_list;
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.deletePropertyApi(property)
            .then(function (res) {
                if (res.data.status) {
                    properties_list = properties_list.filter(proper => proper.id !== property.id);
                    dispatch({
                        type: types.HANDLE_PROPERTIES_MANAGE,
                        properties_list
                    });
                    helper.showNotification("Xóa thuộc tính thành công");
                } else helper.showErrorNotification(res.data.message);
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function createPropertyModal(name) {
    return function (dispatch, getState) {
        let properties_list = getState().createProduct.properties_list;
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.createPropertyApi(name)
            .then(function (res) {
                if (res.data.status) {
                    properties_list = [...properties_list, {
                        id: res.data.data.id,
                        name: res.data.data.name
                    }];
                    dispatch({
                        type: types.HANDLE_PROPERTIES_MANAGE,
                        properties_list
                    });
                    helper.showNotification("Tạo thuộc tính thành công");
                } else helper.showErrorNotification(res.data.message);
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function showManufacturesManageModal() {
    return {
        type: types.TOGGLE_MANUFACTURES_MANAGE_MODAL
    };
}

export function handleManufacturesManage(manufactures) {
    return {
        type: types.HANDLE_MANUFACTURES_MANAGE,
        manufactures
    };
}

export function deleteManufactureModal(manufacture) {
    return function (dispatch, getState) {
        let manufactures = getState().createProduct.manufactures;
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.deleteManufactureApi(manufacture)
            .then(function (res) {
                if (res.data.status) {
                    manufactures = manufactures.filter(manufac => manufac.id !== manufacture.id);
                    dispatch({
                        type: types.HANDLE_MANUFACTURES_MANAGE,
                        manufactures
                    });
                    helper.showNotification("Xóa nhà sản xuất thành công");
                } else helper.showErrorNotification(res.data.message);
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function createManufactureModal(name) {
    return function (dispatch, getState) {
        let manufactures = getState().createProduct.manufactures;
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.createManufactureApi(name)
            .then(function (res) {
                if (res.data.status) {
                    manufactures = [...manufactures, {
                        id: res.data.data.id,
                        name: res.data.data.name
                    }];
                    dispatch({
                        type: types.HANDLE_MANUFACTURES_MANAGE,
                        manufactures
                    });
                    helper.showNotification("Thêm nhà sản xuất thành công");
                } else helper.showErrorNotification(res.data.message);
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}



