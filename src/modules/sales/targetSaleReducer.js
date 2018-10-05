import initialState from "./targetSaleInitialState";
import {
    BEGIN_TARGET_SALE_LOAD,
    TARGET_SALE_CHANGE_GEN,
    TARGET_SALE_LOAD_GENS,
    TARGET_SALE_LOAD_GENS_SUCCESS, TARGET_SALE_LOAD_SUCCESS
} from './targetSaleActionType';

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
        case BEGIN_TARGET_SALE_LOAD:
            return {
                ...state,
                isLoadingTargetSale: true
            };
        case TARGET_SALE_LOAD_SUCCESS:
            return {
                ...state,
                targetSale: action.targetSale,
                isLoadingTargetSale: false
            };
        default:
            return state;
    }

}