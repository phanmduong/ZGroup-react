import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function inventoryGoodReducer(state = initialState.inventoryGood, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_INVENTORIES_GOODS:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_INVENTORIES_GOODS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount,
                inventories: action.inventories
            };
        case types.GET_CATEGORIES_INVENTORY_GOOD:
            return {
                ...state,
                categories: action.categories
            };
        case types.GET_MANUFACTURES_INVENTORY_GOOD:
            return {
                ...state,
                manufactures: action.manufactures
            };
        case types.SAVE_HISTORY_INVENTORY_GOOD:
            return {
                ...state,
                inventoryChecking: {
                    ...state.inventoryChecking,
                    histories: action.histories,
                    inventoryInfo: action.inventoryInfo,
                },
                isLoadingHistoryModal: false
            };
        case types.SAVE_WAREHOUSE_INVENTORY_GOOD:
            return {
                ...state,
                inventoryChecking: {
                    ...state.inventoryChecking,
                    warehouses: action.warehouses
                },
                isLoadingHistoryModal: false
            };
        case types.TOGGLE_HISTORY_MODAL_INVENTORY_GOOD:
            return {
                ...state,
                historyModal: !state.historyModal
            };
        case types.GET_INFO_INVENTORY_GOOD:
            return {
                ...state,
                count: action.count,
                totalImportMoney: action.totalImportMoney,
                totalMoney: action.totalMoney
            };
        case types.BEGIN_LOAD_HISTORY_INVENTORY_GOOD:
            return {
                ...state,
                isLoadingHistoryModal: true
            };
        default:
            return state;
    }
}
