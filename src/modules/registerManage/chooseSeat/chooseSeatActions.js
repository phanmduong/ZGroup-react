import {
    TOGGLE_CHOOSE_SEAT_MODAL,
    CHOOSE_SEAT_BEGIN_LOAD_ROOMS,
    CHOOSE_SEAT_LOAD_ROOMS_SUCCESS,
    CHOOSE_SEAT_SET_ACTIVE_ROOM,
    CHOOSE_SEAT_LOAD_SEATS_SUCCESS,
} from "./chooseSeatActionType";
import { getRooms, getSeats } from "./chooseSeatApi";

export const loadRooms = baseId => {
    return async dispatch => {
        dispatch({
            type: CHOOSE_SEAT_BEGIN_LOAD_ROOMS,
        });
        const res = await getRooms(baseId);
        const { rooms } = res.data;
        dispatch({
            type: CHOOSE_SEAT_LOAD_ROOMS_SUCCESS,
            rooms,
        });
    };
};

export const setActiveRoom = roomId => {
    return async dispatch => {
        const res = await getSeats(
            roomId,
            "28/02/2018 2017:23:34",
            "28/02/2018 2017:23:34",
        );
        dispatch({
            type: CHOOSE_SEAT_SET_ACTIVE_ROOM,
            roomId,
        });
        const {
            available_seats,
            booked_seats,
            seats,
            seats_count,
        } = res.data.data;
        dispatch({
            type: CHOOSE_SEAT_LOAD_SEATS_SUCCESS,
            seats,
            seatsCount: seats_count,
            availableSeats: available_seats,
            bookedSeats: booked_seats,
        });
    };
};

export const toggleShowChooseSeatModal = (showModal, base = {}) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_CHOOSE_SEAT_MODAL,
            showModal,
            base,
        });
    };
};
