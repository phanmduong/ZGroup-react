import * as productListApi from './productListApi';
import * as types from '../../constants/actionTypes';
import * as helper from "../../helpers/helper";

export function getProducts(page, search, start_time, end_time, manufacture_id, good_category_id, status) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PRODUCTS
        });
        productListApi.getInformationProductsApi()
            .then(function (response) {
                dispatch({
                    type: types.DISPLAY_INFORMATION_PRODUCTS_LIST,
                    productsTotal: response.data.data.total,
                    productsBusiness: response.data.data.for_sale,
                    productsNotBusiness: response.data.data.not_for_sale,
                    productsDisplay: response.data.data.display_on,
                    productsNotDisplay: response.data.data.display_off,
                    productsDeleted: response.data.data.deleted,
                    productsQuantity: response.data.data.total_quantity,
                    productsHighlight: response.data.data.highlight_on,
                    productsNotHighlight: response.data.data.highlight_off
                });
            });
        productListApi.getProductsApi(page, search, start_time, end_time, manufacture_id, good_category_id, status)
            .then(function (response) {
                dispatch({
                    type: types.LOAD_PRODUCTS_SUCCESS,
                    products: response.data.goods,
                    totalPages: response.data.paginator.total_pages,
                    currentPage: response.data.paginator.current_page,
                    limit: response.data.paginator.limit,
                    totalCount: response.data.paginator.total_count
                });
                dispatch({
                    type: types.UPDATED_PRODUCT_LIST_MODAL,
                    modalUpdated: false
                });
            });
    };
}

export function getProductsStatus(status) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PRODUCTS
        });
        productListApi.getProductsStatusApi(status)
            .then(function (response) {
                dispatch({
                    type: types.LOAD_PRODUCTS_SUCCESS,
                    products: response.data.goods
                });
                dispatch({
                    type: types.UPDATED_PRODUCT_LIST_MODAL,
                    modalUpdated: false
                });
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
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_PRODUCT_AVATAR_COMPLETE,
                avatar_url: data.url
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


export function saveCategoriesProductsList(categories) {
    return ({
        type: types.GET_CATEGORIES_PRODUCTS_LIST,
        categories
    });
}

export function uploadEditProduct(productPresent, manufacture_id, category_id) {
    return function (dispatch) {
        dispatch(updatingProductListModal(true));
        productListApi.uploadEditProductApi(productPresent, manufacture_id, category_id)
            .then(function (response) {
                if (response.data.status) {
                    helper.showNotification("Cập nhật sản phẩm thành công");
                } else {
                    helper.showErrorNotification("Bạn cần nhập đầy đủ thông tin");
                }
                dispatch(updatingProductListModal(false));
                dispatch({
                    type: types.TOGGLE_AVATAR_MODAL
                });
                dispatch({
                    type: types.UPDATED_PRODUCT_LIST_MODAL,
                    modalUpdated: true
                });
            });
    };
}

export function getManufacturesProductsList() {
    return function (dispatch) {
        productListApi.getManufacturesApi()
            .then(function (response) {
                dispatch({
                    type: types.GET_MANUFACTURES_PRODUCTS_LIST,
                    manufactures: response.data.data.manufactures
                });
            });
    };
}

export function getCategoriesProductsList() {
    return function (dispatch) {
        productListApi.getCategoriesApi()
            .then(function (response) {
                dispatch(saveCategoriesProductsList(helper.superSortCategories(response.data.data[0].good_categories)));
            });
    };
}

