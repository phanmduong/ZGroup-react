/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function registerReducer(state = initialState.registerStudents, action) {
    switch (action.type) {
        case types.BEGIN_DATA_REGISTER_LIST_LOAD:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_DATA_REGISTER_LIST_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    registers: action.registers,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                }
            };
        case types.LOAD_DATA_REGISTER_LIST_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.BEGIN_LOAD_GENS_REGISTER_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                    errorGens: false,
                }
            };
        case types.LOAD_GENS_REGISTER_STUDENT_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: false,
                    gens: action.gens,
                }
            };
        case types.LOAD_GENS_REGISTER_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: true,
                }
            };
        default:
            return state;
    }

}