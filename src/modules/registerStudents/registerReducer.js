/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let registers;
export default function registerReducer(state = initialState.registerStudents, action) {
    switch (action.type) {

        case types.BEGIN_CHANGE_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isCommittingInfoStudent: true,
                }
            };
        case types.CHANGE_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isCommittingInfoStudent: false,
                }
            };
        case types.CHANGE_INFO_STUDENT_ERROR: {
            return {
                ...state,
                ...{
                    isCommittingInfoStudent: false,
                }
            };
        }
        case types.BEGIN_LOAD_DATA_EXCEL_REGISTER_LIST:
            return {
                ...state,
                ...{
                    isLoadingExcel: true,
                }
            };
        case types.LOAD_DATA_EXCEL_REGISTER_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingExcel: false,
                    excel: action.excel
                }
            };
        case types.LOAD_DATA_EXCEL_REGISTER_LIST_ERROR:
            return {
                ...state,
                ...{
                    isLoadingExcel: false,
                }
            };
        case types.BEGIN_LOAD_CLASS_FILTER:
            return {
                ...state,
                ...{
                    isLoadingClassFilter: true,
                }
            };
        case types.LOAD_CLASS_FILTER_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingClassFilter: false,
                    classFilter: action.filter
                }
            };
        case types.LOAD_CLASS_FILTER_ERROR:
            return {
                ...state,
                ...{
                    isLoadingClassFilter: false,
                }
            };
        case types.BEGIN_LOAD_SALER_FILTER:
            return {
                ...state,
                ...{
                    isLoadingSalerFilter: true,
                }
            };
        case types.LOAD_SALER_FILTER_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingSalerFilter: false,
                    salerFilter: action.filter
                }
            };
        case types.LOAD_SALER_FILTER_ERROR:
            return {
                ...state,
                ...{
                    isLoadingSalerFilter: false,
                }
            };
        case types.BEGIN_LOAD_CAMPAIGN_FILTER:
            return {
                ...state,
                ...{
                    isLoadingCampaignFilter: true,
                }
            };
        case types.LOAD_CAMPAIGN_FILTER_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingCampaignFilter: false,
                    campaignFilter: action.filter
                }
            };
        case types.LOAD_CAMPAIGN_FILTER_ERROR:
            return {
                ...state,
                ...{
                    isLoadingCampaignFilter: false,
                }
            };
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
                    genId: action.genId
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
                    currentGen: action.currentGen,
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
            registers = changeCallStatusStudent(action.registerId, state.registers, action.callStatus, action.saler);
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
            };
        case types.BEGIN_LOAD_CLASSES_REGISTER_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingClasses: true,
                    errorClasses: false,
                }
            };
        case types.LOAD_CLASSES_REGISTER_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingClasses: false,
                    errorClasses: false,
                    classes: action.classes,
                }
            };
        case types.LOAD_CLASSES_REGISTER_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingClasses: false,
                    errorClasses: true,
                }
            };
        case types.BEGIN_CONFIRM_CHANGE_CLASS_REGISTER_STUDENT:
            return {
                ...state,
                ...{
                    isChangingClass: true,
                    errorChangeClass: false,
                }
            };
        case types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_SUCCESS:
            registers = changeClassRegister(action.registerId, action.class, state.registers);
            return {
                ...state,
                ...{
                    isChangingClass: false,
                    errorChangeClass: false,
                    registers: registers,
                }
            };
        case types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isChangingClass: false,
                    errorChangeClass: true,
                }
            };
        case types.BEGIN_LOAD_REGISTERS_BY_STUDENT_REGISTER_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingRegistersByStudent: true,
                    errorRegistersByStudent: false,
                }
            };
        case types.LOAD_REGISTERS_BY_STUDENT_REGISTER_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingRegistersByStudent: false,
                    errorRegistersByStudent: false,
                    registersByStudent: action.registersByStudent,
                }
            };
        case types.LOAD_REGISTERS_BY_STUDENT_REGISTER_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingRegistersByStudent: true,
                    errorRegistersByStudent: true,
                }
            };
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

function changeClassRegister(registerId, classData, registers) {
    if (registers) {
        registers = registers.map(register => {
                if (register.id === registerId) {
                    return {
                        ...register,
                        class: classData
                    };
                }
                return register;
            }
        );
    }
    return registers;
}

function changeCallStatusStudent(registerId, registers, callStatus, saler) {
    if (registers) {
        registers = registers.map(register => {
                if (register.id === registerId) {
                    if (saler) {
                        return {
                            ...register,
                            call_status: callStatus,
                            saler: saler
                        };
                    } else {
                        return {
                            ...register,
                            call_status: callStatus,
                        };
                    }
                }
                return register;
            }
        );
    }
    return registers;
}

function deleteRegister(registerId, registers) {
    if (registers) {
        registers = registers.filter(register => register.id !== registerId);
    }
    return registers;
}
