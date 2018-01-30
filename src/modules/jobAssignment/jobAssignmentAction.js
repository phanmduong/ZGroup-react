import * as types from "../../constants/actionTypes";
import * as helper from "../../helpers/helper";
import * as jobAssignmentApi from "../jobAssignment/jobAssignmentApi";
import {browserHistory} from 'react-router';




export function loadWorks() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_WORKS_JOB_ASSIGNMENT});
        jobAssignmentApi.loadWorks()
            .then((res) => {
                dispatch({
                    type: types.LOAD_WORKS_JOB_ASSIGNMENT_SUCCESS,
                    works: res.data.data.works
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi khi tải danh sách công việc.");
                dispatch({type: types.LOAD_WORKS_JOB_ASSIGNMENT_ERROR});
            });
    };
}

export function loadStaffs() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_STAFFS_JOB_ASSIGNMENT});
        jobAssignmentApi.loadStaffs()
            .then((res) => {
                dispatch({
                    type: types.LOAD_STAFFS_JOB_ASSIGNMENT_SUCCESS,
                    staffs: res.data.staffs
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi khi tải danh sách nhân viên.");
                dispatch({type: types.LOAD_STAFFS_JOB_ASSIGNMENT_ERROR});
            });
    };
}

export function updateFormData(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_CREATE_JOB_ASSIGNMENT,
            data : data,
        });
    };
}

export function chooseStaff(obj) {
    return function (dispatch) {
        dispatch({
            type: types.CHOOSE_STAFF_JOB_ASSIGNMENT,
            obj : obj,
        });
    };
}

export function removeStaff(obj) {
    return function (dispatch) {
        dispatch({
            type: types.REMOVE_STAFF_JOB_ASSIGNMENT,
            obj : obj,
        });
    };
}

export function createWork(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_WORK});
        jobAssignmentApi.createWork(data)
            .then((res) => {
                if(res.data.status == 1) {
                    helper.sweetAlertSuccess("Lưu thành công");
                    browserHistory.push("hr/job-assignment");
                    dispatch({
                        type: types.CREATE_WORK_SUCCESS,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.CREATE_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.CREATE_WORK_ERROR});
            });
    };
}
export function editWork(data, status, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_WORK});
        jobAssignmentApi.editWork(data,status)
            .then((res) => {
                if(res.data.status == 1) {
                    if(!status)
                        helper.sweetAlertSuccess("Sửa thành công");
                    else success();
                    browserHistory.push("hr/job-assignment");
                    dispatch({
                        type: types.EDIT_WORK_SUCCESS,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.EDIT_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.EDIT_WORK_ERROR});
            });
    };
}
export function revertWork(data, status, success) {
    helper.showWarningNotification("Đang yêu cầu");
    return function (dispatch) {
        dispatch({type: types.BEGIN_REVERT_WORK});
        jobAssignmentApi.editWork(data,status)
            .then((res) => {

                if(res.data.status == 1) {
                    success();
                    helper.showNotification("Yêu cầu thành công");
                    dispatch({
                        type: types.REVERT_WORK_SUCCESS,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.REVERT_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.REVERT_WORK_ERROR});
            });
    };
}
export function loadWork(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_INFO_WORK});
        jobAssignmentApi.loadWork(id)
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({
                        type: types.LOAD_INFO_WORK_SUCCESS,
                        work: res.data.data.work
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_INFO_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_INFO_WORK_ERROR});
            });
    };
}


export function deleteWork(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_DELETE_WORK});
        jobAssignmentApi.deleteWork(id)
            .then((res) => {
                if(res.data.status == 1) {
                    helper.showNotification("Xóa thành công!");
                    dispatch({type: types.DELETE_WORK_SUCCESS});
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.DELETE_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.DELETE_WORK_ERROR});
            });
    };
}

export function changeStatusWork(workId, staffId, status, success) {
    return function (dispatch) {
        helper.showWarningNotification("Đang lưu...");
        dispatch({type: types.BEGIN_CHANGE_STATUS_WORK});
        jobAssignmentApi.changeStatusWork(workId,staffId, status)
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({type: types.CHANGE_STATUS_WORK_SUCCESS});
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.CHANGE_STATUS_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.CHANGE_STATUS_WORK_ERROR});
            });
    };
}
export function extendWork(workId, staffId, data, success) {
    return function (dispatch) {
        helper.showWarningNotification("Đang yêu cầu...");
        dispatch({type: types.BEGIN_EXTEND_WORK});
        jobAssignmentApi.extendWork(workId,staffId, data)
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({type: types.EXTEND_WORK_SUCCESS});
                    helper.showNotification("Đã xin gia hạn, vui lòng chờ xét duyệt.");
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.EXTEND_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.EXTEND_WORK_ERROR});
            });
    };
}
export function doneWork(workId, staffId, data, success) {
    return function (dispatch) {
        helper.showWarningNotification("Đang lưu...");
        dispatch({type: types.BEGIN_CHANGE_STATUS_WORK});
        jobAssignmentApi.doneWork(workId,staffId, data)
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({type: types.CHANGE_STATUS_WORK_SUCCESS});
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.CHANGE_STATUS_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.CHANGE_STATUS_WORK_ERROR});
            });
    };
}
export function resetDataCreate(){
    return function (dispatch) {
        dispatch({type: types.RESET_DATA_CREATE_WORK});

    };
}

export function loadCurrencies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_CURRENCIES_JOB_ASSIGNMENT});
        jobAssignmentApi.loadCurrencies()
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({
                        type: types.LOAD_CURRENCIES_JOB_ASSIGNMENT_SUCCESS,
                        currencies: res.data.data.currencies
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_CURRENCIES_JOB_ASSIGNMENT_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_CURRENCIES_JOB_ASSIGNMENT_ERROR});
            });
    };
}

export function acceptPay(workId, staffId, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ACCEPT_PAY_WORK});
        jobAssignmentApi.acceptPay(workId, staffId)
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({
                        type: types.ACCEPT_PAY_WORK_SUCCESS,
                    });
                    success();
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.ACCEPT_PAY_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.ACCEPT_PAY_WORK_ERROR});
            });
    };
}

export function loadArchivedWork() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ARCHIVED_WORK});
        jobAssignmentApi.loadArchivedWork()
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({
                        type: types.LOAD_ARCHIVED_WORK_SUCCESS,
                        archivedWorks: res.data.data.works,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ARCHIVED_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ARCHIVED_WORK_ERROR});
            });
    };
}

export function loadRateData(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_RATE_DATA_WORK});
        jobAssignmentApi.loadRateData(id)
            .then((res) => {
                if(res.data.status == 1) {
                    dispatch({
                        type: types.LOAD_RATE_DATA_WORK_SUCCESS,
                        rateData: res.data.data.work,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_RATE_DATA_WORK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_RATE_DATA_WORK_ERROR});
            });
    };
}
