import * as types from './filmActionTypes';
import * as filmApi from "./filmApi";
import * as helper from "../../helpers/helper";
import {browserHistory} from "react-router";


export function loadAllFilms(value) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_FILMS
        });
        filmApi.loadAllFilmsApi(value)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_FILMS_SUCCESS,
                    allFilms: res.data.films
                });
            });
    };
}
export function loadAllFilmsHavePagination(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_FILMS
        });
        filmApi.loadAllFilmsHavePaginationApi(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_FILMS_HAVE_PAGINATION_SUCCESS,
                    allFilms: res.data.films,
                    currentPage: res.data.paginator.current_page,
                    limit: res.data.paginator.limit,
                    totalCount: res.data.paginator.total_count,
                    totalPages: res.data.paginator.total_pages,
                });
            });
    };
}
export function showAddEditFilmModal() {
    return ({
        type: types.SHOW_ADD_EDIT_FILM_MODAL
    });
}
export function deleteFilm(film) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        filmApi.deleteFilmApi(film.id)
            .then(function (res) {
                if (res.data.status) {
                    helper.showNotification("Xóa film thành công");
                    dispatch({
                        type: types.DELETE_FILM_SUCCESS,
                        film
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
export function saveFilm(film) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_FILM
        });

        filmApi.postFilmApi(film)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Thêm film thành công");
                    dispatch({
                        type: types.SAVE_FILM_SUCCESS,
                        film

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
export function handleAvatarWebsiteTab(image) {
    return ({
        type: types.HANDLE_AVATAR_WEBSITE_TAB_FILM,
        image
    });
}
export function handleAvatarWebsiteTab2(image) {
    return ({
        type: types.HANDLE_AVATAR_WEBSITE_TAB_FILM2,
        image
    });
}
export function handleFilmModal(film) {
    return({
       type: types.HANDLE_FILM_MODAL,
        film
    });
}
export function editFilm(film) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_FILM
        });
        filmApi.editFilmApi(film)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Chỉnh sửa film thành công");
                    dispatch({
                        type: types.EDIT_FILM_SUCCESS,
                        film
                    });
                } else {
                    helper.showErrorNotification(res.data.message.message);
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
            })
        ;
    };
}
export function editStatus(id , status) {
    return function (dispatch) {
        dispatch({
            type: types.EDIT_STATUS_SUCCESS,
            id,status
        });
        filmApi.editStatusApi(id, status)
            .then((res) => {
                if (res.data.status) {

                    if(status==0){helper.showNotification("Chuyển thành film chưa sử dụng thành công");}
                    if(status==2){helper.showNotification("Chuyển thành film sắp chiếu thành công");}
                } else helper.showErrorNotification(res.data.message);

            });
    };
}
export function changeFavoriteFilm2(film) {
    return function (dispatch) {
        dispatch({
            type: types.EDIT_FAVORITE_SUCCESS,
            film
        });
        filmApi.changeFavoriteFilmApi(film)
            .then((res) => {
                if (res.data.status) {
                    if(film.is_favorite==1){helper.showNotification("Xoá bỏ film yêu thích thành công");}
                    if(film.is_favorite==0){helper.showNotification("Chuyển thành film yêu thích thành công");}
                } else helper.showErrorNotification(res.data.message);

            });
    };
}
export function handleImagesWebsiteTab(images_url){
    return ({
        type: types.HANDLE_IMAGES_WEBSITE_FILM,
        images_url
    });
}




export function loadAllSessions(page, search, from_date, to_date) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_SESSIONS
        });
        filmApi.loadAllSessionsApi(page, search, from_date, to_date)
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
        filmApi.loadShowingSessionApi(page, search)
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

        filmApi.saveSessionApi(session)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Thêm suất chiếu thành công");
                    dispatch({
                        type: types.SAVE_SESSION_SUCCESS,
                        session
                    });
                    browserHistory.push('/film/session/all');
                } else {
                    helper.showNotification(res.data.message);
                    dispatch({
                        type: types.EDIT_SESSION_ERROR,
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

        filmApi.editSessionApi(session)
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
                        type: types.EDIT_SESSION_ERROR,
                    });
                }
            })
            .catch(()=>{
                helper.showErrorNotification("Lỗi sever");
                dispatch({
                    type: types.EDIT_SESSION_ERROR,
                });
            });
    };
}
export function deleteSession(session) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        filmApi.deleteSessionApi(session)
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
export function showAddEditFilmModalAtSession() {
    return ({
        type: types.SHOW_ADD_EDIT_FILM_MODAL_AT_SESSION
    });
}