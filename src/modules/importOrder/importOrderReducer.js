import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function importOrderReducer(state = initialState.importOrder, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_IMPORT_ORDER: {
            return {
                ...state,
                isLoadingImportOrder: true,
            };
        }
        case types.LOAD_IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                isLoadingImportOrder: false,
                importOrders: action.data,
            };
        }
        case types.LOAD_IMPORT_ORDER_ERROR: {
            return {
                ...state,
                isLoadingImportOrder: false,
            };
        }

        case types.BEGIN_LOAD_ALL_ORDER_IMPORT_ORDER: {
            return {
                ...state,
                isLoadingItemOrder: true,
            };
        }
        case types.LOAD_ALL_ORDER_IMPORT_ORDER_SUCCESS: {
            let data = action.data;
            let get_data = data.map((pp) => {
                let new_data = pp.goods;
                let pre_arr = [];
                let count = pp.good_count;
                for (let i = 0; i < count; i++) {
                    pre_arr = [...pre_arr, new_data[i]];
                }
                for (let i = 0; i < count; i++) new_data.splice(0, 1);
                for (let i = 0; i < count; i++) {
                    new_data = [...new_data, pre_arr[i]];
                }
                return {...pp, goods: new_data};
            });
            return {
                ...state,
                isLoadingItemOrder: false,
                itemOrders: get_data,
            };
        }
        case types.LOAD_ALL_ORDER_IMPORT_ORDER_ERROR: {
            return {
                ...state,
                isLoadingItemOrder: false,
            };
        }

        case types.BEGIN_CREATE_IMPORT_ORDER: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case types.CREATE_IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case types.CREATE_IMPORT_ORDER_ERROR: {
            return {
                ...state,
                isLoading: false,
            };
        }

        case types.BEGIN_EDIT_IMPORT_ORDER: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case types.EDIT_IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case types.EDIT_IMPORT_ORDER_ERROR: {
            return {
                ...state,
                isLoading: false,
            };
        }

        case types.BEGIN_LOAD_ALL_IMPORT_ORDER: {
            return {
                ...state,
                isLoadingImportOrder: true,
                isLoadingItemOrder: true,

            };
        }
        case types.LOAD_ALL_IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                isLoadingImportOrder: false,
                isLoadingItemOrder: false,
                paginator: action.paginator,
                importOrders: action.data,
            };
        }
        case types.LOAD_ALL_IMPORT_ORDER_ERROR: {
            return {
                ...state,
                isLoadingItemOrder: false,
                isLoadingImportOrder: false,
            };
        }

        case types.BEGIN_LOAD_ALL_GOOD_IMPORT_ORDER: {
            return {
                ...state,

            };
        }
        case types.LOAD_ALL_GOOD_IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                goods: action.data,
            };
        }
        case types.LOAD_ALL_GOOD_IMPORT_ORDER_ERROR: {
            return {
                ...state,

            };
        }

        case types.BEGIN_LOAD_ALL_COMPANIES_IMPORT_ORDER: {
            return {
                ...state,

            };
        }
        case types.LOAD_ALL_COMPANIES_IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                companies: action.data,
            };
        }
        case types.LOAD_ALL_COMPANIES_IMPORT_ORDER_ERROR: {
            return {
                ...state,

            };
        }

        case types.BEGIN_LOAD_ALL_WAREHOUSE_IMPORT_ORDER: {
            return {
                ...state,

            };
        }
        case types.LOAD_ALL_WAREHOUSE_IMPORT_ORDER_SUCCESS: {
            return {
                ...state,
                warehouses: action.data,
            };
        }
        case types.LOAD_ALL_WAREHOUSE_IMPORT_ORDER_ERROR: {
            return {
                ...state,

            };
        }


        case types.CHANGE_STATUS_IMPORT_ORDER_SUCCESS: {
            // let data = state.importOrder.importOrders.map((pp) => {
            //     return (pp.id === action.id) ? {...pp, status: 3} : pp
            //         ;
            // });
            return {
                ...state,
                //importOrders: data,
            };
        }
        case types.CHANGE_STATUS_IMPORT_ORDER_ERROR: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
}