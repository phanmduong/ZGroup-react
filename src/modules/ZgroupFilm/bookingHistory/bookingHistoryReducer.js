//import * as types from './codeActionTypes';
import initialState from "../../../reducers/initialState";


export default function filmReducer(state = initialState.bookingHistory, action) {
    switch (action.type) {
        // case types.DISPLAY_GLOBAL_LOADING:
        //     return {
        //         ...state,
        //         isSaving: true
        //     };
        default:
            return state;
    }
}