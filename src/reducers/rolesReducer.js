import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function rolesReducer(state = initialState.roles, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_ROLES_DATA:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    roleListData: action.roleListData
                }
            };
        case types.LOAD_ROLES_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    roleListData: action.roleListData
                }
            };
        case types.LOAD_ROLES_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error
                }
            };
        default:
            return state;
    }
}
