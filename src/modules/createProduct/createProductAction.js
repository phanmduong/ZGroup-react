import * as types from '../../constants/actionTypes';
import * as createProductApi from './createProductApi';
import {browserHistory} from 'react-router';
import {
    childrenLoadedEditSuccess, showErrorNotification, showNotification,
    superSortCategories
} from "../../helpers/helper";

export function getManufacturesCreateProduct(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_GET_MANUFACTURES_CREATE_PRODUCT
        });
        createProductApi.getManufacturesApi(page, search)
            .then(function (response) {
                let manufactures = response.data.data.manufactures;
                let total_count = manufactures.length;
                dispatch({
                    type: types.GET_MANUFACTURES_CREATE_PRODUCT,
                    manufactures,
                    manufacturesFilter: manufactures,
                    manufacturesRender: manufactures.slice(0, 10),
                    totalPagesManufactures: (total_count % 10 === 0) ?
                        (total_count / 10) : ((total_count - total_count % 10) / 10) + 1,
                    currentPageManufactures: 1,
                    totalCountManufactures: total_count
                });
            });
    };
}

export function getPropertiesCreateProduct() {
    return function (dispatch) {
        createProductApi.getPropertiesApi()
            .then(function (response) {
                let properties_list = response.data.good_property_items;
                let total_count = properties_list.length;
                dispatch({
                    type: types.GET_PROPERTIES_CREATE_PRODUCT,
                    properties_list,
                    properties_list_filter: properties_list,
                    properties_list_render: properties_list.slice(0, 10),
                    totalPagesProperties: (total_count % 10 === 0) ?
                        (total_count / 10) : ((total_count - total_count % 10) / 10) + 1,
                    currentPageProperties: 1,
                    totalCountProperties: total_count
                });
            });
    };
}

