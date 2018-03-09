import {
    TOGGLE_CHOOSE_SEAT_MODAL,
    CHOOSE_SEAT_LOAD_ROOMS_SUCCESS,
    CHOOSE_SEAT_BEGIN_LOAD_ROOMS,
    CHOOSE_SEAT_SET_ACTIVE_ROOM,
    CHOOSE_SEAT_LOAD_SEATS_SUCCESS,
    CHOOSE_SEAT_BEGIN_LOAD_SEATS,
    CHOOSE_SEAT_SET_FROM_TIME,
    CHOOSE_SEAT_SET_TO_TIME,
    BEGIN_BOOK_SEAT,
    TOGGLE_CHOOSE_SEAT_HISTORY_MODAL,
    BOOK_SEAT_SUCCESS,
    BEGIN_LOAD_CHOOSE_SEAT_HISTORY,
    LOAD_CHOOSE_SEAT_HISTORY_SUCCESS,
    TOGGLE_CONFIRM_SEAT_MODAL,
} from "./chooseSeatActionType";

const initialState = {
    from: "",
    to: "",
    showModal: false,
    base: {},
    isLoading: false,
    rooms: [],
    isLoadingSeats: false,
    seats: [],
    seatsCount: 0,
    availableSeats: 0,
    bookedSeats: [],
    room: {},
    register: {},
    showConfirmSeatModal: false,
    seat: {},
    showChooseSeatHistoryModal: false,
    isBookingSeat: false,
    isLoadingChooseSeatHistory: false,
};

export default function chooseSeatReducer(state = initialState, action) {
    switch (action.type) {
        case BEGIN_LOAD_CHOOSE_SEAT_HISTORY:
            return {
                ...state,
                isLoadingChooseSeatHistory: true,
            };
        case LOAD_CHOOSE_SEAT_HISTORY_SUCCESS:
            return {
                ...state,
                isLoadingChooseSeatHistory: false,
            };
        case TOGGLE_CHOOSE_SEAT_HISTORY_MODAL:
            return {
                ...state,
                showChooseSeatHistoryModal: action.showChooseSeatHistoryModal,
            };
        case BEGIN_BOOK_SEAT:
            return {
                ...state,
                isBookingSeat: true,
            };
        case BOOK_SEAT_SUCCESS:
            return {
                ...state,
                isBookingSeat: false,
                showConfirmSeatModal: false,
                seats: state.seats.map(seat => {
                    if (seat.id === Number(action.registerSeat.seat_id)) {
                        return {
                            ...seat,
                            booked: true,
                        };
                    }
                    return seat;
                }),
            };
        case CHOOSE_SEAT_SET_FROM_TIME:
            return {
                ...state,
                from: action.from,
            };
        case CHOOSE_SEAT_SET_TO_TIME:
            return {
                ...state,
                to: action.to,
            };
        case TOGGLE_CONFIRM_SEAT_MODAL:
            return {
                ...state,
                seat: action.seat,
                showConfirmSeatModal: action.showConfirmSeatModal,
            };
        case TOGGLE_CHOOSE_SEAT_MODAL:
            return {
                ...state,
                showModal: action.showModal,
                base: action.base,
                register: action.register ? action.register : {},
                from: "",
                room: {},
                to: "",
            };
        case CHOOSE_SEAT_BEGIN_LOAD_ROOMS:
            return {
                ...state,
                isLoading: true,
            };
        case CHOOSE_SEAT_LOAD_ROOMS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                rooms: action.rooms,
            };
        case CHOOSE_SEAT_LOAD_SEATS_SUCCESS:
            return {
                ...state,
                isLoadingSeats: false,
                seats: action.seats,
                seatsCount: action.seatsCount,
                availableSeats: action.availableSeats,
                bookedSeats: action.bookedSeats,
            };
        case CHOOSE_SEAT_BEGIN_LOAD_SEATS:
            return {
                ...state,
                isLoadingSeats: true,
            };

        case CHOOSE_SEAT_SET_ACTIVE_ROOM:
            return {
                ...state,
                room: state.rooms.find(room => room.id === action.roomId),
                rooms: state.rooms.map(room => {
                    if (room.id === action.roomId) {
                        return {
                            ...room,
                            isActive: true,
                        };
                    }
                    return {
                        ...room,
                        isActive: false,
                    };
                }),
            };
        default:
            return state;
    }
}
