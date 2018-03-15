import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function importOrderReducer(state = initialState.importOrder, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_IMPORT_ORDER:{
            return{
                ...state,
                isLoadingImportOrder: true,
            };
        }
        case types.LOAD_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                isLoadingImportOrder: false,
                importOrders: action.data,
            };
        }
        case types.LOAD_IMPORT_ORDER_ERROR:{
            return{
                ...state,
                isLoadingImportOrder: false,
            };
        }

        case types.BEGIN_LOAD_ALL_ORDER_IMPORT_ORDER:{
            return{
                ...state,
                isLoadingItemOrder: true,
            };
        }
        case types.LOAD_ALL_ORDER_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                isLoadingItemOrder: false,
                itemOrders: action.data,
            };
        }
        case types.LOAD_ALL_ORDER_IMPORT_ORDER_ERROR:{
            return{
                ...state,
                isLoadingItemOrder: false,
            };
        }

        case types.BEGIN_CREATE_IMPORT_ORDER:{
            return{
                ...state,
                isLoading: true,
            };
        }
        case types.CREATE_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                isLoading: false,
            };
        }
        case types.CREATE_IMPORT_ORDER_ERROR:{
            return{
                ...state,
                isLoading: false,
            };
        }

        case types.BEGIN_EDIT_IMPORT_ORDER:{
            return{
                ...state,
                isLoading: true,
            };
        }
        case types.EDIT_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                isLoading: false,
            };
        }
        case types.EDIT_IMPORT_ORDER_ERROR:{
            return{
                ...state,
                isLoading: false,
            };
        }

        case types.BEGIN_LOAD_ALL_IMPORT_ORDER:{
            return{
                ...state,
                isLoadingImportOrder: true,
                isLoadingItemOrder: true,
                
            };
        }
        case types.LOAD_ALL_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                isLoadingImportOrder: false,
                isLoadingItemOrder: false,
                paginator: action.paginator,
                importOrders: action.data,
            };
        }
        case types.LOAD_ALL_IMPORT_ORDER_ERROR:{
            return{
                ...state,
                isLoadingItemOrder: false,
                isLoadingImportOrder: false,
            };
        }

        case types.BEGIN_LOAD_ALL_GOOD_IMPORT_ORDER:{
            return{
                ...state,

            };
        }
        case types.LOAD_ALL_GOOD_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                goods: action.data,
            };
        }
        case types.LOAD_ALL_GOOD_IMPORT_ORDER_ERROR:{
            return{
                ...state,

            };
        }

        case types.BEGIN_LOAD_ALL_COMPANIES_IMPORT_ORDER:{
            return{
                ...state,

            };
        }
        case types.LOAD_ALL_COMPANIES_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                companies: action.data,
            };
        }
        case types.LOAD_ALL_COMPANIES_IMPORT_ORDER_ERROR:{
            return{
                ...state,

            };
        }

        case types.BEGIN_LOAD_ALL_WAREHOUSE_IMPORT_ORDER:{
            return{
                ...state,

            };
        }
        case types.LOAD_ALL_WAREHOUSE_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                warehouses: action.data,
            };
        }
        case types.LOAD_ALL_WAREHOUSE_IMPORT_ORDER_ERROR:{
            return{
                ...state,

            };
        }
        case types.BEGIN_LOAD_HISTORY_IMPORT_ORDER:{
            return {
                ...state,
            };
        }

        case types.LOAD_HISTORY_IMPORT_ORDER_SUCCESS:{
            return{
                ...state,
                historyImportOrder: action.data,
                paginator_history: action.paginator,
            };
        }

        case types.CHANGE_STATUS_IMPORT_ORDER_SUCCESS:{
            // let data = state.importOrder.importOrders.map((pp) => {
            //     return (pp.id === action.id) ? {...pp, status: 3} : pp
            //         ;
            // });
            return{
                ...state,
                //importOrders: data,
            };
        }
        case types.CHANGE_STATUS_IMPORT_ORDER_ERROR:{
            return{
                ...state,
            };
        }
        default:
            return state;
    }
}