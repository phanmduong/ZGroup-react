import * as types from '../../../constants/actionTypes';
import * as weekendReportApi from './weekendReportApi';
import * as helper from "../../../helpers/helper";
import {browserHistory} from 'react-router';


export function showCheckWeekendReportModal() {
    return ({
        type: types.CHECK_REPORT_MODAL
    });
}

export function checkV(report,comment) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REPORT
        });
        weekendReportApi.checkApi(report,comment)
            .then(() => {
                helper.showNotification("Duyệt Thành Công");
                dispatch({
                    type: types.EDIT_REPORT_SUCCESS,
                    report
                });

            });

    };
}
export function handleComment(comment) {
    return ({
        type: types.HANDLE_COMMENT,
        comment
    });
}
export function loadReportById(i) {
    return function (dispatch) {
        dispatch({
                type: types.BEGIN_LOAD_REPORT
            }
        );
        weekendReportApi.loadReportById(i)
            .then((res) => {
                dispatch({
                    type: types.LOAD_A_REPORT_SUCCESS,
                    report: res.data.data.report
                });
            });

    };

}

export function loadAllReports(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REPORTS
        });

        weekendReportApi.loadAllReportsApi(page,search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_REPORT_SUCCESS,
                    reports: res.data.reports,
                    currentPage: res.data.paginator.current_page,
                    limit: res.data.paginator.limit,
                    totalCount: res.data.paginator.total_count,
                    totalPages: res.data.paginator.total_pages

                });
            });
    };
}

export function handleReport(report) {
    return ({
        type: types.HANDLE_REPORT,
        report
    });
}

export function saveReport(report, index) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_REPORT
        });
        weekendReportApi.saveReportApi(report, index)
            .then(() => {
                dispatch({
                    type: types.SAVE_REPORT_SUCCESS,
                });
                helper.showNotification("Thêm báo cáo thành công");
                browserHistory.push('/administration/weekend-report/');
            });
    };
}

export function editReport(index,id,report) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_REPORT
        });
        weekendReportApi.editReportApi(index,id,report)
            .then((res) => {
                if(res.data.status){
                dispatch({
                    type: types.OPEN_CLOSE_EDIT_LOADING,
                });
                helper.showNotification("Chỉnh sửa báo cáo thành công");
                    browserHistory.push('/administration/weekend-report/');
                }
                else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.OPEN_CLOSE_EDIT_LOADING,
                    });
                }
            });
    };
}