import initialState from '../../../reducers/initialState';
import * as types from './zWarehouseActionTypes';
export default function warehouseReducer(state = initialState.zWarehouse, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_SUMMARY_GOOD:{
            return{
                ...state,
                isLoading: true,
            };
        }
        case types.LOAD_SUMMARY_GOOD_SUCCESS:{
            return{
                ...state,
                isLoading: false,
                goods: action.data,
                paginator: action.paginator,
            };
        }
        case types.LOAD_SUMMARY_GOOD_ERROR:{
            return{
                ...state,
                isLoading: false,
            };
        }
        case types.BEGIN_LOAD_HISTORY_GOOD:{
            return{
                ...state,
                isLoadingHistory: true,
            };
        }
        case types.LOAD_HISTORY_GOOD_SUCCESS:{
            return{
                ...state,
                isLoadingHistory: false,
                historyGood: action.data,
                historyPaginator: action.paginator,
            };
        }
        case types.LOAD_HISTORY_GOOD_ERROR:{
            return{
                ...state,
                isLoadingHistory: false,
            };
        }
        default:
            return state;
    }
}
