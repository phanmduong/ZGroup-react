import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function historyDebtReducer(state = initialState.historyDebt, action) {
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

        default:
            return state;
    }
}