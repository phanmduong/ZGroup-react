import * as types from './codeActionTypes';
import * as codeApi from "./codeApi";
import * as helper from "../../../helpers/helper";


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
export function handlShowCodesModal(code) {
    return({
       type: types.HANDLE_SHOW_CODES_MODAL,
        code
    });
}

export function getCode(page,limit,description) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CODE,
        });
        codeApi.getCodeApi(page,limit,description)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CODE_SUCCESS,
                    code: res.data.codes,
                    total_count: res.data.paginator.total_count,
                    total_pages: res.data.paginator.total_pages,
                    current_page: res.data.paginator.current_page,
                    limit: res.data.paginator.limit,
                });

            });
    };
}

export function getAllCode(exportExcel) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DATA_EXCEL_CODE,
        });
        codeApi.getCodeApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_DATA_EXCEL_CODE_SUCCESS,
                    excel: res.data
                });
                exportExcel();
            });
    };
}

export function editCode(code) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_CODE,
        });
        codeApi.editCodeApi(code)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Sửa mã giảm giá thành công");
                    dispatch({
                        type: types.SAVE_CODE_SUCCESS,
                    });
                }
                else helper.showNotification(res.data.message);
            });
    };
}
export function deleteCode(code) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_CODE
        });
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        codeApi.deleteCodeApi(code)
            .then(() => {
                // if (res.data.status) {
                    helper.showNotification("Xóa mã giảm giá thành công");
                    dispatch({
                        type: types.SAVE_CODE_SUCCESS,
                    });
                // }
                // else helper.showNotification(res.data.message);
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}