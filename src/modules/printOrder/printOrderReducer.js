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
        default:
            return state;
    }
}