import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let shiftSessions;
export default function shiftSessionsReducer(state = initialState.shiftSessions, action) {

    switch (action.type) {

        case types.BEGIN_LOAD_SHIFT_SESSIONS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_SHIFT_SESSIONS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    shiftSessions: action.shiftSessions
                }
            };
        case types.LOAD_SHIFT_SESSIONS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_STORE_SHIFT_SESSION:
            return {
                ...state,
                ...{
                    isStoring: true,
                    errorStore: false,
                }
            };
        case types.STORE_SHIFT_SESSION_SUCCESS:
            if (action.edit) {
                shiftSessions = changeShiftSessions(action.shiftSession, state.shiftSessions);
            } else {
                shiftSessions = [...state.shiftSessions, action.shiftSession];
            }
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: false,
                    shiftSessions: shiftSessions,
                }
            };
        case types.STORE_SHIFT_SESSION_ERROR:
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: true
                }
            };
        case types.DELETE_SHIFT_SESSION_SUCCESS: {
            return {
                ...state,
                shiftSessions: deleteShiftSession(action.shiftSessionId, state.shiftSessions)
            };
        }
        default:
            return state;
    }
}

function changeShiftSessions(shiftSessionData, shiftSessions) {
    if (shiftSessions) {
        shiftSessions = shiftSessions.map((shiftSessionItem) => {
            if (shiftSessionItem.id === shiftSessionData.id) {
                return shiftSessionData;
            }
            return shiftSessionItem;
        });
    }
    return shiftSessions;
}

function deleteShiftSession(shiftSessionId, shiftSessions) {
    if (shiftSessions) {
        shiftSessions = shiftSessions.filter(shiftSession => shiftSession.id !== shiftSessionId);
    }
    return shiftSessions;
}