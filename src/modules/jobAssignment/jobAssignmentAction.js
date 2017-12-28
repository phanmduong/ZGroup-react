import * as types from "../../constants/actionTypes";

export function updateFormData(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_CREATE_JOB_ASSIGNMENT,
            data : data,
        });
    };
}

export function chooseStaff(obj) {
    return function (dispatch) {
        dispatch({
            type: types.CHOOSE_STAFF_JOB_ASSIGNMENT,
            obj : obj,
        });
    };
}

export function removeStaff(obj) {
    return function (dispatch) {
        dispatch({
            type: types.REMOVE_STAFF_JOB_ASSIGNMENT,
            obj : obj,
        });
    };
}