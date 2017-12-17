import * as types from '../../constants/actionTypes';
import * as dashboardApi from './dashboardApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadGensData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA_DASHBOARD
        });
        dashboardApi.loadGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_DASHBOARD_SUCCESS,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GENS_DASHBOARD_ERROR
            });
        });
    };
}

export function loadBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_DATA_DASHBOARD
        });
        dashboardApi.loadBases()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_DASHBOARD_SUCCESS,
                    bases: res.data.data.bases,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_DASHBOARD_ERROR
            });
        });
    };
}

export function loadDashboardData(genId, baseId, startTime, endTime) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DASHBOARD_DATA
        });
        dashboardApi.loadDashboard(genId, baseId, startTime, endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_DASHBOARD_DATA_SUCCESS,
                    dashboard: res.data.data,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_DASHBOARD_DATA_ERROR
            });
        });
    };
}

export function changeClassStatus(classId) {
    return function (dispatch) {
        helper.showTypeNotification('Đang thay đổi trạng thái lớp', 'info');
        dispatch({
            type: types.BEGIN_CHANGE_CLASS_STATUS_DASHBOARD,
            classId: classId,
        });
        dashboardApi.changeClassStatus(classId)
            .then(() => {
                helper.showNotification('Thay đổi trạng thái lớp thành công');
                dispatch({
                    type: types.CHANGE_CLASS_STATUS_DASHBOARD_SUCCESS,
                });
            }).catch(() => {
            helper.showErrorNotification('Thay đổi trạng thái lớp thất bại');
            dispatch({
                type: types.CHANGE_CLASS_STATUS_DASHBOARD_ERROR
            });
        });
    };
}

export function loadClass(classId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASS_DATA_DASHBOARD
        });
        dashboardApi.loadClass(classId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CLASS_DASHBOARD_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_CLASS_DASHBOARD_ERROR
            });
        });
    };
}

export function loadAttendanceShifts(genId, baseId, time) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ATTENDANCE_SHIFTS_DATA_DASHBOARD,
            time: time
        });
        dashboardApi.loadAttendanceShifts(genId, baseId, time)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ATTENDANCE_SHIFTS_DASHBOARD_SUCCESS,
                    shifts: res.data.data.shifts,
                    date: res.data.data.date,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_ATTENDANCE_SHIFTS_DASHBOARD_ERROR
            });
        });
    };
}

export function loadAttendanceClasses(genId, baseId, time) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ATTENDANCE_CLASSES_DATA_DASHBOARD,
            time: time
        });
        dashboardApi.loadAttendanceClasses(genId, baseId, time)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ATTENDANCE_CLASSES_DASHBOARD_SUCCESS,
                    classes: res.data.data.classes,
                    date: res.data.data.date,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_ATTENDANCE_CLASSES_DASHBOARD_ERROR
            });
        });
    };
}




