import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function addDiscountReducer(state = initialState.addDiscount, action) {
    switch (action.type){
        case types.UPDATE_DISCOUNT_FORM_DATA :
            return {
                ...state ,
                discount : action.discount,
            };

        case types.ADD_DISCOUNT_SUCCESS :
            return {
                ...state,
               isSaving : false,
            };
        case types.ADD_DISCOUNT_ERROR :
            return {
                ...state,
               isSaving : false,
            };
        case types.BEGIN_ADD_DISCOUNT :
            return {
                ...state,
                isSaving : true,
            };
        default :
            return state ;
    }
}