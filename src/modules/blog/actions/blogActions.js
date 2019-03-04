import types from "../constants/actionTypes";
import * as blogApi from "../apis/blogApi";
import * as helper from "../../../helpers/helper";
import { BASE_URL } from "../../../constants/env";

// export function resetForm() {
//     return {
//         type: types.RESET_FORM_POST_BLOG,
//     };
// }
//


export function loadFacebookStatistic(data) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_FACEBOOK_STATISTIC,
        });
        blogApi.loadFacebookStatistic(data)
            .then(res => {
                let fb = [];
                for (let i = 0; i < data.length; i++) {
                    let fbInfo = res.data[data[i].url];

                    fb.push({
                        like: fbInfo.engagement.reaction_count,
                        comment: fbInfo.engagement.comment_count,
                        share: fbInfo.engagement.share_count,

                        lead: data[i].lead,
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



export function loadPosts(page, query, category_id, kind) {
    return function(dispatch) {
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
    return function(dispatch) {
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
    return function(dispatch) {
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

export function openCreatePostModal() {
    return function(dispatch) {
        dispatch({
            type: types.OPEN_POST_MODAL,
            postId: 0,
        });
    };
}
export function openEditPostModal(postId) {
    return function(dispatch) {
        dispatch({
            type: types.OPEN_POST_MODAL,
            postId: postId,
        });
        dispatch(loadPost(postId));
    };
}

export function closePostModal() {
    return function(dispatch) {
        dispatch({
            type: types.CLOSE_POST_MODAL,
        });
    };
}

export function loadPost(postId) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_POST,
        });
        blogApi.getPostApi(postId).then(res => {
            if (res.data.status) {
                dispatch({
                    type: types.LOAD_POST_SUCCESS,
                    post: {
                        ...res.data.data.post,
                        // category: res.data.data.post.category_id,

                        imageUrl: res.data.data.post.url,
                    },
                });
            } else {
                helper.showErrorNotification(res.data.message);
                dispatch({
                    type: types.LOAD_POST_ERROR,
                });
            }
        });
    };
}

export function deletePost(postId) {
    return function(dispatch) {
        helper.showTypeNotification("Đang xóa bài viết", "info");
        blogApi
            .deletePostApi(postId)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification(res.data.data.message);
                    dispatch({
                        type: types.DELETE_POST_SUCCESS,
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
export function loadLanguages() {
    return function(dispatch) {
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
export function uploadImage(file) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE,
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
        type: types.UPLOAD_IMAGE_SUCCESS,
        imageUrl: imageUrl,
    };
}

export function uploadImageBlogFailed() {
    return {
        type: types.UPLOAD_IMAGE_ERROR,
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
            type: types.BEGIN_SAVE_POST,
        });
        blogApi
            .savePost(post, 1)
            .then(res => {
                helper.showNotification("Tải lên thành công");
                dispatch({
                    type: types.SAVE_POST_SUCCESS,
                    postId: res.data.data.product.id,
                });
                closeModal();
                dispatch(loadPosts(1, "", 0, ""));
            })
            .catch(() => {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.SAVE_POST_ERROR,
                });
            });
    };
}

export function preSavePostBlog(post, preview = false) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_PRE_SAVE_POST,
        });
        blogApi
            .savePost(post)
            .then(res => {
                helper.showNotification("Tải lên thành công");
                if (preview) {
                    window.open(BASE_URL + "/" + res.data.data.product.slug, "_blank");
                }

                dispatch({
                    type: types.PRE_SAVE_POST_SUCCESS,
                    postId: res.data.data.product.id,
                });
                dispatch(loadPosts(1, "", 0, ""));
            })
            .catch(() => {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.PRE_SAVE_POST_ERROR,
                });
            });
    };
}

export function updateFormLanguage(language) {
    return function(dispatch) {
        dispatch({
            type: types.UPDATE_FORM_CREATE_LANGUAGE,
            language: language,
        });
    };
}

export function openAddLanguageModal() {
    return function(dispatch) {
        dispatch({
            type: types.OPEN_ADD_LANGUAGE_MODAL,
        });
    };
}
export function closeAddLanguageModal() {
    return function(dispatch) {
        dispatch({
            type: types.CLOSE_ADD_LANGUAGE_MODAL,
        });
    };
}
export function openAddCategoryModal() {
    return function(dispatch) {
        dispatch({
            type: types.OPEN_ADD_CATEGORY_MODAL,
        });
    };
}

export function closeAddCategoryModal() {
    return function(dispatch) {
        dispatch({
            type: types.CLOSE_ADD_CATEGORY_MODAL,
        });
    };
}
export function createCategory(category, closeAddLanguageModal) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_CATEGORY,
        });
        blogApi
            .createCategory(category)
            .then(res => {
                helper.showNotification("Tạo nhóm bài viết thành công");
                dispatch({
                    type: types.CREATE_CATEGORY_SUCCESS,
                    category: res.data.data.category,
                });
                closeAddLanguageModal();
            })
            .catch(() => {
                helper.showNotification("Tạo nhóm bài viết thất bại");
                dispatch({
                    type: types.CREATE_CATEGORY_ERROR,
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
