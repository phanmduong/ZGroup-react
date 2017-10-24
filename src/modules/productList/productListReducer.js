import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function productListReducer(state = initialState.productList, action) {

    switch (action.type) {
        case types.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                isLoading:false
            };
        case types.TOGGLE_PRICE_MODAL:
            return {
                ...state,
                modalInProduct: {
                    priceModal: !state.modalInProduct.priceModal
                }
            };
        case types.BEGIN_LOAD_PRODUCTS:
            return {
                ...state,
                isLoading: true
            };
        case types.HANDLE_PRODUCT:
            return{
                ...state,
                productEditing: action.product
            };
        case types.MODAL_UPDATING:
            return{
                ...state,
                modalInProduct:{
                    ...state.modalInProduct,
                    isModalUpdating: action.updating
                }
            };
        case types.MODAL_UPDATED:
            return{
                ...state,
                modalInProduct:{
                    ...state.modalInProduct,
                    modalUpdated: action.modalUpdated
                }
            };
        default:
            return state;
    }
}
