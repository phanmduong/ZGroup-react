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
                   type:types.MODAL_UPDATED,
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
        dispatch(modalUpdating(true));
        productListApi.updatePriceApi(productEditing)
            .then(function (response) {
                console.log("response", response);
                dispatch(modalUpdating(false));
                dispatch({
                   type: types.TOGGLE_PRICE_MODAL
                });
                dispatch({
                   type: types.MODAL_UPDATED,
                   modalUpdated:true
                });
            })
            .catch(function (error) {
                throw (error);
            });
    };
}

export function modalUpdating(updating) {
    return ({
        type: types.MODAL_UPDATING,
        updating
    });
}


