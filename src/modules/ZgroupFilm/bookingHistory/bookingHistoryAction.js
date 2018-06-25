import * as bookingHistoryApi from "./bookingHistoryApi";
import * as types from "./bookingHistoryActionTypes";

export function getBookingHistory(lm,pg) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BOOKING_HISTORY,
        });
        bookingHistoryApi.getBookingHistoryApi(lm,pg)
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