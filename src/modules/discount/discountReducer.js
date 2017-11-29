import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

// let customersList;
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
        default :
            return state;
    }
}