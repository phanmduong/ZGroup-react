import * as types from "./seatActionTypes";
import {getSeats} from "./seatApi";
import {DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING} from "../../../constants/actionTypes";
import {SEAT_LOAD_SEATS_SUCCESS} from "./seatActionTypes";

export function toggleCreateSeatModal(showCreateSeatModal) {
    return function (dispatch) {
        dispatch({
            type: types.SEAT_TOGGLE_CREATE_SEAT_MODAL,
            showCreateSeatModal
        });
    };
}

export const loadSeats = (roomId) => {
    return async (dispatch) => {
        dispatch({
            type: DISPLAY_GLOBAL_LOADING
        });
        const res = await getSeats(roomId);
        const {seats} = res.data.data;

        dispatch({
            type: HIDE_GLOBAL_LOADING
        });

        dispatch({
            type: SEAT_LOAD_SEATS_SUCCESS,
            seats
        });

    };
};

