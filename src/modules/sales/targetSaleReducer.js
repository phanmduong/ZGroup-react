import initialState from "./targetSaleInitialState";
import {TARGET_SALE_CHANGE_GEN, TARGET_SALE_LOAD_GENS, TARGET_SALE_LOAD_GENS_SUCCESS} from './targetSaleActionType';

export default function targetSaleReducer(state = initialState, action) {
    switch (action.type) {
        case TARGET_SALE_LOAD_GENS:
            return {
                ...state,
                isLoadingGens: true
            };
        case TARGET_SALE_LOAD_GENS_SUCCESS:
            return {
                ...state,
                isLoadingGens: false,
                gens: action.gens,
                currentGenId: action.currentGenId
            };
        case TARGET_SALE_CHANGE_GEN:
            return {
                ...state,
                currentGenId: action.currentGenId
            };
        default:
            return state;
    }

}