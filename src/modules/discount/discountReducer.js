import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let discountsList;
export default function discountReducer(state = initialState.discounts, action) {
    switch (action.type) {



        //             LOAD DISCOUNTS

        case types.BEGIN_LOAD_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_DISCOUNT_SUCCESS:
            return {
                ...state,
                ...{
                    discountsList: action.discountsList,
                    totalPages: action.total_pages,
                    totalCount: action.total_count,
                    isLoading: false,
                }
            };

        case types.LOADED_DISCOUNT_ERROR:
            return {
                ...state,
                isLoading: false,

            };


        case types.DELETE_DISCOUNT_SUCCESS:

            discountsList = deleteDiscountReducer(action.id, state.discountsList);
            return {
                ...state,
                discountsList: discountsList,
            };
        default :
            return state;
    }
}

function deleteDiscountReducer(id, discountsList) {
    if (discountsList) {
        discountsList = discountsList.map((discount) => {
            if (discount.id === id) {
                return  {...discount,activate : 0};
            } else return discount;
        });
    }
    return discountsList;
}