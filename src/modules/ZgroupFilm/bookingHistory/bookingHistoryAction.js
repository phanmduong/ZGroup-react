import * as bookingHistoryApi from "./bookingHistoryApi";
import * as types from "./bookingHistoryActionTypes";

export function getBookingHistory() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BOOKING_HISTORY,
        });
        bookingHistoryApi.getBookingHistoryApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BOOKING_HISTORY_SUCCESS,
                    bookingHistories: res.data,
                });

            });
    };
}