import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function weekendReportReducer(state = initialState.weekendReport, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_REPORT:
            return {
                ...state,
                ...{
                    loadingModal: true
                }
            };
        case types.BEGIN_LOAD_REPORTS:
            return {
                ...state,
                ...{
                    isLoading: true
                }
            };
        case types.CHECK_REPORT_MODAL:
            return {
                ...state,
                checkWeekendReportModal: !state.checkWeekendReportModal
            };
        case types.LOAD_A_REPORT_SUCCESS:
            return{
                ...state,
                report:action.report,
                loadingModal: false,
            };
        case types.LOAD_REPORT_SUCCESS:
            return {
                ...state,
                reports: action.reports,
                currentPage:action.currentPage,
                limit:action.limit,
                totalCount:action.totalCount,
                totalPages:action.totalPages,
                isLoading: false
            };
        case types.HANDLE_REPORT:
            return {
                ...state,
                weekendReportModal: action.report
            };
        case types.BEGIN_SAVE_REPORT:
            return{
                ...state,
                addReport: true
            };
        case types.SAVE_REPORT_SUCCESS:
            return {
                ...state,
                addReport:false,
                reports: [...state.reports, action.report]
            };
        case types.EDIT_REPORT_SUCCESS: {
            let reports = state.reports.map((report) => {
                if (report.id === action.report.id)
                    return {
                        ...report,
                        status: action.status,
                    };
                return report;
            });
            return {
                ...state,
                loadingModal: false,
                reports: reports
            };
        }

        default:
            return state;
    }
}

