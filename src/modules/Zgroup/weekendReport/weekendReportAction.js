import * as types from '../../../constants/actionTypes';
import * as weekendReportApi from './weekendReportApi';

export function showCheckWeekendReportModal() {
    return ({
        type: types.CHECK_REPORT_MODAL
    });
}

export function loadAllReports() {
    return function (dispatch) {
        dispatch({
            type: ""
        });

    weekendReportApi.loadAllReportsApi()
        .then((res) => {
            dispatch({
                type: types.LOAD_REPORT_SUCCESS,
                reports: res.data.data.reports
            });
        });
    };
}