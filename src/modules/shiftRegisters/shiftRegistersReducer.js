import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let shiftRegisters;
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
        case types.UPDATE_DATA_SHIFT_REGISTER:
            shiftRegisters = state.shiftRegisters;
            shiftRegisters = changeDataRegister(shiftRegisters, action.shift.id, 'user', action.shift.user);
            shiftRegisters = changeDataRegister(shiftRegisters, action.shift.id, 'isLoadingRegister', false);
            shiftRegisters = changeDataRegister(shiftRegisters, action.shift.id, 'isLoadingRegisterError', false);
            shiftRegisters = changeDataRegister(shiftRegisters, action.shift.id, 'isLoadingRemoveRegister', false);
            shiftRegisters = changeDataRegister(shiftRegisters, action.shift.id, 'isLoadingRemoveRegisterError', false);
            return {
                ...state,
                shiftRegisters: shiftRegisters
            };
        case types.POST_SHIFT_REGISTER:
            shiftRegisters = state.shiftRegisters;
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return {
                ...state,
                shiftRegisters: shiftRegisters
            };
        case types.SHIFT_REGISTER_SUCCESSFUL:
            shiftRegisters = state.shiftRegisters;
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return {
                ...state,
                shiftRegisters: shiftRegisters
            };
        case types.SHIFT_REGISTER_ERROR:
            shiftRegisters = state.shiftRegisters;
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRegister', action.isLoadingRegister);
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRegisterError', action.isLoadingRegisterError);
            return {
                ...state,
                shiftRegisters: shiftRegisters
            };
        case types.POST_SHIFT_REMOVE_REGISTER:
            shiftRegisters = state.shiftRegisters;
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRemoveRegister', action.isLoadingRemoveRegister);
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRemoveRegisterError', action.isLoadingRemoveRegisterError);
            return {
                ...state,
                shiftRegisters: shiftRegisters
            };
        case types.SHIFT_REMOVE_REGISTER_SUCCESSFUL:
            shiftRegisters = state.shiftRegisters;
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRemoveRegister', action.isLoadingRemoveRegister);
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRemoveRegisterError', action.isLoadingRemoveRegisterError);
            return {
                ...state,
                shiftRegisters: shiftRegisters
            };
        case types.SHIFT_REMOVE_REGISTER_ERROR:
            shiftRegisters = state.shiftRegisters;
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRemoveRegister', action.isLoadingRemoveRegister);
            shiftRegisters = changeDataRegister(shiftRegisters, action.registerId, 'isLoadingRemoveRegisterError', action.isLoadingRemoveRegisterError);
            return {
                ...state,
                shiftRegisters: shiftRegisters
            };
        default:
            return state;
    }
}

function changeDataRegister(shiftRegistersData, shiftRegisterId, nameObject, dataObject) {
    try {
        if (shiftRegistersData) {
            shiftRegistersData = shiftRegistersData.map((week) => {
                let dates = week.dates.map((date) => {
                    let shifts = date.shifts.map((shift) => {
                        if (shift.id === shiftRegisterId) {
                            return {...shift, [nameObject]: dataObject};
                        }
                        return shift;
                    });
                    return {...date, shifts: shifts};
                });
                return {...week, dates: dates};
            });
        }
    }
    catch (err) {
        //eslint-disable-next-line
        console.log('changeDataRegister error');
    }
    return shiftRegistersData;
}
