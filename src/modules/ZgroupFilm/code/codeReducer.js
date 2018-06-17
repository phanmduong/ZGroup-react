import * as types from './codeActionTypes';
import initialState from "../../../reducers/initialState";


export default function filmReducer(state = initialState.code, action) {
    switch (action.type) {
        case types.TOGGLE_OPEN_MODAL:
            return {
                ...state,
                addEditCodeModal: !state.addEditCodeModal,
            };
        case types.TOGGLE_OPEN_SHOW_CODE_MODAL:
            return {
                ...state,
                showCodeModal: !state.showCodeModal,
            };
        case types.BEGIN_SAVE_CODE:
            return {
                ...state,
                isAddEditCode: true
            };
        case types.SAVE_CODE_SUCCESS:
            return {
                ...state,
                isAddEditCode: false,
                addEditCodeModal: false,
            };
        case types.HANDLE_CODE_MODAL:
            return {
                ...state,
                handleCodeModal: action.code
            };
        case types.HANDLE_SHOW_CODES_MODAL:
            return{
                ...state,
                codes: action.code
            };
        case types.BEGIN_LOAD_CODE:
            return {
                ...state,
                isLoadingCode: true,
            };
        case types.LOAD_CODE_SUCCESS:
            return {
                ...state,
                isLoadingCode: false,
                code: action.code
            };
        default:
            return state;
    }
}