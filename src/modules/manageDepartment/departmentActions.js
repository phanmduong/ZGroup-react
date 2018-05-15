import * as types from '../../constants/actionTypes';
import * as helper from '../../helpers/helper';
import * as departmentApi from './departmentApi';

export function loadDepartment() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DEPARTMENT
        });
        departmentApi.loadDepartment()
            .then(function (res) {
                dispatch({
                    type: types.LOAD_DEPARTMENT_SUCCESS,
                    data: res.data,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_DEPARTMENT_ERROR,
            });
        });
    };
}
export function addDepartment(data, success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_DEPARTMENT
        });
        departmentApi.addDepartment(data)
            .then(function () {
                dispatch({
                    type: types.ADD_DEPARTMENT_SUCCESS,
                });
                helper.showNotification("Thêm thành công!");
                success();
            }).catch(() => {
            helper.showWarningNotification("Có lỗi xảy ra!");
            dispatch({
                type: types.ADD_DEPARTMENT_ERROR,
            });
        });
    };
}
export function editDepartment(data, success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_DEPARTMENT
        });
        departmentApi.editDepartment(data)
            .then(function () {
                dispatch({
                    type: types.EDIT_DEPARTMENT_SUCCESS,
                });
                helper.showNotification("Sửa thành công!");
                success();
            }).catch(() => {
            helper.showWarningNotification("Có lỗi xảy ra!");
            dispatch({
                type: types.EDIT_DEPARTMENT_ERROR,
            });
        });
    };
}
export function deleteDepartment(data, success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_DEPARTMENT
        });
        departmentApi.deleteDepartment(data)
            .then(function () {
                dispatch({
                    type: types.DELETE_DEPARTMENT_SUCCESS,
                });
                helper.showNotification("Xóa thành công!");
                success();
            }).catch(() => {
            helper.showWarningNotification("Có lỗi xảy ra!");
            dispatch({
                type: types.DELETE_DEPARTMENT_ERROR,
            });
        });
    };
}
