import * as types from '../../constants/actionTypes';
import * as dashboardApi from './dashboardApi';

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

export function loadStudyPackRegister(genId, baseId, search, filter, filterStatus, page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_STUDY_PACK_REGISTER_DASHBOARD
        });
        dashboardApi.loadStudyPackRegister(genId, baseId, search, filter,filterStatus, page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_STUDY_PACK_REGISTER_DASHBOARD_SUCCESS,
                    registers: res.data.registers,
                    totalPages: res.data.paginator.total_pages,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_STUDY_PACK_REGISTER_DASHBOARD_ERROR
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




