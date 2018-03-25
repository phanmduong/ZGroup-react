import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function weekendReportReducer(state = initialState.weekendReport, action) {
    switch (action.type) {
        case types.CHECK_REPORT_MODAL:
            return {
                ...state,
                checkWeekendReportModal: !state.checkWeekendReportModal
            };
        case types.LOAD_REPORT_SUCCESS:
            return{
                ...state,
                reports: action.reports,
            };
        default:
            return state;
    }
}

