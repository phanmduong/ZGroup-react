import * as types from './codeActionTypes';
import * as codeApi from "./codeApi";
import * as helper from "../../../helpers/helper";
import {browserHistory} from "react-router";


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

export function creatCode(code) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_CODE,
        });
        codeApi.postCodeApi(code)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Tạo mã giảm giá thành công");
                    dispatch({
                        type: types.SAVE_CODE_SUCCESS,
                    });
                    browserHistory.push('/base/film/code');
                }
                else helper.showNotification(res.data.message);
            });
    };
}

export function handleCodeModal(code) {
    return ({
        type: types.HANDLE_CODE_MODAL,
        code
    });

}
