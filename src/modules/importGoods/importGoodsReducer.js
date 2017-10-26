/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function importGoodsReducer(state = initialState.importGoods, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_IMPORT_ORDERS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_IMPORT_ORDERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    importOrders: action.importOrders
                }
            };
        case types.LOAD_IMPORT_ORDERS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}