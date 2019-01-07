import * as types from './bookingHistoryActionTypes';
import initialState from "../../../reducers/initialState";


export default function filmReducer(state = initialState.bookingHistory, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BOOKING_HISTORY:
            return {
                ...state,
                isLoadingBookingHistory: true
            };
        case types.LOAD_BOOKING_HISTORY_SUCCESS:
            return {
                ...state,
                bookingHistories: action.bookingHistories,
                totalCount: action.total_count,
                totalPages: action.total_pages,
                currentPage: action.current_page,
                limit: action.limit,
                isLoadingBookingHistory: false
            };
        case types.BEGIN_LOAD_EXCEL_BOOKING_HISTORY:
            return {
                ...state,
                isLoadingExcel: true,
            };
        case types.LOAD_EXCEL_BOOKING_HISTORY_SUCCESS:
            return {
                ...state,
                isLoadingExcel: false,
                excel: action.excel
            };
        default:
            return state;
    }
}