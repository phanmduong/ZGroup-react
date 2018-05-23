/**
 * Created by nangbandem
 */
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function exportOrderReducer(state = initialState.exportOrder, action) {
    // console.log(action.type, state.data);
    switch (action.type) {
        case types.BEGIN_LOAD_EXPORT_ORDERS:
            return {
                ...state,
                isLoading: true,
            };
        case types.LOAD_EXPORT_ORDERS_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                listExportOrder: action.listExportOrder,
                paginator: action.paginator,
            };
        }
        case types.LOAD_EXPORT_ORDERS_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case types.BEGIN_LOAD_ALL_GOODS_EXPORT_ORDER:
            return {
                ...state,
                isLoadingGoods: true,
            };
        case types.LOAD_ALL_GOODS_EXPORT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoadingGoods: false,
                goods: getSelectArray(action.goods),
            };
        }

        case types.LOAD_ALL_GOODS_EXPORT_ORDER_ERROR:
            return {
                ...state,
                isLoadingGoods: false,
            };

        case types.BEGIN_LOAD_ALL_COMPANIES_EXPORT_ORDER:
            return {
                ...state,
                isLoadingCompanies: true,
            };
        case types.LOAD_ALL_COMPANIES_EXPORT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoadingCompanies: false,
                companies: getSelectArrayCompanies(action.companies),
            };
        }

        case types.LOAD_ALL_COMPANIES_EXPORT_ORDER_ERROR:
            return {
                ...state,
                isLoadingCompanies: false,
            };
        case types.BEGIN_LOAD_ALL_WAREHOUSES_EXPORT_ORDER:
            return {
                ...state,
                isLoadingWarehouses: true,
            };
        case types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoadingWarehouses: false,
                warehouses: getSelectArrayWareHouse(action.warehouses),
            };
        }

        case types.LOAD_ALL_WAREHOUSES_EXPORT_ORDER_ERROR:
            return {
                ...state,
                isLoadingWarehouses: false,
            };
        case types.BEGIN_LOAD_INFO_EXPORT_ORDER:
            return {
                ...state,
                isLoading: true,
            };
        case types.LOAD_INFO_EXPORT_ORDER_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                data: action.data,
            };
        }

        case types.LOAD_INFO_EXPORT_ORDER_ERROR:
            return {
                ...state,
                isLoading: false,
            };
        case types.BEGIN_EDIT_EXPORT_ORDER:
            return {
                ...state,
                isCommitting: true,
            };
        case types.EDIT_EXPORT_ORDER_SUCCESS:{
            return {
                ...state,
                isCommitting: false,
            };
        }

        case types.EDIT_EXPORT_ORDER_ERROR:
            return {
                ...state,
                isCommitting: false,
            };
        case types.BEGIN_CREATE_EXPORT_ORDER:
            return {
                ...state,
                isCommitting: true,
            };
        case types.CREATE_EXPORT_ORDER_SUCCESS:{
            return {
                ...state,
                isCommitting: false,
            };
        }

        case types.CREATE_EXPORT_ORDER_ERROR:
            return {
                ...state,
                isCommitting: false,
            };
            
        case types.BEGIN_LOAD_ALL_ORDERED_GOOD_EXPORT_ORDER:
            return {
                ...state,
                
            };
        case types.LOAD_ALL_ORDERED_GOOD_EXPORT_ORDER_SUCCESS:{
            return {
                ...state,
                orderedGoods: getSelectArray(action.orderedGoods),
            };
        }
        case types.LOAD_ALL_ORDERED_GOOD_EXPORT_ORDER_ERROR:
            return {
                ...state,
                
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
            label: obj.command_code,
        };
    });
}
function getSelectArrayCompanies(arr){
    return arr.map(obj => {
        return {
            ...obj,
            value: obj.id,
            label: obj.name,
        };
    });
}

function getSelectArrayWareHouse(arr){
    return arr.map(obj => {
        return {
            ...obj,
            value: obj.id,
            label: obj.name,
        };
    });
}