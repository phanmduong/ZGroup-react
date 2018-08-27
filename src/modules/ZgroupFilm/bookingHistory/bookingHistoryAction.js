import * as bookingHistoryApi from "./bookingHistoryApi";
import * as types from "./bookingHistoryActionTypes";

export function getBookingHistory(limit, page, search, film_name, roomId, time, payment_method) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BOOKING_HISTORY,
        });
        bookingHistoryApi.getBookingHistoryApi(limit, page, search, film_name, roomId, time, payment_method)
            .then((res) => {
                dispatch({
                    type: types.LOAD_BOOKING_HISTORY_SUCCESS,
                    bookingHistories: res.data.histories,
                    total_count: res.data.paginator.total_count,
                    total_pages: res.data.paginator.total_pages,
                    current_page: res.data.paginator.current_page,
                    limit: res.data.paginator.limit,
                });

            });
    };
}
export function excelBookingHistory(limit, page, search, film_name, roomId, time, fc, payment_method) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EXCEL_BOOKING_HISTORY,
        });
        bookingHistoryApi.getBookingHistoryApi(limit, page, search, film_name, roomId, time, payment_method)
            .then((res) => {
                dispatch({
                    type: types.LOAD_EXCEL_BOOKING_HISTORY_SUCCESS,
                    excel: res.data
                });
                fc();

            });
    };
}