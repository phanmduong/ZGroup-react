import {
    TOGGLE_CHOOSE_SEAT_MODAL,
    CHOOSE_SEAT_BEGIN_LOAD_ROOMS,
    CHOOSE_SEAT_LOAD_ROOMS_SUCCESS,
    CHOOSE_SEAT_SET_ACTIVE_ROOM,
    CHOOSE_SEAT_LOAD_SEATS_SUCCESS,
    CHOOSE_SEAT_BEGIN_LOAD_SEATS,
    TOGGLE_CONFIRM_SEAT_MODAL,
    CHOOSE_SEAT_SET_TO_TIME,
    BEGIN_BOOK_SEAT,
    BOOK_SEAT_SUCCESS,
    CHOOSE_SEAT_SET_FROM_TIME,
} from "./chooseSeatActionType";
import { getRooms, getSeats, postBookSeat } from "./chooseSeatApi";

export const bookSeat = ({ registerId, seatId, startTime, endTime }) => {
    return async dispatch => {
        dispatch({
            type: BEGIN_BOOK_SEAT,
        });
        const res = await postBookSeat({
            registerId,
            seatId,
            startTime,
            endTime,
        });

        dispatch({
            type: BOOK_SEAT_SUCCESS,
            registerSeat: res.data.register_seat,
        });
    };
};

export const setFromTime = from => {
    return dispatch => {
        dispatch({
            type: CHOOSE_SEAT_SET_FROM_TIME,
            from,
        });
    };
};

export const setToTime = to => {
    return dispatch => {
        dispatch({
            type: CHOOSE_SEAT_SET_TO_TIME,
            to,
        });
    };
};

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

export const loadSeats = (roomId, from, to) => {
    return async dispatch => {
        dispatch({
            type: CHOOSE_SEAT_BEGIN_LOAD_SEATS,
        });
        const res = await getSeats(roomId, from, to);
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

export const setActiveRoom = roomId => {
    return async dispatch => {
        dispatch({
            type: CHOOSE_SEAT_SET_ACTIVE_ROOM,
            roomId,
        });
    };
};

export const toggleConfirmSeatModal = (showConfirmSeatModal, seat = {}) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_CONFIRM_SEAT_MODAL,
            seat,
            showConfirmSeatModal,
        });
    };
};

export const toggleShowChooseSeatModal = (showModal, base = {}, register) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_CHOOSE_SEAT_MODAL,
            showModal,
            base,
            register,
        });
    };
};
