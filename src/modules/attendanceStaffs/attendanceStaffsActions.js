import * as types from '../../constants/actionTypes';
import * as attendanceStaffsApi from './attendanceStaffsApi';

/*eslint no-console: 0 */

export function loadGensData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA_ATTENDANCE_STAFFS
        });
        attendanceStaffsApi.loadGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_ATTENDANCE_STAFFS_SUCCESS,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GENS_ATTENDANCE_STAFFS_ERROR
            });
        });
    };
}

export function loadBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_DATA_ATTENDANCE_STAFFS
        });
        attendanceStaffsApi.loadBases()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_ATTENDANCE_STAFFS_SUCCESS,
                    bases: res.data.data.bases,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_ATTENDANCE_STAFFS_ERROR
            });
        });
    };
}

export function loadStatisticAttendanceStaffs(genId, baseId, startTime, endTime) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_STATISTIC_ATTENDANCE_STAFFS
        });
        attendanceStaffsApi.statisticAttendanceStaffs(genId, baseId, startTime, endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_STATISTIC_ATTENDANCE_STAFFS_SUCCESS,
                    salesMarketings: res.data.data.sales_marketing,
                    teachers: res.data.data.teachers,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_STATISTIC_ATTENDANCE_STAFFS_ERROR
            });
        });
    };
}







