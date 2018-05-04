import * as types from './filmActionTypes';
import * as filmApi from "./filmApi";
import * as helper from "../../helpers/helper";


export function loadAllFilms() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_FILMS
        });
        filmApi.loadAllFilmsApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_FILMS_SUCCESS,
                    allFilms: res.data.data.films
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
        filmApi.editStatusApi(id, status)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.EDIT_STATUS_SUCCESS,
                        id,status
                    });
                    if(status==0){helper.showNotification("Chuyển thành film chưa sử dụng thành công");}
                    if(status==2){helper.showNotification("Chuyển thành film sắp chiếu thành công");}
                } else helper.showErrorNotification(res.data.message);

            })
            .catch(()=>{
                helper.showErrorNotification("Lỗi sever");
            })
        ;
    };
}