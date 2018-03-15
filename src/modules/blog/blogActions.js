import * as types from "../../constants/actionTypes";
import * as blogApi from "./blogApi";
import * as helper from "../../helpers/helper";
import { BASE_URL } from "../../constants/env";

/*eslint no-console: 0 */
export function uploadImage(file) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_BLOG,
        });
        blogApi.uploadImage(
            file,
            function(event) {
                let data = JSON.parse(event.currentTarget.response);
                dispatch(uploadImageBlogSuccess(data.link));
            },
            () => {
                helper.showErrorNotification("Đăng ảnh thất bại.");
                dispatch(uploadImageBlogFailed());
            },
        );
    };
}

export function uploadImageBlogSuccess(imageUrl) {
    return {
        type: types.UPLOAD_IMAGE_BLOG_SUCCESS,
        imageUrl: imageUrl,
    };
}

export function uploadImageBlogFailed() {
    return {
        type: types.UPLOAD_IMAGE_BLOG_FAILED,
    };
}

export function updateFormPost(post) {
    return function(dispatch) {
        dispatch({
            type: types.UPDATE_FORM_POST,
            post: post,
        });
    };
}

export function savePostBlog(post, closeModal) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_POST_BLOG,
        });
        blogApi
            .savePost(post, 1)
            .then(res => {
                helper.showNotification("Tải lên thành công");
                dispatch({
                    type: types.SAVE_POST_BLOG_SUCCESS,
                    postId: res.data.data.product.id,
                });
                closeModal();
                dispatch(getPosts(1, "", 0));
            })
            .catch(() => {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.SAVE_POST_BLOG_FAILED,
                });
            });
    };
}

export function preSavePostBlog(post, preview = false) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_PRE_SAVE_POST_BLOG,
        });
        blogApi
            .savePost(post)
            .then(res => {
                helper.showNotification("Tải lên thành công");
                if (preview) {
                    window.open(
                        BASE_URL + "/" + res.data.data.product.slug,
                        "_blank",
                    );
                }

                dispatch({
                    type: types.PRE_SAVE_POST_BLOG_SUCCESS,
                    postId: res.data.data.product.id,
                });
                dispatch(getPosts(1, "", 0));
            })
            .catch(() => {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.PRE_SAVE_POST_BLOG_FAILED,
                });
            });
    };
}

export function loadCategories() {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CATEGORIES,
        });
        blogApi
            .loadCategories()
            .then(res => {
                dispatch({
                    type: types.LOAD_CATEGORIES_SUCCESS,
                    categories: res.data.categories,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_CATEGORIES_ERROR,
                });
            });
    };
}

export function createCategory(category) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_CATEGORY,
        });
        blogApi
            .createCategory(category)
            .then(() => {
                helper.showNotification("Tạo nhóm bài viết thành công");
                dispatch({
                    type: types.CREATE_CATEGORY_SUCCESS,
                });
                dispatch(loadCategories());
            })
            .catch(() => {
                helper.showNotification("Tạo nhóm bài viết thất bại");
                dispatch({
                    type: types.CREATE_CATEGORY_FAILED,
                });
            });
    };
}

export function updateFormCategory(category) {
    return function(dispatch) {
        dispatch({
            type: types.UPDATE_FORM_CREATE_CATEGORY,
            category: category,
        });
    };
}

export function getPosts(page, search, category_id) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_POSTS_BLOG,
        });
        blogApi
            .getPosts(page, search, category_id)
            .then(res => {
                dispatch({
                    type: types.LOAD_POSTS_BLOG_SUCCESS,
                    posts: res.data.posts,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_POSTS_BLOG_ERROR,
                });
            });
    };
}
export function getCategories() {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CATEGORIES_IN_BLOG,
        });
        blogApi
            .getCategoriesApi()
            .then(res => {
                dispatch({
                    type: types.LOAD_CATEGORIES_IN_BLOG_SUCCESS,
                    categoriesList: res.data.data.categories,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_CATEGORIES_IN_BLOG_ERROR,
                });
            });
    };
}

export function deletePost(postId) {
    return function(dispatch) {
        helper.showTypeNotification("Đang xóa bài viết", "info");
        blogApi
            .deletePost(postId)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification(res.data.data.message);
                    dispatch({
                        type: types.DELETE_POST_BLOG_SUCCESS,
                        postId: postId,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra");
            });
    };
}

export function getPost(postId) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_POST_BLOG,
        });
        blogApi
            .getPost(postId)
            .then(res => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.LOAD_POST_BLOG_SUCCESS,
                        post: {
                            ...res.data.data.post,
                            category: res.data.data.post.category_id,
                            imageUrl: res.data.data.post.url,
                        },
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.LOAD_POST_BLOG_ERROR,
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.LOAD_POST_BLOG_ERROR,
                });
            });
    };
}

export function resetForm() {
    return {
        type: types.RESET_FORM_POST_BLOG,
    };
}

export function changeStatus(id, status, name) {
    return function(dispatch) {
        dispatch({
            type: types.CHANGE_STATUS_IN_BLOG,
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
