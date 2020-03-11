/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function studentReducer(state = initialState.infoStudent, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_STATUSES:
            return {
                ...state,
                ...{
                    isLoadingStatuses: true,
                    isLoadedStatuses: {
                        ...state.isLoadedStatuses,
                        [action.statusRef]:true
                    },
                }
            };
        case types.LOAD_STATUSES_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingStatuses: false,
                    statuses: {
                        ...state.statuses,
                        [action.statusRef]:action.statuses
                    },
                    statusRef: action.statusRef
                }
            };
        case types.LOAD_STATUSES_ERROR:
            return {
                ...state,
                ...{
                    isLoadingStatuses: false,
                }
            };
        case types.SET_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingStudent: false,
                    errorStudent: false,
                    student: action.student
                }
            };
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
                    student: {
                        ...action.student,
                        image_urls: action.student && action.student.image_urls ? JSON.parse(action.student.image_urls) : []
                    }
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
        case types.BEGIN_LOAD_LOGS_INFO_STUDENT:
            return {
                ...state,
                log: {
                    ...state.log,
                    ...{
                        isLoading: true,
                        error: false,
                    }
                }
            };
        case types.LOAD_LOGS_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                log: {
                    ...state.log,
                    ...{
                        isLoading: false,
                        error: false,
                        logs: action.logs,
                        totalPage: action.totalPage
                    }
                }
            };
        case types.LOAD_LOGS_INFO_STUDENT_ERROR:
            return {
                ...state,
                log: {
                    ...state.log,
                    ...{
                        isLoading: false,
                        error: true,
                    }
                }

            };
        case types.BEGIN_LOAD_STUDENT_CARE_HISTORY:
            return {
                ...state,
                historyCare: {
                    ...state.historyCare,
                    ...{
                        isLoading: true,
                        error: false,
                    }
                }
            };
        case types.LOAD_STUDENT_CARE_HISTORY_SUCCESS:
            return {
                ...state,
                historyCare: {
                    ...state.historyCare,
                    ...{
                        isLoading: false,
                        historyCares: action.historyCares,
                    }
                }
            };
        case types.LOAD_STUDENT_CARE_HISTORY_ERROR:
            return {
                ...state,
                historyCare: {
                    ...state.historyCare,
                    ...{
                        isLoading: false,
                        error: true,
                    }
                }

            };
        case types.BEGIN_LOAD_HISTORY_COLLECT_MONEY_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingHistoryCollectMoney: true,
                    errorHistoryCollectMoney: false,
                }
            };
        case types.LOAD_HISTORY_COLLECT_MONEY_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingHistoryCollectMoney: false,
                    errorHistoryCollectMoney: false,
                    historyCollectMoney: action.historyCollectMoney
                }
            };
        case types.LOAD_HISTORY_COLLECT_MONEY_INFO_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingHistoryCollectMoney: false,
                    errorHistoryCollectMoney: true,
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
                    student: {
                        ...action.student,
                        image_urls: action.student && action.student.image_urls ? JSON.parse(action.student.image_urls) : []
                    }

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

        case types.BEGIN_REFUND_STUDENT:
            return {
                ...state,
                ...{
                    isRefunding: true,
                }
            };
        case types.REFUND_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isRefunding: false,
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
        case types.BEGIN_UPLOAD_IMAGE_INFO_STUDENT:
            return {
                ...state,
                ...{
                    isUploadingImage: true,
                }
            };
        case types.UPLOAD_IMAGE_INFO_STUDENT_SUCCESS:
            return {
                ...state,
                ...{
                    isUploadingImage: false,
                    student: {
                        ...state.student,
                        [action.imageField]: action.image_url
                    }
                }
            };
        case types.EDIT_INFO_LEAD_SUCCESS:
            return {
                ...state,
                ...{
                    student: {
                        ...state.student,
                        rate: action.lead.rate
                    }
                }
            };
        default:
            return state;
    }
}
