import * as productListApi from './productListApi';
import * as types from '../../constants/actionTypes';

export function getProducts() {
    return function (dispatch) {
        dispatch({
           type:types.BEGIN_LOAD_PRODUCTS
        });
        productListApi.getProductsApi()
            .then(function (response) {
                dispatch({
                    type:types.LOAD_PRODUCTS_SUCCESS,
                    products:response.data.goods
                });
            })
            .catch(function (error) {
                throw(error);
            });
    };
}


