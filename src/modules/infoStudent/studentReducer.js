/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function studySessionReducer(state = initialState.infoStudent, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingStudent: true,
                    errorStudent: false,
                }
            };
        case types.LOAD_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingStudent: false,
                    errorStudent: false,
                    student: action.student
                }
            };
        case types.LOAD_INFO_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingStudent: false,
                    errorStudent: true,
                }
            };
        case types.BEGIN_LOAD_REGISTERS_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingRegisters: true,
                    errorRegisters: false,
                }
            };
        case types.LOAD_REGISTERS_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingRegisters: false,
                    errorRegisters: false,
                    registers: action.registers
                }
            };
        case types.LOAD_REGISTERS_INFO_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingHistoryCalls: false,
                    errorHistoryCalls: true,
                }
            };
        case types.BEGIN_LOAD_HISTORY_CALLS_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingHistoryCalls: true,
                    errorHistoryCalls: false,
                }
            };
        case types.LOAD_HISTORY_CALLS_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingHistoryCalls: false,
                    errorHistoryCalls: false,
                    historyCalls: action.historyCalls
                }
            };
        case types.LOAD_HISTORY_CALLS_INFO_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingHistoryCalls: false,
                    errorHistoryCalls: true,
                }
            };
        case types.BEGIN_LOAD_PROGRESS_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingProgress: true,
                    errorProgress: false,
                }
            };
        case types.LOAD_PROGRESS_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingProgress: false,
                    errorProgress: false,
                    progress: action.progress
                }
            };
        case types.LOAD_PROGRESS_INFO_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingProgress: false,
                    errorProgress: true,
                }
            };
        case types.BEGIN_LOAD_EDIT_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isEditingStudent: true,
                    errorEditing: false,
                }
            };
        case types.LOAD_EDIT_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isEditingStudent: false,
                    errorEditing: false,
                    student: action.student
                }
            };
        case types.LOAD_EDIT_INFO_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isEditingStudent: false,
                    errorEditing: true,
                }
            };
        case types.BEGIN_CHANGE_PASSWORD_STUDENT:
            return {
                ...state,
                ...{
                    isChangingPassword: true,
                    errorChangePassword: false
                }
            };
        case types.CHANGE_PASSWORD_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isChangingPassword: false,
                    errorChangePassword: false
                }
            };
        case types.CHANGE_PASSWORD_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isChangingPassword: false,
                    errorChangePassword: true,
                }
            };
        case types.BEGIN_CHANGE_CALL_STATUS_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isChangingStatusCall: true,
                    errorChangeStatusCall: false
                }
            };
        case types.CHANGE_CALL_STATUS_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    historyCalls: [...state.historyCalls, action.historyCall],
                    isChangingStatusCall: false,
                    errorChangeStatusCall: false,
                }
            };
        case types.CHANGE_CALL_STATUS_INFO_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isChangingStatusCall: false,
                    errorChangeStatusCall: true,
                }
            };
        default:
            return state;
    }
}
