import * as types from './sessionActionTypes';
import initialState from "../../reducers/initialState";


export default function sessionReducer(state = initialState.session, action) {
    switch (action.type) {
        case types.LOAD_ALL_SESSIONS_SUCCESS:
            return {
                ...state,
                allSessions: action.allSessions,
            };
        case types.LOAD_SHOWING_SESSION_SUCCESS:
            return {
                ...state,
                showingSession: action.showingSession,
            };
        case types.LOAD_COMING_SESSION_SUCCESS:
            return {
                ...state,
                comingSession: action.comingSession,
            };
        case types.LOAD_DAY_SESSION_SUCCESS:
            return {
                ...state,
                daySession: action.daySession,
            };
        case types.TOGGLE_ADD_EDIT_SESSION_MODAL:
            return {
                ...state,
                addEditSessionModal:!state.addEditSessionModal
            };
        default:
            return state;
    }
}
