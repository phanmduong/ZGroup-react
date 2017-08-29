/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let registers;
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
        case types.BEGIN_LOAD_HISTORY_CALL_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingHistoryCall: true,
                    errorHistoryCall: false,
                }
            };
        case types.LOAD_HISTORY_CALL_STUDENT_SUCCESS:
            registers = changeCallStatus(action.registerId, state.registers, 'calling');
            return {
                ...state,
                ...{
                    isLoadingHistoryCall: false,
                    errorHistoryCall: false,
                    historyCall: action.historyCall,
                    registers: registers,
                    telecallId: action.telecallId
                }
            };
        case types.LOAD_HISTORY_CALL_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingHistoryCall: false,
                    errorHistoryCall: true,
                }
            };
        case types.BEGIN_CHANGE_CALL_STATUS_STUDENT:
            return {
                ...state,
                ...{
                    isChangingStatus: true,
                    errorChangeStatus: false
                }
            };
        case types.CHANGE_CALL_STATUS_STUDENT_SUCCESS:
            registers = changeCallStatusStudent(action.studentId, state.registers, action.callStatus);
            return {
                ...state,
                ...{
                    isChangingStatus: false,
                    errorChangeStatus: false,
                    registers: registers,
                }
            };
        case types.CHANGE_CALL_STATUS_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isChangingStatus: false,
                    errorChangeStatus: true
                }
            };
        case types.DELETE_REGISTER_STUDENT_SUCCESS:
            registers = deleteRegister(action.registerId, state.registers);
            return {
                ...state,
                registers: registers
            }
        default:
            return state;
    }

}

function changeCallStatus(registerId, registers, callStatus) {
    if (registers) {
        registers = registers.map(register => {
                if (register.id === registerId) {
                    return {
                        ...register,
                        call_status: callStatus
                    };
                }
                return register;
            }
        );
    }
    return registers;
}

function changeCallStatusStudent(studentId, registers, callStatus) {
    if (registers) {
        registers = registers.map(register => {
                if (register.student_id === studentId) {
                    return {
                        ...register,
                        call_status: callStatus
                    };
                }
                return register;
            }
        );
    }
    return registers;
}

function deleteRegister(registerId, registers) {
    if (registers) {
        registers = registers.filter(register=> register.id !== registerId);
    }
    return registers;
}
