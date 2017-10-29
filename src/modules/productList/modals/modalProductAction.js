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

export function showWareHouseModal() {
    return({
       type:types.TOGGLE_WARE_HOUSE_MODAL
    });
}
