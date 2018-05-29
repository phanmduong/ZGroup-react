import * as types from './labelManageActionTypes';
import * as labelManageApi from './labelManageApi';
import {showErrorNotification, showNotification, showTypeNotification} from "../../helpers/helper";
import {DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING} from "../../constants/actionTypes";

export function loadAllLabels() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_COURSE_CATEGORIES
        });
        labelManageApi.loadAllLabelsApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_COURSE_CATEGORIES_SUCCESS,
                    categories: res.data.categories
                });
            });
    };
}

export function showEditCategoryModal() {
    return ({
        type: types.TOGGLE_EDIT_CATEGORY_MODAL
    });
}

export function handleEditCategoryModal(category) {
    return ({
        type: types.HANDLE_EDIT_CATEGORY_MODAL,
        category
    });
}

export function saveCategoryModal(category) {
    return function (dispatch) {
        showTypeNotification("Đang lưu thay đổi", "info");
        dispatch({
            type: types.BEGIN_SAVE_CATEGORY_MODAL
        });
        labelManageApi.saveCategoryModal(category)
            .then((res) => {
                if (res.data.status) {
                    showNotification("Cập nhật thay đổi thành công");
                } else {
                    showErrorNotification(res.data.message.message);
                }
                dispatch({
                    type: types.SAVE_CATEGORY_SUCCESS
                });
            });
    };
}

export function deleteCategory(category) {
    return function (dispatch) {
        dispatch({
            type: DISPLAY_GLOBAL_LOADING
        });
        labelManageApi.deleteCategory(category)
            .then(function (res) {
                if (res.data.status) {
                    showNotification("Xóa loại khóa học thành công");
                    dispatch({
                        type: types.DELETE_CATEGORY_SUCCESS,
                        category
                    });
                } else {
                    showErrorNotification(res.data.message);
                }
                dispatch({
                    type: HIDE_GLOBAL_LOADING
                });
            });
    };
}
