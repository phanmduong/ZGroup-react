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
                dispatch({
                    type: types.UPDATE_CATEGORIES_COMPLETE,
                    categoriesUpdated: true
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function uploadEditProduct(productPresent, manufacture, category) {
    return function (dispatch) {
        dispatch(updatingProductListModal(true));
        productListApi.uploadEditProductApi(productPresent, manufacture, category)
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
                    type: types.UPDATE_MANUFACTURES_COMPLETE,
                    manufacturesUpdated: true
                });
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

/*export function superSortCategories(categories) {
    let n = categories.length;
    let result = [];
    let parent_id=[];
    for(let j=0; j<1000; j++) parent_id.push(0);
    categories.forEach(category=>{
       parent_id[category.parent_id]++;
    });
    let inter = [];
    for (let j = n - 1; j >= 0; j--) {
        inter.push(
            categories[j]
        );
    }
    let i = 0, id = 0, gen = 0;
    while (result.length < n){
        if(parent_id[id] > 0){
            let res = superFilter(i, id, inter, gen);
            result.push(res);
            parent_id[id]--;
            i = res.index;
            id = res.id;
            gen++;
        } else {
            id = inter[i].parent_id;
            inter[i].parent_id = null;
            gen--;
        }
    }
    return result;
}

export function superFilter(index ,id, inter, gen) {
    let first = '';
    for (let j = 0; j < gen; j++) first += '--';
    let i = index+1;
    let res={};
    while (i < inter.length) {
        if (inter[i].parent_id === id) {
            res = {
                ...inter[i],
                index: i,
                label: first + inter[i].name
            };
            i = inter.length;
        } else i++;
    }
    return res;
}*/

