import * as productListApi from './productListApi';
import * as types from '../../constants/actionTypes';
import {showErrorNotification, showNotification} from "../../helpers/helper";

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
            })
            .catch(function (error) {
                throw(error);
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
                    updated: false
                });
            })
            .catch(function (error) {
                throw(error);
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
                    updated: false
                });
            })
            .catch(function (error) {
                throw (error);
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
            showNotification("Tải lên ảnh đại diện thành công");
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
                    showNotification("Cập nhật sản phẩm thành công");
                } else {
                    showErrorNotification("Bạn cần nhập đầy đủ thông tin");
                }
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
                    manufactures: response.data.data.manufactures
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function getCategoriesProductsList() {
    return function (dispatch) {
        productListApi.getCategoriesApi()
            .then(function (response) {
                dispatch(saveCategoriesProductsList(superSortCategories(response.data.data[0].good_categories)));
            })
            .catch(function (error) {
                throw(error);
            });
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

