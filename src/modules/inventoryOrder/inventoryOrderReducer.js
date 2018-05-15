import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function inventoryOrderReducer(state = initialState.inventoryOrder, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_INVENTORIES_ORDER:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_INVENTORIES_ORDER_SUCCESS:
            return {
                ...state,
                inventories: action.inventories,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount,
                totalQuantity: action.totalQuantity,
                totalMoney: action.totalMoney,
                isLoading: false
            };
        case types.GET_ALL_STAFFS_INVENTORIES_ORDER:
            return {
                ...state,
                staffs: action.staffs
            };
        default:
            return state;
    }
}