export function getWarehouseListCreateProduct() {
    return function (dispatch) {
        createProductApi.getWarehouseListApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_WAREHOUSES_CREATE_PRODUCT,
                    warehousesList: response.data.data.warehouses
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

export function handleImagesWebsiteTab(images_url) {
    return ({
        type: types.HANDLE_IMAGES_WEBSITE_TAB_CREATE_PRODUCT,
        images_url
    });
}

export function handleAvatarWebsiteTab(image) {
    return ({
        type: types.HANDLE_AVATAR_WEBSITE_TAB_CREATE_PRODUCT,
        image
    });
}

export function handleChildImagesModal(images_url, index) {
    return ({
        type: types.HANDLE_CHILD_IMAGES_MODAL_CREATE_PRODUCT,
        images_url,
        index
    });
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
                browserHistory.push("/good/goods/products");
                showNotification("Thêm sản phẩm thành công");
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function importOrder(product) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.importOrderApi(product)
            .then(function (res) {
                if (res.data.status) {
                    browserHistory.push("/order/orders");
                    showNotification("Đã nhập vào kho hàng sẵn");
                } else {
                    showErrorNotification(res.data.message);
                }
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
                        children: childrenLoadedEditSuccess(property_list, res.data.data.good.children)
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

export function showManufacturesManageModal() {
    return {
        type: types.TOGGLE_MANUFACTURES_MANAGE_MODAL
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
        let properties_list_filter = getState().createProduct.properties_list_filter;
        let currentPageProperties = getState().createProduct.currentPageProperties;
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.deletePropertyApi(property)
            .then(function (res) {
                if (res.data.status) {
                    properties_list = properties_list.filter(proper => proper.id !== property.id);
                    properties_list_filter = properties_list_filter.filter(proper => proper.id !== property.id);
                    let totalCountProperties = properties_list_filter.length;
                    let totalPagesProperties = (totalCountProperties % 10 === 0) ?
                        (totalCountProperties / 10) : ((totalCountProperties - totalCountProperties % 10) / 10) + 1;
                    let start = 10 * (currentPageProperties - 1);
                    dispatch({
                        type: types.GET_PROPERTIES_CREATE_PRODUCT,
                        properties_list,
                        properties_list_filter,
                        properties_list_render: properties_list_filter.slice(start, start + 10),
                        totalPagesProperties,
                        currentPageProperties,
                        totalCountProperties
                    });
                    showNotification("Xóa thuộc tính thành công");
                } else showErrorNotification(res.data.message);
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function deleteManufactureModal(manufacture) {
    return function (dispatch, getState) {
        let manufactures = getState().createProduct.manufactures;
        let manufacturesFilter = getState().createProduct.manufacturesFilter;
        let currentPageManufactures = getState().createProduct.currentPageManufactures;
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        createProductApi.deleteManufactureApi(manufacture)
            .then(function (res) {
                if (res.data.status) {
                    manufactures = manufactures.filter(manufac => manufac.id !== manufacture.id);
                    manufacturesFilter = manufacturesFilter.filter(manufac => manufac.id !== manufacture.id);
                    let totalCountManufactures = manufacturesFilter.length;
                    let totalPagesManufactures = (totalCountManufactures % 10 === 0) ?
                        (totalCountManufactures / 10) : ((totalCountManufactures - totalCountManufactures % 10) / 10) + 1;
                    let start = 10 * (currentPageManufactures - 1);
                    dispatch({
                        type: types.GET_MANUFACTURES_CREATE_PRODUCT,
                        manufactures,
                        manufacturesFilter,
                        manufacturesRender: manufacturesFilter.slice(start, start + 10),
                        totalPagesManufactures,
                        currentPageManufactures,
                        totalCountManufactures
                    });
                    showNotification("Xóa nhà sản xuất thành công");
                } else showErrorNotification(res.data.message);
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
                    properties_list = [{
                        id: res.data.data.id,
                        name: res.data.data.name
                    }, ...properties_list];
                    let currentPageProperties = 1;
                    let totalCountProperties = properties_list.length;
                    let totalPagesProperties = (totalCountProperties % 10 === 0) ?
                        (totalCountProperties / 10) : ((totalCountProperties - totalCountProperties % 10) / 10) + 1;
                    dispatch({
                        type: types.GET_PROPERTIES_CREATE_PRODUCT,
                        properties_list,
                        properties_list_filter: properties_list,
                        properties_list_render: properties_list.slice(0, 10),
                        totalPagesProperties,
                        currentPageProperties,
                        totalCountProperties
                    });
                    showNotification("Tạo thuộc tính thành công");
                } else showErrorNotification(res.data.message);
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
                    manufactures = [
                        {
                            id: res.data.data.id,
                            name: res.data.data.name
                        },
                        ...manufactures
                    ];
                    let currentPageManufactures = 1;
                    let totalCountManufactures = manufactures.length;
                    let totalPagesManufactures = (totalCountManufactures % 10 === 0) ?
                        (totalCountManufactures / 10) : ((totalCountManufactures - totalCountManufactures % 10) / 10) + 1;
                    dispatch({
                        type: types.GET_MANUFACTURES_CREATE_PRODUCT,
                        manufactures,
                        manufacturesFilter: manufactures,
                        manufacturesRender: manufactures.slice(0, 10),
                        totalPagesManufactures,
                        currentPageManufactures,
                        totalCountManufactures
                    });
                    showNotification("Thêm nhà sản xuất thành công");
                } else showErrorNotification(res.data.message.message);
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function filterManufacturesModal(page, query) {
    return function (dispatch, getState) {
        let manufactures = getState().createProduct.manufactures;
        let manufacturesFilter = manufactures.filter(manufacture => manufacture.name.includes(query));
        let start = 10 * (page - 1);
        let total_count = manufacturesFilter.length;
        dispatch({
            type: types.GET_MANUFACTURES_CREATE_PRODUCT,
            manufactures,
            manufacturesFilter,
            manufacturesRender: manufacturesFilter.slice(start, start + 10),
            totalPagesManufactures: (total_count % 10 === 0) ?
                (total_count / 10) : ((total_count - total_count % 10) / 10) + 1,
            currentPageManufactures: page,
            totalCountManufactures: total_count
        });
    };
}

export function filterPropertiesModal(page, query) {
    return function (dispatch, getState) {
        let properties_list = getState().createProduct.properties_list;
        let properties_list_filter = properties_list.filter(property => property.name.includes(query));
        let start = 10 * (page - 1);
        let total_count = properties_list_filter.length;
        dispatch({
            type: types.GET_PROPERTIES_CREATE_PRODUCT,
            properties_list,
            properties_list_filter,
            properties_list_render: properties_list_filter.slice(start, start + 10),
            totalPagesProperties: (total_count % 10 === 0) ?
                (total_count / 10) : ((total_count - total_count % 10) / 10) + 1,
            currentPageProperties: page,
            totalCountProperties: total_count
        });
    };
}




