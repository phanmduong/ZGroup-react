import * as types from '../../../constants/actionTypes';

export function showPriceModal(product){
    return ({
        type: types.TOGGLE_PRICE_MODAL,
        product
    });
}

