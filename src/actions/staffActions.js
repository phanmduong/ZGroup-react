import * as types from '../constants/actionTypes';
import * as staffApi from '../apis/staffApi';
import toastr from 'toastr';

export function beginLoadStaffsData() {
    return {
        type: types.BEGIN_LOAD_STAFFS_DATA,
        isLoading: true,
        error: false,
        staffListData: []
    };
}

export function loadStaffsData() {
    return function (dispatch) {
        dispatch(beginLoadStaffsData());
        staffApi.getStaffs()
            .then(function (res) {
                dispatch(loadStaffsDataSucessful(res));
            }).catch(() => {
            dispatch(loadStaffsDataError());
        });
    };
}

export function loadStaffsDataSucessful(res) {
    return ({
            type: types.LOAD_STAFFS_DATA_SUCCESSFUL,
            staffListData: res.data.data.staffs,
            status: res.data.status,
            isLoading: false,
            error: false
        });
}

export function loadStaffsDataError() {
    return ({
            type: types.LOAD_STAFFS_DATA_ERROR,
            isLoading: false,
            error: true
        });
}


export function beginChangeRoleStaff(staffId, roleId) {
    toastr.info('Đang thay đổi chức vụ');
    return {
        type: types.BEGIN_CHANGE_ROLE_STAFF,
        isLoadingChangeRoleStaff: true,
        errorChangeRoleStaff: false,
        messageChangeRoleStaff: null,
        staffId: staffId,
        roleId: roleId
    };
}

export function changeRoleStaff(staffId, roleId) {
    return function (dispatch) {
        dispatch(beginChangeRoleStaff(staffId, roleId));
        staffApi.changeRoleStaff(staffId, roleId)
            .then(function (res) {
                dispatch(changeRoleStaffSucessful(res));
            }).catch((error) => {
            dispatch(changeRoleStaffError(error));
        });
    };
}

export function changeRoleStaffSucessful(res) {
    toastr.success(res.data.data.message);
    return ({
            type: types.CHANGE_ROLE_STAFF_SUCCESSFUL,
            messageChangeRoleStaff: res.data.data.message,
            isLoadingChangeRoleStaff: false,
            errorChangeRoleStaff: false,
        });
}

export function changeRoleStaffError() {
    toastr.error('Thay đổi chức vụ thất bại');
    return ({
            type: types.CHANGE_ROLE_STAFF_ERROR,
            messageChangeRoleStaff: null,
            isLoadingChangeRoleStaff: false,
            errorChangeRoleStaff: true,
        });
}

export function updateAddStaffFormData(staffForm) {
    return ({
            type: types.UPDATE_ADD_STAFF_FORM_DATA,
            staffForm: Object.assign({}, staffForm)
        });
}

export function beginAddStaffData() {
    return {
        type: types.BEGIN_ADD_STAFF_DATA,
        isLoading: true,
        error: false,
    };
}

export function addStaffData(staff) {
    return function (dispatch) {
        dispatch(beginAddStaffData());
        staffApi.addStaff(staff)
            .then(function (res) {
                dispatch(addStaffDataSucessful(res));
            }).catch((error) => {
            dispatch(addStaffDataError(error.response.data.error));
            console.log(error);
        });
    };
}

export function addStaffDataSucessful() {
    toastr.success("Thêm nhân viên thành công");
    return ({
            type: types.ADD_STAFF_DATA_SUCCESSFUL,
            isLoading: false,
            error: false
        });
}

export function addStaffDataError(data) {
    let isMessageError = false;
    if (data.email) {
        toastr.error(data.email);
        isMessageError = true;
    }

    if (data.username) {
        toastr.error(data.username);
        isMessageError = true;
    }

    if (!isMessageError) {
        toastr.error('Tạo nhân viên thất bại. Thử lại');
    }

    return ({
            type: types.ADD_STAFF_DATA_ERROR,
            isLoading: false,
            error: true
        });
}

export function beginChangeBaseStaff(staffId, baseId) {
    toastr.info('Đang thay đổi cơ sở');
    return {
        type: types.BEGIN_CHANGE_BASE_STAFF,
        isLoadingChangeBaseStaff: true,
        errorChangeBaseStaff: false,
        messageChangeBaseStaff: null,
        staffId: staffId,
        baseId: baseId
    };
}

