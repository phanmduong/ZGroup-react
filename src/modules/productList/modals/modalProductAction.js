import * as types from '../../../constants/actionTypes';

export function showPriceModal(){
    return ({
        type: types.TOGGLE_PRICE_MODAL,
    });
}

export function handleProduct(product){
    return({
        type: types.HANDLE_PRODUCT,
        product
    });
}


