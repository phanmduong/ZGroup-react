/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from './seatActionTypes';
import initialState from '../../../reducers/initialState';

export default function seatReducer(state = initialState.seat, action) {
    switch (action.type) {
        case types.SEAT_TOGGLE_CREATE_SEAT_MODAL:
            return {
                ...state,
                showCreateSeatModal: action.showCreateSeatModal
            };

        case types.SEAT_LOAD_SEATS_SUCCESS:
            return {
                ...state,
                seats: action.seats
            };
        default:
            return state;
    }

}