export function changeBaseStaff(staffId, baseId) {
    return function (dispatch) {
        dispatch(beginChangeBaseStaff(staffId, baseId));
        staffApi.changeBaseStaff(staffId, baseId)
            .then(function (res) {
                dispatch(changeBaseStaffSucessful(res));
            }).catch((error) => {
            dispatch(changeBaseStaffError(error));
        });
    };
}

export function changeBaseStaffSucessful(res) {
    toastr.success(res.data.data.message);
    return ({
            type: types.CHANGE_BASE_STAFF_SUCCESSFUL,
            messageChangeBaseStaff: res.data.data.message,
            isLoadingChangeBaseStaff: false,
            errorChangeBaseStaff: false,
        });
}

export function changeBaseStaffError() {
    toastr.error('Thay đổi cơ sở thất bại');
    return ({
            type: types.CHANGE_BASE_STAFF_ERROR,
            messageChangeBaseStaff: null,
            isLoadingChangeBaseStaff: false,
            errorChangeBaseStaff: true,
        });
}

export function beginLoadStaffData() {
    return {
        type: types.BEGIN_LOAD_STAFF_DATA,
        isLoadingStaff: true,
        errorStaff: false,
        staff: {}
    };
}

export function loadStaffData(staffId) {
    return function (dispatch) {
        dispatch(beginLoadStaffData());
        staffApi.getStaff(staffId)
            .then(function (res) {
                dispatch(loadStaffDataSucessful(res));
            }).catch(() => {
            dispatch(loadStaffDataError());
        });
    };
}

export function loadStaffDataSucessful(res) {
    return ({
            type: types.LOAD_STAFF_DATA_SUCCESSFUL,
            staff: res.data.data.staff,
            status: res.data.status,
            isLoadingStaff: false,
            errorStaff: false
        });
}

export function loadStaffDataError() {
    return ({
        type: types.LOAD_STAFF_DATA_ERROR,
        isLoadingStaff: false,
        errorStaff: true,
        staff: {}
    });
}

export function beginEditStaffData() {
    return {
        type: types.BEGIN_EDIT_STAFF_DATA,
        isLoading: true,
        error: false,
    };
}

export function editStaffData(staff) {
    return function (dispatch) {
        dispatch(beginEditStaffData());
        staffApi.editStaff(staff)
            .then(function (res) {
                dispatch(editStaffDataSucessful(res));
            }).catch((error) => {
            dispatch(editStaffDataError(error.response.data.error));
            console.log(error);
        });
    };
}

export function editStaffDataSucessful() {
    toastr.success("Cập nhật nhân viên thành công");
    return ({
            type: types.EDIT_STAFF_DATA_SUCCESSFUL,
            isLoading: false,
            error: false
        });
}

export function editStaffDataError(data) {

    if (data) {
        toastr.error(data);
    } else {
        toastr.error('Cập nhật nhân viên thất bại. Thử lại');
    }

    return ({
            type: types.EDIT_STAFF_DATA_ERROR,
            isLoading: false,
            error: true
        });
}

export function updateEditStaffFormData(staffForm) {
    return ({
            type: types.UPDATE_EDIT_STAFF_FORM_DATA,
            staffForm: staffForm
        });
}

export function beginDeleteStaffData() {
    return {
        type: types.BEGIN_DELETE_STAFF_DATA,
        isLoading: true,
        error: false,
    };
}

export function deleteStaffData(staff) {
    return function (dispatch) {
        dispatch(beginDeleteStaffData());
        staffApi.deleteStaff(staff)
            .then(function (res) {
                dispatch(deleteStaffDataSucessful(res));
            }).catch((error) => {
            dispatch(deleteStaffDataError(error.response.data.error));
            console.log(error);
        });
    };
}

export function deleteStaffDataSucessful() {
    toastr.success("Xóa nhân viên thành công");
    return ({
            type: types.DELETE_STAFF_DATA_SUCCESSFUL,
            isLoading: false,
            error: false
        });
}

export function deleteStaffDataError(data) {

    if (data) {
        toastr.error(data);
    } else {
        toastr.error('Xóa nhân viên thất bại. Thử lại');
    }

    return ({
            type: types.DELETE_STAFF_DATA_ERROR,
            isLoading: false,
            error: true
        });
}



