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
            if (action.loadMore) {
                return {
                    ...state,
                    inventoryChecking: {
                        ...state.inventoryChecking,
                        histories: [...state.inventoryChecking.histories, ...action.histories],
                        inventoryInfo: action.inventoryInfo,
                        totalPages: action.totalPages,
                        currentPage: action.currentPage
                    },
                    isLoadingMore: false
                };
            } else return {
                ...state,
                inventoryChecking: {
                    ...state.inventoryChecking,
                    histories: action.histories,
                    inventoryInfo: action.inventoryInfo,
                    totalPages: action.totalPages,
                    currentPage: action.currentPage
                },
                isLoadingHistoryModal: false,
                isLoadingHistoryList: false
            };
        case types.SAVE_WAREHOUSE_INVENTORY_GOOD:
            return {
                ...state,
                inventoryChecking: {
                    ...state.inventoryChecking,
                    warehouses: action.warehouses
                }
            };
        case types.TOGGLE_HISTORY_MODAL_INVENTORY_GOOD:
            return {
                ...state,
                historyModal: !state.historyModal
            };
        case types.GET_INFO_INVENTORY_GOOD:
            return {
                ...state,
                isLoading: false,
                count: action.count,
                totalImportMoney: action.totalImportMoney,
                totalMoney: action.totalMoney
            };
        case types.BEGIN_LOAD_HISTORY_INVENTORY_GOOD:
            return {
                ...state,
                isLoadingHistoryModal: true
            };
        case types.BEGIN_LOAD_MORE_HISTORY_INVENTORY_GOOD:
            return {
                ...state,
                isLoadingMore: true
            };
        case types.GET_WAREHOUSES_INVENTORY_GOOD:
            return {
                ...state,
                warehousesList: action.warehousesList
            };
        case types.BEGIN_LOAD_FILTER_HISTORY_INVENTORY_GOOD:
            return {
                ...state,
                isLoadingHistoryList: true
            };
        default:
            return state;
    }
}
