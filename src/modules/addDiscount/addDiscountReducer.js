import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function addDiscountReducer(state = initialState.addDiscount, action) {
    switch (action.type) {


        case types.BEGIN_UPLOAD_IMAGE_IN_DISCOUNT:
            return {
                ...state,
                discount: {
                    ...state.discount,
                    isUpdatingImage: true,
                    updateImageError: false,
                }
            };
        case types.UPLOAD_IMAGE_DISCOUNT_SUCCESS:
            return {
                ...state,
                discount: {
                    ...state.discount,
                    isUpdatingImage: false,
                    updateImageError: false,
                    cover_url: action.cover_url
                }
            };
        case types.UPLOAD_IMAGE_DISCOUNT_FAILED:
            return {
                ...state,
                discount: {
                    ...state.discount,
                    isUpdatingImage: false,
                    updateImageError: true,
                }
            };


        case types.UPDATE_DISCOUNT_FORM_DATA :
            return {
                ...state,
                discount: action.discount,
            };



        //           ADD
        case types.ADD_DISCOUNT_SUCCESS :
            return {
                ...state,
                isSaving: false,
            };
        case types.ADD_DISCOUNT_ERROR :
            return {
                ...state,
                isSaving: false,
            };
        case types.BEGIN_ADD_DISCOUNT :
            return {
                ...state,
                isSaving: true,
            };





        //          LOAD CUSTOMERS


        case types.BEGIN_LOAD_CUSTOMER_IN_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_CUSTOMER_SUCCESS_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    customers: action.customers,
                    isLoading: false,
                    totalCustomerPages: action.total_pages,
                }
            };
        case types.LOADED_CUSTOMER_ERROR_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };




        //          LOAD GOODS


        case types.BEGIN_LOAD_GOOD_IN_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_GOOD_SUCCESS_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    goods: action.goods,
                    isLoading: false,
                    totalGoodPages: action.total_pages,
                }
            };

        case types.LOADED_GOOD_ERROR_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };


        //          LOAD GROUP_CUSTOMER


        case types.BEGIN_LOAD_GROUP_CUSTOMER_IN_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_GROUP_CUSTOMER_SUCCESS_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    groupCustomers: action.customer_groups,
                    isLoading: false,
                    totalGroupCustomerPages: action.total_pages,
                }
            };

        case types.LOADED_GROUP_CUSTOMER_ERROR_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };

        //          LOAD CATEGORIES


        case types.BEGIN_LOAD_CATEGORY_IN_DISCOUNT :
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOADED_CATEGORY_SUCCESS_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    categories: action.categories,
                    isLoading: false,
                }
            };

        case types.LOADED_CATEGORY_ERROR_IN_DISCOUNT:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };



        //              LOAD DISCOUNT


        case types.LOADED_DISCOUNT_SUCCESS_IN_ADD:
            return {
                ...state,
                discount: action.discount,
                isLoadingOut: false,
            };

        case types.BEGIN_LOAD_DISCOUNT_IN_ADD:
            return {
                ...state,
                discount: action.discount,
                isLoadingOut: true,
            };



        //          EDIT DISCOUNT


        case types.BEGIN_EDIT_DISCOUNT :
            return {
                ...state,
                isSaving: true,
            };
        case types.EDIT_DISCOUNT_SUCCESS :
            return {
                ...state,
                isSaving: false,
            };
        case types.EDIT_DISCOUNT_ERROR :
            return {
                ...state,
                isSaving: false,
            };


        case types.GENERATE_RANDOM_CODE :
            return {
                ...state,
                discount: {
                    ...state.discount,
                    name: action.randomCode,
                },
            };


        default :
            return state;
    }
}