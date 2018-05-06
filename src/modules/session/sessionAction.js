import * as types from './sessionActionTypes';
import * as sessionApi from "./sessionApi";
import * as helper from "../../helpers/helper";


export function loadAllSessions(page, search) {
    return function (dispatch) {
        dispatch({
           type: types.BEGIN_LOAD_ALL_SESSIONS
        });
        sessionApi.loadAllSessionsApi(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_SESSIONS_SUCCESS,
                    allSessions: res.data.sessions,
                    currentPageAll: res.data.paginator.current_page,
                    limitAll: res.data.paginator.limit,
                    totalCountAll: res.data.paginator.total_count,
                    totalPagesAll: res.data.paginator.total_pages,
                });
            });
    };
}

export function loadShowingSession(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SHOWING_SESSION,
        });
        sessionApi.loadShowingSessionApi(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SHOWING_SESSION_SUCCESS,
                    showingSession: res.data.sessions,
                    currentPageShowing: res.data.paginator.current_page,
                    limitShowing: res.data.paginator.limit,
                    totalCountShowing: res.data.paginator.total_count,
                    totalPagesShowing: res.data.paginator.total_pages,
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
        dispatch({
            type: types.BEGIN_LOAD_ALL_FILMS
        });
        sessionApi.loadAllFilmsApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_FILMS_SUCCESS,
                    allFilms: res.data.films
                });
            });
    };
}