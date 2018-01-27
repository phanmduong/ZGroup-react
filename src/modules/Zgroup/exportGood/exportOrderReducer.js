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
        default:
            return state;
    }
}
