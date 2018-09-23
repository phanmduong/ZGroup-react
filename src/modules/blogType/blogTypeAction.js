import * as types from './blogTypeActionTypes';
import * as blogTypeApi from "./blogTypeApi";
import * as helper from "../../helpers/helper";

export function showBlogTypeModal() {
    return ({
        type: types.TOGGLE_ADD_EDIT_BLOG_TYPE_MODAL
    });
}

export function loadAllBlogType(page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BLOG_TYPE
        });
        blogTypeApi.loadAllBlogTypeApi(page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_BLOG_TYPE_SUCCESS,
                    blogTypes: res.data.product_categories,
                    currentPage: res.data.paginator.current_page,
                    limit: res.data.paginator.limit,
                    totalCount: res.data.paginator.total_count,
                    totalPages: res.data.paginator.total_pages
                });
            });
    };

}

export function handleBlogTypeModal(blogType) {
    return ({
        type: types.HANDLE_BLOG_TYPE_MODAL,
        blogType
    });
}

//saveBlogTypeApi

export function saveBlogType(blogType) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_BLOG_TYPE
        });

        blogTypeApi.saveBlogTypeApi(blogType)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Thêm loại bài viết thành công");
                    dispatch({
                        type: types.SAVE_BLOG_TYPE_SUCCESS,
                        blogType

                    });
                } else {
                    helper.showNotification(res.data.message);
                }
            });
    };
}

export function editBlogType(blogType) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_BLOG_TYPE
        });
        blogTypeApi.editBlogTypeApi(blogType)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Chỉnh sửa loại bài viết thành công");
                    dispatch({
                        type: types.EDIT_BLOG_TYPE_SUCCESS,
                        blogType
                    });
                } else {
                    helper.showNotification(res.data.message);
                }
            });
    };
}

// deleteblogType
export function deleteblogType(blogType) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        blogTypeApi.delBlogTypeApi(blogType)
            .then(function (res) {
                if (res.data.status) {
                    helper.showNotification("Xóa loại bài viết thành công");
                    dispatch({
                        type: types.DELETE_BLOG_TYPE_SUCCESS,
                        blogType
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