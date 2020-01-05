import * as types from "../constants/actionTypes";
import initialState from "../reducers/initialState";


export default function globalReducer(state = initialState.global, action) {
    switch (action.type) {
        case types.LOAD_PROVINCES_GLOBAL:
            return {
                ...state,
                provinces: action.provinces
            };
            case types.LOAD_BASES_GLOBAL:
            return {
                ...state,
                bases: action.bases
            };
            case types.SELECTED_BASE_GLOBAL:
            return {
                ...state,
                selectedBaseId: action.selectedBaseId
            };
        default:
            return state;
    }
}