import * as seatApi from "./seatApi";
import {
    SEAT_SET_SEAT_CURRENT_ACTION, SEAT_SET_SELECTED_SEAT,
    DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING, SEAT_CREATE_UPDATE_SEAT_SUCCESS, SEAT_LOAD_SEATS_SUCCESS,
    SEAT_TOGGLE_CREATE_SEAT_MODAL, SEAT_UPDATE_SEAT_FORM_DATA
} from "../../../constants/actionTypes";

export const setSeatCurrentAction = (seatAction) => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.seat.currentAction === seatAction) {
            dispatch({
                type: SEAT_SET_SEAT_CURRENT_ACTION,
                seatAction: ""
            });
        } else {
            dispatch({
                type: SEAT_SET_SEAT_CURRENT_ACTION,
                seatAction
            });
        }
    };
};

export const setSelectedSeat = (seat) => {
    return (dispatch) => {
        dispatch({
            type: SEAT_SET_SELECTED_SEAT,
            seat
        });
    };
};

export const createSeats = (roomId, seats) => {
    return async (dispatch) => {
        dispatch({
            type: DISPLAY_GLOBAL_LOADING
        });

        await seatApi.createSeats(roomId, seats);

        dispatch({
            type: HIDE_GLOBAL_LOADING
        });
    };
};

export const createUpdateSeat = (seat) => {
    return async (dispatch) => {
        dispatch({
            type: SEAT_CREATE_UPDATE_SEAT_SUCCESS,
            seat
        });
    };
};

export function toggleCreateSeatModal(showCreateSeatModal, point) {
    return function (dispatch) {
        dispatch({
            type: SEAT_TOGGLE_CREATE_SEAT_MODAL,
            showCreateSeatModal,
            point
        });
    };
}

export const loadSeats = (roomId) => {
    return async (dispatch) => {
        dispatch({
            type: DISPLAY_GLOBAL_LOADING
        });
        const res = await seatApi.getSeats(roomId);
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
