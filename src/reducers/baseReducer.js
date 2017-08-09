/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function baseReducer(state = initialState.base, action) {
    switch (action.type){
        case types.BEGIN_DATA_BASE_LOAD:
            return Object.assign({},state,{
                isLoading: action.isLoading,
                error: action.error,
            });
        case types.LOAD_DATA_BASE_SUCCESSFUL:
            return Object.assign({},state,{
                isLoading: action.isLoading,
                error: action.error,
                baseData: action.baseData
            });
        case types.LOAD_DATA_BASE_ERROR:
            return Object.assign({},state,{
                isLoading: action.isLoading,
                error: action.error
            });
        case types.SELECTED_BASE_ID:
            return Object.assign({},state,{
                selectedBaseId: action.selectedBaseId
            });
        default:
            return state;
    }

}