/**
 * Created by phanmduong on 4/6/17.
 */
import initialState from '../../../reducers/initialState';
import {
    SEAT_SET_SEAT_CURRENT_ACTION, SEAT_SET_SELECTED_SEAT,
    SEAT_CREATE_UPDATE_SEAT_SUCCESS, SEAT_LOAD_SEATS_SUCCESS, SEAT_TOGGLE_CREATE_SEAT_MODAL,
    SEAT_UPDATE_SEAT_FORM_DATA
} from "../../../constants/actionTypes";

export default function seatReducer(state = initialState.seat, action) {
    switch (action.type) {
        case SEAT_SET_SELECTED_SEAT:
            return {
                ...state,
                seat: {
                    ...state.seat,
                    ...action.seat
                },
                seats: state.seats.map((seat) => {
                    if (seat.id === action.seat.id) {
                        return {
                            ...seat,
                            active: 1
                        };
                    }
                    return {
                        ...seat,
                        active: 0
                    };
                }) 
            };

        case SEAT_SET_SEAT_CURRENT_ACTION:
            return {
                ...state,
                currentAction: action.seatAction
            };
        case SEAT_CREATE_UPDATE_SEAT_SUCCESS:
            // update seat if seat has id
            // otherwise create new seat
            return {
                ...state,
                seats: action.seat.id ? 
                    state.seats.map((seat) => {
                        if (seat.id === action.seat.id) {
                            return action.seat;
                        }
                        return seat;
                    }) : 
                    [...state.seats, action.seat],
                showCreateSeatModal: false
            };
        case SEAT_UPDATE_SEAT_FORM_DATA:
            return {
                ...state,
                seat: action.seat,
                seats: action.seat.id ?
                    state.seats.map((seat) => {
                        if (seat.id === action.seat.id)
                            return {
                                ...action.seat,
                                active: 1
                            };
                        return seat;             
                    }) : state.seats
            };
        case SEAT_TOGGLE_CREATE_SEAT_MODAL:
            return {
                ...state,
                showCreateSeatModal: action.showCreateSeatModal,
                point: action.point
            };

        case SEAT_LOAD_SEATS_SUCCESS:
            return {
                ...state,
                seats: action.seats
            };
        default:
            return state;
    }

}