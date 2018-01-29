import {getSeats} from "./seatApi";
import {
    DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING, SEAT_LOAD_SEATS_SUCCESS,
    SEAT_TOGGLE_CREATE_SEAT_MODAL, SEAT_UPDATE_SEAT_FORM_DATA
} from "../../../constants/actionTypes";

export function toggleCreateSeatModal(showCreateSeatModal) {
    return function (dispatch) {
        dispatch({
            type: SEAT_TOGGLE_CREATE_SEAT_MODAL,
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

export const updateSeatFormData = (seat) => {
    return (dispatch) => {
        dispatch({
            type: SEAT_UPDATE_SEAT_FORM_DATA,
            seat
        });
    };
};
