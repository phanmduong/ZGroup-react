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
        default:
            return state;
    }
}