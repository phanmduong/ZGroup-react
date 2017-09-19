import * as types from '../../constants/actionTypes';
import * as classApi from './classApi';
import * as helper from '../../helpers/helper';
import {UPDATE_FORM_CREATE_CLASS} from "../../constants/actionTypes";

/*eslint no-console: 0 */

export function loadClasses(search, page, teacherId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASSES_DATA,
        });
        classApi.loadClasses(search, page, teacherId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CLASSES_DATA_SUCCESS,
                    classes: res.data.classes,
                    isCreateClass: res.data.is_create_class,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_CLASSES_DATA_ERROR
            });
        });
    };
}

export function deleteClass(classId) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa lớp", 'info');
        dispatch({
            type: types.BEGIN_DELETE_CLASS_DATA,
        });
        classApi.deleteClass(classId)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.sweetAlertSuccess("Xóa lớp thành công");
                    dispatch({
                        type: types.DELETE_CLASS_DATA_SUCCESS,
                        classId: classId
                    });
                } else {
                    helper.sweetAlertError("Xóa lớp thất bại");
                }
            }).catch(() => {
            helper.sweetAlertError("Xóa lớp thất bại");
            dispatch({
                type: types.DELETE_CLASS_DATA_ERROR
            });
        });
    };
}

export function duplicateClass(classId) {
    return function (dispatch) {
        helper.showTypeNotification("Đang duplicate lớp", 'info');
        dispatch({
            type: types.BEGIN_DUPLICATE_CLASS_DATA,
        });
        classApi.duplicateClass(classId)
            .then((res) => {
                helper.sweetAlertSuccess("Duplicate lớp thành công");
                dispatch({
                    type: types.DUPLICATE_CLASS_DATA_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            helper.sweetAlertError("Duplicate lớp thất bại");
            dispatch({
                type: types.DUPLICATE_CLASS_DATA_ERROR
            });
        });
    };
}

export function changeClassStatus(classId) {
    return function (dispatch) {
        helper.showTypeNotification('Đang thay đổi trạng thái lớp', 'info');
        dispatch({
            type: types.BEGIN_CHANGE_CLASS_STATUS,
            classId: classId,
        });
        classApi.changeClassStatus(classId)
            .then(() => {
                helper.showNotification('Thay đổi trạng thái lớp thành công');
                dispatch({
                    type: types.CHANGE_CLASS_STATUS_SUCCESS,
                });
            }).catch(() => {
            helper.showErrorNotification('Thay đổi trạng thái lớp thất bại');
            dispatch({
                type: types.CHANGE_CLASS_STATUS_ERROR
            });
        });
    };
}

export function infoCreateClass() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_INFO_CREATE_CLASS,
        });
        classApi.infoCreateClass()
            .then((res) => {
                dispatch({
                    type: types.LOAD_INFO_CREATE_CLASS_SUCCESS,
                    infoCreateClass: res.data.data
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_INFO_CREATE_CLASS_ERROR
            });
        });
    };
}

export function updateFormCreateClass(classData) {
    return {
      type: UPDATE_FORM_CREATE_CLASS,
      class: classData,
    };
}

export function createClass(classData, closeModal) {
    classData = {...classData, id: ''};
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_CLASS,
        });
        classApi.addClass(classData)
            .then((res) => {
                closeModal();
                dispatch({
                    type: types.LOAD_CREATE_CLASS_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_CREATE_CLASS_ERROR
            });
        });
    };
}

export function editClass(classData, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_CLASS,
        });
        classApi.addClass(classData)
            .then((res) => {
                closeModal();
                dispatch({
                    type: types.LOAD_EDIT_CLASS_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_EDIT_CLASS_ERROR
            });
        });
    };
}



