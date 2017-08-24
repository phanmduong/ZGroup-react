import * as types from '../../constants/actionTypes';
import * as blogApi from './blogApi';
import * as helper from '../../helpers/helper';
import {BASE_URL} from '../../constants/env';
/*eslint no-console: 0 */
export function uploadImage(file) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_BLOG
        });
        blogApi.uploadImage(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            dispatch(uploadImageBlogSuccess(data.link));
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch(uploadImageBlogFailed());
        });
    };
}

export function uploadImageBlogSuccess(imageUrl) {
    return (
        {
            type: types.UPLOAD_IMAGE_BLOG_SUCCESS,
            imageUrl: imageUrl
        }
    );
}

export function uploadImageBlogFailed() {
    return (
        {
            type: types.UPLOAD_IMAGE_BLOG_FAILED,
        }
    );
}

export function updateFormPost(post) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_FORM_POST,
            post: post
        });
    };
}

export function savePostBlog(post) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_POST_BLOG
        });
        blogApi.savePost(post, 1)
            .then((res) => {
                helper.showNotification("Tải lên thành công");
                dispatch({
                    type: types.SAVE_POST_BLOG_SUCCESS,
                    postId: res.data.data.product.id,
                });
            }).catch(() => {
            helper.showNotification("Tải lên thất bại");
            dispatch({
                type: types.SAVE_POST_BLOG_FAILED
            });
        });
    };
}

export function preSavePostBlog(post) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_PRE_SAVE_POST_BLOG
        });
        blogApi.savePost(post)
            .then((res) => {
                helper.showNotification("Tải lên thành công");
                window.open(BASE_URL + '/blog/post/' + res.data.data.product.id, '_blank');
                dispatch({
                    type: types.PRE_SAVE_POST_BLOG_SUCCESS,
                    postId: res.data.data.product.id
                });
            }).catch(() => {
            helper.showNotification("Tải lên thất bại");
            dispatch({
                type: types.PRE_SAVE_POST_BLOG_FAILED
            });
        });
    };
}

export function loadCategories() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CATEGORIES,
        });
        blogApi.loadCategories()
            .then((res) => {
                dispatch({
                    type: types.LOAD_CATEGORIES_SUCCESS,
                    categories: res.data.categories
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_CATEGORIES_ERROR
                });
            });
    };
}

export function createCategory(category) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_CATEGORY,
        });
        blogApi.createCategory(category)
            .then(() => {
                helper.showNotification('Tạo nhóm bài viết thành công');
                dispatch({
                    type: types.CREATE_CATEGORY_SUCCESS,
                });
                dispatch(loadCategories());
            })
            .catch(() => {
                helper.showNotification('Tạo nhóm bài viết thất bại');
                dispatch({
                    type: types.CREATE_CATEGORY_FAILED
                });
            });
    };
}

export function updateFormCategory(category) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_FORM_CREATE_CATEGORY,
            category: category
        });
    };
}