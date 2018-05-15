/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let scheduleClasses;
export default function scheduleClassReducer(state = initialState.scheduleClass, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_SCHEDULE_CLASSES:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_SCHEDULE_CLASSES_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    scheduleClasses: action.scheduleClasses
                }
            };
        case types.LOAD_SCHEDULE_CLASSES_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.UPDATE_SCHEDULE_CLASS_FROM:
            return {
                ...state,
                scheduleClass: action.scheduleClass
            };
        case types.BEGIN_ADD_SCHEDULE_CLASS:
            return {
                ...state,
                ...{
                    isSaving: true,
                    errorSave: false
                }
            };
        case types.ADD_SCHEDULE_CLASS_SUCCESS:
            return {
                ...state,
                ...{
                    isSaving: false,
                    errorSave: false,
                    scheduleClasses: [action.scheduleClass, ...state.scheduleClasses]
                }
            };
        case types.ADD_SCHEDULE_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isSaving: false,
                    errorSave: true
                }
            };
        case types.DELETE_SCHEDULE_CLASS_SUCCESS:
            scheduleClasses = deleteScheduleClass(action.scheduleClassId, state.scheduleClasses);
            return {
                ...state,
                ...{
                    scheduleClasses: scheduleClasses
                }
            };
        case types.BEGIN_EDIT_SCHEDULE_CLASS:
            return {
                ...state,
                ...{
                    isEditing: true,
                    errorEdit: false
                }
            };
        case types.EDIT_SCHEDULE_CLASS_SUCCESS:
            scheduleClasses = editScheduleClass(action.scheduleClass, state.scheduleClasses);
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorEdit: false,
                    scheduleClasses: scheduleClasses
                }
            };
        case types.EDIT_SCHEDULE_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorEdit: true
                }
            };
        case types.BEGIN_LOAD_STUDY_SESSION:
            return {
                ...state,
                ...{
                    isLoadingStudySession: true,
                    errorStudySession: false,
                }
            };
        case types.LOAD_STUDY_SESSION_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingStudySession: false,
                    errorStudySession: false,
                    studySessions: action.studySessions
                }
            };
        case types.LOAD_STUDY_SESSION_ERROR:
            return {
                ...state,
                ...{
                    isLoadingStudySession: false,
                    errorStudySession: true,
                }
            };
        default:
            return state;
    }
}


function deleteScheduleClass(scheduleClassId, scheduleClasses) {
    if (scheduleClasses) {
        scheduleClasses = scheduleClasses.filter(scheduleClass => scheduleClass.id !== scheduleClassId);
    }
    return scheduleClasses;
}

function editScheduleClass(scheduleClassData, scheduleClasses) {
    if (scheduleClasses) {
        scheduleClasses = scheduleClasses.map((scheduleClass) => {
            if (scheduleClass.id === scheduleClassData.id)
                return scheduleClassData;
            return scheduleClass;
        });
    }
    return scheduleClasses;
}
