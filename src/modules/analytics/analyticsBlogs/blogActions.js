import types from "./actionTypes";
import * as blogApi from "./blogApi";
import * as helper from "../../../helpers/helper";

// import { BASE_URL } from "../../../constants/env";


export function loadPosts(page, query, category_id, kind) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_POSTS,
        });
        blogApi
            .loadPostsApis(page, query, category_id, kind)
            .then(res => {
                dispatch({
                    type: types.LOADED_POSTS_SUCCESS,
                    posts: res.data.posts,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_POSTS_ERROR,
                });
            });
    };
}

export function loadCategories() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CATEGORIES,
        });
        blogApi
            .loadCategoriesApi()
            .then(res => {
                if (res.data.status) {
                    dispatch({
                        type: types.LOADED_CATEGORIES_SUCCESS,
                        categories: res.data.data.categories,
                    });
                } else {
                    dispatch({
                        type: types.LOADED_CATEGORIES_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_CATEGORIES_ERROR,
                });
            });
    };
}

export function changeStatus(id, status, name) {
    return function (dispatch) {
        dispatch({
            type: types.CHANGE_STATUS,
            id,
            status,
        });
        blogApi.changeStatusApi(id).then(res => {
            if (res.data.status) {
                status
                    ? helper.showNotification("Đã ẩn " + name)
                    : helper.showNotification("Đã hiển thị " + name);
            }
        });
    };
}


export function loadLanguages() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_LANGUAGES,
        });
        blogApi
            .loadLanguagesApi()
            .then(res => {
                if (res.data.status) {
                    dispatch({
                        type: types.LOADED_LANGUAGES_SUCCESS,
                        languages: res.data.data.languages,
                    });
                } else {
                    dispatch({
                        type: types.LOADED_LANGUAGES_ERROR,
                    });
                    helper.showErrorNotification(res.data.message);
                }
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_LANGUAGES_ERROR,
                });
                helper.showErrorNotification("Lỗi đường truyền");
            });
    };
}

export function loadFacebookStatistic(data) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_FACEBOOK_STATISTIC,
        });
        blogApi.loadFacebookStatistic(data)
            .then(res => {
                let fb = [];
                for(let i = 0; i < data.length; i++){
                    let fbInfo = res.data[data[i]];

                    fb.push({
                       like:fbInfo['og_object'].likes.summary.total_count,
                        share:fbInfo.share.share_count,
                    });
                }
                dispatch({
                    type: types.LOADED_FACEBOOK_STATISTIC_SUCCESS,
                    facebookStatistic: fb,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_FACEBOOK_STATISTIC_ERROR,
                });
                helper.showErrorNotification("Lỗi facebook!");
            });
    };
}

