import * as types from './codeActionTypes';
//import * as codeApi from "./codeApi";


export function openModal() {
    return ({
        type: types.TOGGLE_OPEN_MODAL,
    });
}
export function openShowCodeModal() {
    return ({
        type: types.TOGGLE_OPEN_SHOW_CODE_MODAL,
    });
}
