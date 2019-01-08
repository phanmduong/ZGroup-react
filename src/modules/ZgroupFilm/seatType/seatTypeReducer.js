import * as types from './seatTypeActiontypes';
import initialState from "../../../reducers/initialState";


export default function seatTypeReducer(state = initialState.seatType, action) {
    switch (action.type) {
        //Seat_types Reducer
        case types.BEGIN_LOAD_ALL_SEAT_TYPES:
            return {
                ...state,
                isLoadingSeat: true,
            };
        case types.LOAD_ALL_SEAT_TYPES_SUCCESS:
            return {
                ...state,
                isLoadingSeat: false,
                seatTypes: action.seatTypes
            };
        case types.TOGGLE_SEAT_TYPE_MODAL:
            return {
                ...state,
                openModal: !state.openModal
            };
        case types.HANDLE_SEAT_TYPE_MODAL:
            return {
                ...state,
                handleSeatTypeModal: action.seatType
            };
        case types.BEGIN_SAVE_SEAT_TYPE:
            return {
                ...state,
                isEditSeatType: true,
            };
        case types.EDIT_SEAT_TYPE_ERROR:
            return {
                ...state,
                isEditSeatType: false,
            };
        case types.EDIT_SEAT_TYPE_SUCCESS: {
            let st = state.seatTypes.map((st) => {
                if (st.id === action.seatType.id)
                    return {
                        ...st,
                        type: action.seatType.type
                    };
                return st;
            });
            return {
                ...state,
                isEditSeatType: false,
                openModal: false,
                seatTypes: st,
            };
        }



        default:
            return state;
    }
}