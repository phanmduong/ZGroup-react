import * as types from './sessionActionTypes';
import * as sessionApi from "./sessionApi";


export function loadAllSessions() {
    return function (dispatch) {
        sessionApi.loadAllSessionsApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_SESSIONS_SUCCESS,
                    allSessions: res.data.data.sessions
                });
            });
    };
}

export function loadShowingSession() {
    return function (dispatch) {
        sessionApi.loadShowingSessionApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_SHOWING_SESSION_SUCCESS,
                    showingSession: res.data.data.films
                });
            });
    };
}

export function loadComingSession() {
    return function (dispatch) {
        sessionApi.loadComingSessionApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_COMING_SESSION_SUCCESS,
                    comingSession: res.data.data.films
                });
            });
    };
}

export function loadDaySession(start_date) {
    return function (dispatch) {
        sessionApi.loadDaySessionApi(start_date)
            .then((res) => {
                dispatch({
                    type: types.LOAD_DAY_SESSION_SUCCESS,
                    daySession: res.data.data.daySession
                });
            });
    };
}

export function toggleSessionModal() {
    return ({
        type: types.TOGGLE_ADD_EDIT_SESSION_MODAL
    });
}