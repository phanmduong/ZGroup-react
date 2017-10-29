import * as productListApi from './productListApi';
import * as types from '../../constants/actionTypes';

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
                   type:types.UPDATED_PRODUCT_LIST_MODAL,
                   updated:false
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}

export function updatePrice(productEditing) {
    return function (dispatch) {
        dispatch(updatingProductListModal(true));
        productListApi.updatePriceApi(productEditing)
            .then(function () {
                dispatch(updatingProductListModal(false));
                dispatch({
                   type: types.TOGGLE_PRICE_MODAL
                });
                dispatch({
                   type: types.UPDATED_PRODUCT_LIST_MODAL,
                   modalUpdated:true
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


