/**
 * Created by nangbandem
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function printOrderReducer(state = initialState.printOrder, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_PRINT_ORDERS:
            return {
                ...state,
                isLoading: true,
            };
        case types.LOAD_PRINT_ORDERS_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                listPrintOrder: action.listPrintOrder,
                paginator: action.paginator,
            };
        }

        case types.LOAD_PRINT_ORDERS_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case types.UPDATE_FORM_DATA_PRINT_ORDER:
            return {
                ...state,
                data: action.newdata,
            };

        case types.BEGIN_LOAD_ALL_GOODS_PRINT_ORDER:
            return {
                ...state,
                isLoading: true,
            };
        case types.LOAD_ALL_GOODS_PRINT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                goods: getSelectArray(action.goods),
            };
        }

        case types.LOAD_ALL_GOODS_PRINT_ORDER_ERROR:
            return {
                ...state,
                isLoading: false,
            };

        case types.BEGIN_LOAD_ALL_COMPANIES_PRINT_ORDER:
            return {
                ...state,
                isLoading: true,
            };
        case types.LOAD_ALL_COMPANIES_PRINT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                companies: getSelectArray(action.companies),
            };
        }

        case types.LOAD_ALL_COMPANIES_PRINT_ORDER_ERROR:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}

function getSelectArray(arr){
    return arr.map(obj => {
        return {
            ...obj,
            value: obj.id,
            label: obj.name,
        };
    });
}