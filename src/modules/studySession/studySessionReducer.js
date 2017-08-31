/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let studySessions;
export default function studySessionReducer(state = initialState.studySession, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_STUDY_SESSION:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_STUDY_SESSION_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    studySessions: action.studySessions
                }
            };
        case types.LOAD_STUDY_SESSION_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.UPDATE_STUDY_SESSION_FROM:
            return {
                ...state,
                studySession: action.studySession
            };
        case types.BEGIN_ADD_STUDY_SESSION:
            return {
                ...state,
                ...{
                    isSaving: true,
                    errorSave: false
                }
            };
        case types.ADD_STUDY_SESSION_SUCCESS:
            return {
                ...state,
                ...{
                    isSaving: false,
                    errorSave: false,
                    studySessions: [action.studySession, ...state.studySessions]
                }
            };
        case types.ADD_STUDY_SESSION_ERROR:
            return {
                ...state,
                ...{
                    isSaving: false,
                    errorSave: true
                }
            };
        case types.DELETE_STUDY_SESSION_SUCCESS:
            studySessions = deleteStudySession(action.studySessionId, state.studySessions);
            return {
                ...state,
                ...{
                    studySessions: studySessions
                }
            };
        case types.BEGIN_EDIT_STUDY_SESSION:
            return {
                ...state,
                ...{
                    isEditing: true,
                    errorEdit: false
                }
            };
        case types.EDIT_STUDY_SESSION_SUCCESS:
            studySessions = editStudySession(action.studySession, state.studySessions);
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorEdit: false,
                    studySessions: studySessions
                }
            };
        case types.EDIT_STUDY_SESSION_ERROR:
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorEdit: true
                }
            };
        default:
            return state;
    }
}


function deleteStudySession(studySessionId, studySessions) {
    if (studySessions) {
        studySessions = studySessions.filter(studySession => studySession.id !== studySessionId);
    }
    return studySessions;
}

function editStudySession(studySessionData, studySessions) {
    if (studySessions) {
        studySessions = studySessions.map((studySession) => {
            if (studySession.id === studySessionData.id)
                return studySessionData;
            return studySession;
        });
    }
    return studySessions;
}
