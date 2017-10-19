import * as types from "../../../constants/actionTypes";

// import * as taskApi from "../taskApi";

export function openClosePersonalSettingModal(showModal) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_CLOSE_PROJECT_MODAL_PERSONAL_SETTING,
            showModal
        });
    };
}

export function updateProjectPersonalSetting(setting) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_PROJECT_PERSONAL_SETTING,
            setting
        });
    };
}
