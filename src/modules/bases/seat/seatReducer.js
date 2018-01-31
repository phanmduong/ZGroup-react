/**
 * Created by phanmduong on 4/6/17.
 */
import initialState from '../../../reducers/initialState';
import {
    SEAT_SET_SEAT_CURRENT_ACTION,
    SEAT_CREATE_SEAT_SUCCESS, SEAT_LOAD_SEATS_SUCCESS, SEAT_TOGGLE_CREATE_SEAT_MODAL,
    SEAT_UPDATE_SEAT_FORM_DATA
} from "../../../constants/actionTypes";

export default function seatReducer(state = initialState.seat, action) {
    switch (action.type) {
        case SEAT_SET_SEAT_CURRENT_ACTION:
            return {
                ...state,
                currentAction: action.seatAction
            };
        case SEAT_CREATE_SEAT_SUCCESS:
            return {
                ...state,
                seats: [...state.seats, action.seat],
                point: {},
                showCreateSeatModal: false
            };
        case SEAT_UPDATE_SEAT_FORM_DATA:
            return {
                ...state,
                seat: action.seat
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