import * as types from "../../../constants/actionTypes";
import * as taskApi from "../taskApi";
import {showNotification} from "../../../helpers/helper";

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


export function submitProjectPersonalSetting(projectId, setting) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SUBMIT_PROJECT_PERSONAL_SETTING
        });
        taskApi.submitProjectPersonalSetting(projectId, JSON.stringify(setting))
            .then(() => {
                showNotification("Cập nhật cài đặt cá nhân thành công");
                dispatch({
                    type: types.SUBMIT_PROJECT_PERSONAL_SETTING_SUCCESS,
                    setting
                });
            });

    };
}

export function loadProjectPersonalSettingModal(projectId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PROJECT_PERSONAL_SETTING
        });

        taskApi.loadProjectPersonalSetting(projectId)
            .then((res) => {
                const setting = JSON.parse(res.data.data.setting);
                dispatch({
                    type: types.LOAD_PROJECT_PERSONAL_SETTING_SUCCESS,
                    setting: setting || {}
                });
            });
    };
}
