import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function shiftRegistersReducer(state = initialState.shiftRegisters, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_GENS_AND_BASES_SHIFT_REGISTERS:
            return {
                ...state,
                ...{
                    isLoadingGensBases: true,
                    errorGensBases: false
                }
            };
        case types.LOAD_GENS_AND_BASESS_SHIFT_REGISTERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingGensBases: false,
                    errorGensBases: false,
                    bases: action.bases,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_AND_BASES_SHIFT_REGISTERS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGensBases: false,
                    errorGensBases: true
                }
            };
        case types.BEGIN_LOAD_SHIFT_REGISTERS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_SHIFT_REGISTERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    shiftRegisters: action.shiftRegisters
                }
            };
        case types.LOAD_SHIFT_REGISTERS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}
