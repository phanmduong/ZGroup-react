import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let workShiftSessions;
export default function workShiftSessionsReducer(state = initialState.workShiftSessions, action) {

    switch (action.type) {

        case types.BEGIN_LOAD_WORK_SHIFT_SESSIONS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_WORK_SHIFT_SESSIONS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    workShiftSessions: action.workShiftSessions
                }
            };
        case types.LOAD_WORK_SHIFT_SESSIONS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_STORE_WORK_SHIFT_SESSION:
            return {
                ...state,
                ...{
                    isStoring: true,
                    errorStore: false,
                }
            };
        case types.STORE_WORK_SHIFT_SESSION_SUCCESS:
            if (action.edit) {
                workShiftSessions = changeShiftSessions(action.workShiftSession, state.workShiftSessions);
            } else {
                workShiftSessions = [...state.workShiftSessions, action.workShiftSession];
            }
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: false,
                    workShiftSessions: workShiftSessions,
                }
            };
        case types.STORE_WORK_SHIFT_SESSION_ERROR:
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: true
                }
            };
        case types.DELETE_WORK_SHIFT_SESSION_SUCCESS: {
            return {
                ...state,
                workShiftSessions: deleteShiftSession(action.workShiftSessionId, state.workShiftSessions)
            };
        }
        default:
            return state;
    }
}

function changeShiftSessions(workShiftSessionData, workShiftSessions) {
    if (workShiftSessions) {
        workShiftSessions = workShiftSessions.map((workShiftSessionItem) => {
            if (workShiftSessionItem.id === workShiftSessionData.id) {
                return workShiftSessionData;
            }
            return workShiftSessionItem;
        });
    }
    return workShiftSessions;
}

function deleteShiftSession(workShiftSessionId, workShiftSessions) {
    if (workShiftSessions) {
        workShiftSessions = workShiftSessions.filter(workShiftSession => workShiftSession.id !== workShiftSessionId);
    }
    return workShiftSessions;
}