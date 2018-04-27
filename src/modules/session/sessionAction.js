import * as types from './sessionActionTypes';
import * as sessionApi from "./sessionApi";
import * as helper from "../../helpers/helper";


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

export function saveSession(session) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_SESSION
        });

        sessionApi.saveSessionApi(session)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Thêm suất chiếu thành công");
                    dispatch({
                        type: types.SAVE_SESSION_SUCCESS,
                        session

                    });
                } else {
                    helper.showNotification(res.data.message);
                    dispatch({
                        type: types.EDIT_FILM_ERROR,
                    });
                }
            })
            .catch(()=>{
                helper.showErrorNotification("Lỗi sever");
                dispatch({
                    type: types.EDIT_FILM_ERROR,
                });
            });
    };
}


export function handleSessionModal(session) {
    return({
        type: types.HANDLE_SESSION_MODAL,
        session
    });
}

export function editSession(session) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_SESSION
        });

        sessionApi.editSessionApi(session)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Sửa suất chiếu thành công");
                    dispatch({
                        type: types.EDIT_SESSION_SUCCESS,
                        session

                    });
                } else {
                    helper.showNotification(res.data.message);
                    dispatch({
                        type: types.EDIT_FILM_ERROR,
                    });
                }
            })
            .catch(()=>{
                helper.showErrorNotification("Lỗi sever");
                dispatch({
                    type: types.EDIT_FILM_ERROR,
                });
            });
    };
}
export function deleteSession(session) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        sessionApi.deleteSessionApi(session)
            .then(function (res) {
                if (res.data.status) {
                    helper.showNotification("Xóa suất chiếu thành công");
                    dispatch({
                        type: types.DELETE_SESSION_SUCCESS,
                        session
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function loadAllFilms() {
    return function (dispatch) {
        sessionApi.loadAllFilmsApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_FILMS_SUCCESS,
                    allFilms: res.data.data.films
                });
            });
    };
}