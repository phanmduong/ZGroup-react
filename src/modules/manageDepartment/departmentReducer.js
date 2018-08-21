import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function departmentReducer(state = initialState.department, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_DEPARTMENT:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOAD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: action.data,

                }
            };
        case types.LOAD_DEPARTMENT_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_ADD_DEPARTMENT:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.ADD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.ADD_DEPARTMENT_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_EDIT_DEPARTMENT:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.EDIT_DEPARTMENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.EDIT_DEPARTMENT_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_DELETE_DEPARTMENT:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.DELETE_DEPARTMENT_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        default:
            return state;
    }
}
