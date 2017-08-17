import * as types from '../constants/actionTypes';
import * as roleApi from '../apis/roleApi';
import toastr from 'toastr';

export function beginLoadRolesData() {
    return {
        type: types.BEGIN_LOAD_ROLES_DATA,
        isLoading: true,
        error: false,
        roleListData: []
    };
}

export function loadRolesData() {
    return function (dispatch) {
        dispatch(beginLoadRolesData());
        roleApi.getRoles()
            .then(function (res) {
                dispatch(loadRolesDataSucessful(res));
            }).catch(() => {
            dispatch(loadRolesDataError());
        });
    };
}

export function loadRolesDataSucessful(res) {
    return (
        {
            type: types.LOAD_ROLES_DATA_SUCCESSFUL,
            roleListData: res.data.data.roles,
            status: res.data.status,
            isLoading: false,
            error: false
        })
        ;
}

export function loadRolesDataError() {
    return (
        {
            type: types.LOAD_ROLES_DATA_ERROR,
            isLoading: false,
            error: true
        })
        ;
}

export function beginCreateRoleData() {
    toastr.info('Đang tạo chức vụ');
    return {
        type: types.BEGIN_CREATE_ROLE_DATA,
        isLoading: true,
        error: false,
    };
}

export function createRoleData(tabs, role) {
    return function (dispatch) {
        dispatch(beginCreateRoleData());
        roleApi.createRole(tabs, role)
            .then(function (res) {
                dispatch(createRoleDataSucessful(res));
            }).catch(() => {
            dispatch(createRoleDataError());
        });
    };
}

export function createRoleDataSucessful(res) {
    toastr.success(res.data.data.message);
    return (
        {
            type: types.CREATE_ROLE_DATA_SUCCESSFUL,
            isLoading: false,
            error: false
        })
        ;
}

export function createRoleDataError() {
    toastr.error('Tạo chức vụ thất bại. Thử lại');
    return (
        {
            type: types.CREATE_ROLE_DATA_ERROR,
            isLoading: false,
            error: true
        });
}

export function updateRoleFormData(roleForm) {
    return {
        type: types.CHANGE_ROLE_TITLE_FORM,
        roleForm: roleForm
    };
}

export function beginDeleteRoleData() {
    toastr.info("Đang xóa chức vụ");
    return {
        type: types.BEGIN_DELETE_ROLE_DATA,
        isLoading: true,
        error: false,
    };
}

export function deleteRoleData(roleId) {
    return function (dispatch) {
        dispatch(beginDeleteRoleData());
        roleApi.deleteRole(roleId)
            .then(function (res) {
                dispatch(deleteRoleDataSucessful(roleId, res));
            }).catch((error) => {
            dispatch(deleteRoleDataError(error.response.data.error));
            console.log(error);
        });
    };
}

export function deleteRoleDataSucessful(roleId) {
    toastr.success("Xóa chức vụ thành công");
    return (
        {
            type: types.DELETE_ROLE_DATA_SUCCESSFUL,
            isLoading: false,
            error: false,
            roleId: roleId
        })
        ;
}

export function deleteRoleDataError(data) {

    if (data) {
        toastr.error(data);
    } else {
        toastr.error('Xóa chức vụ thất bại. Thử lại');
    }

    return (
        {
            type: types.DELETE_ROLE_DATA_ERROR,
            isLoading: false,
            error: true
        })
        ;
}


export function beginLoadRoleData() {
    return {
        type: types.BEGIN_LOAD_ROLE_DATA,
        isLoading: true,
        error: false,
        tabListData: [],
        role: {}
    };
}

export function loadRoleData(roleId) {
    return function (dispatch) {
        dispatch(beginLoadRoleData());
        roleApi.getRole(roleId)
            .then(function (res) {
                dispatch(loadRoleDataSucessful(res));
            }).catch(() => {
            dispatch(loadRoleDataError());
        });
    };
}

export function loadRoleDataSucessful(res) {
    return (
        {
            type: types.LOAD_ROLE_DATA_SUCCESSFUL,
            tabListData: res.data.data.tabs,
            role: res.data.data.role,
            isLoading: false,
            error: false
        })
        ;
}

export function loadRoleDataError() {
    return (
        {
            type: types.LOAD_ROLE_DATA_ERROR,
            isLoading: false,
            error: true
        })
        ;
}

export function beginEditRoleData() {
    toastr.info("Đang sửa chức vụ");
    return {
        type: types.BEGIN_EDIT_ROLE_DATA,
        isLoading: true,
        error: false,
    };
}

export function editRoleData(tabs, role) {
    return function (dispatch) {
        dispatch(beginEditRoleData());
        roleApi.editRole(tabs, role)
            .then(function (res) {
                dispatch(editRoleDataSucessful(res));
            }).catch((error) => {
            dispatch(editRoleDataError(error.response.data.error));
            console.log(error);
        });
    };
}

export function editRoleDataSucessful() {
    toastr.success("Sửa chức vụ thành công");
    return (
        {
            type: types.EDIT_ROLE_DATA_SUCCESSFUL,
            isLoading: false,
            error: false
        })
        ;
}

export function editRoleDataError() {


    toastr.error('Sửa chức vụ thất bại. Thử lại');

    return ({
            type: types.EDIT_ROLE_DATA_ERROR,
            isLoading: false,
            error: true
        });
}