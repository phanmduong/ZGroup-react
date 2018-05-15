/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let gens;
export default function genssReducer(state = initialState.gens, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false

                }
            };
        case types.LOAD_GENS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    gens: action.gens,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    totalCount: action.totalCount
                }
            };
        case types.LOAD_GENS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.UPDATE_GEN_FROM:
            return {
                ...state,
                gen: action.gen
            };
        case types.BEGIN_ADD_GEN:
            return {
                ...state,
                ...{
                    isSaving: true,
                    errorSave: false

                }
            };
        case types.ADD_GEN_SUCCESS:
            return {
                ...state,
                ...{
                    isSaving: false,
                    errorSave: false,
                    gens: [action.gen, ...state.gens.slice(0, state.gens.length - 1)],
                }
            };
        case types.ADD_GEN_ERROR:
            return {
                ...state,
                ...{
                    isSaving: false,
                    errorSave: true
                }
            };
        case types.BEGIN_EDIT_GEN:
            return {
                ...state,
                ...{
                    isEditing: true,
                    errorEdit: false
                }
            };
        case types.EDIT_GEN_SUCCESS:
            gens = editGens(action.gen, state.gens);
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorEdit: false,
                    gens: gens
                }
            };
        case types.EDIT_GEN_ERROR:
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorEdit: true
                }
            };
        case types.DELETE_GEN_SUCCESS:
            gens = deleteGen(action.genId, state.gens);
            return {
                ...state,
                ...{
                    gens: gens
                }
            };
        case types.BEGIN_CHANGE_STATUS_GEN:
            gens = changeStatus(action.genId, state.gens);
            return {
                ...state,
                ...{
                    gens: gens
                }
            };
        case types.BEGIN_CHANGE_TEACH_STATUS_GEN:
            gens = changeTeachStatus(action.genId, state.gens);
            return {
                ...state,
                ...{
                    gens: gens
                }
            };
        default:
            return state;
    }
}

function editGens(genData, gens) {
    if (gens) {
        gens = gens.map((gen) => {
            if (gen.id === genData.id)
                return genData;
            return gen;
        });
    }
    return gens;
}

function deleteGen(genId, gens) {
    if (gens) {
        gens = gens.filter(gen => gen.id !== genId);
    }
    return gens;
}

function changeStatus(genId, gens) {
    if (gens) {
        gens = gens.map((gen) => {
            if (gen.id === genId)
                return {
                    ...gen,
                    status: 1
                };
            return {
                ...gen,
                status: 0
            };
        });
    }
    return gens;
}

function changeTeachStatus(genId, gens) {
    if (gens) {
        gens = gens.map((gen) => {
            if (gen.id === genId)
                return {
                    ...gen,
                    teach_status: 1
                };
            return {
                ...gen,
                teach_status: 0
            };
        });
    }
    return gens;
}