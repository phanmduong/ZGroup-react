import {
    SHOW_CREATE_REGISTER_MODAL,
    UPDATE_CREATE_REGISTER_FORM_DATA,
    BEGIN_LOAD_COURSES,
    LOADED_COURSES_SUCCESS,
    LOADED_COURSES_ERROR,
    BEGIN_LOAD_CLASSES,
    LOADED_CLASSES_SUCCESS,
    LOADED_CLASSES_ERROR,
    SAVED_REGISTER_SUCCESS,
    SAVED_REGISTER_ERROR,
    BEGIN_SAVE_REGISTER,
    LOADED_CAMPAIGNS_ERROR,
    BEGIN_LOAD_CAMPAIGNS,
    LOADED_CAMPAIGNS_SUCCESS,

} from "./createRegisterActionType";
import * as registerStudentsApi from "./registerStudentsApi";
import * as helper from "../../helpers/helper";

export const showCreateRegisterModal = showCreateRegisterModal => {
    return dispatch => {
        dispatch({
            type: SHOW_CREATE_REGISTER_MODAL,
            showCreateRegisterModal,
        });
    };
};

export const updateFormData = register => {
    return dispatch => {
        dispatch({
            type: UPDATE_CREATE_REGISTER_FORM_DATA,
            register,
        });
    };
};

export function loadCourses() {
    return function (dispatch) {
        dispatch({type: BEGIN_LOAD_COURSES});
        registerStudentsApi.loadCoursesApi()
            .then(
                (res) => {
                    dispatch({
                        type: LOADED_COURSES_SUCCESS,
                        courses: res.data.courses,
                    });
                }
            )
            .catch(() => {
                dispatch({
                    type: LOADED_COURSES_ERROR,
                });
            });

    };
}
export function loadCampaigns() {
    return function (dispatch) {
        dispatch({type: BEGIN_LOAD_CAMPAIGNS});
        registerStudentsApi.loadCampaignsApi()
            .then(
                (res) => {
                    dispatch({
                        type: LOADED_CAMPAIGNS_SUCCESS,
                        campaigns: res.data.data.marketing_campaigns,
                    });
                }
            )
            .catch(() => {
                dispatch({
                    type: LOADED_CAMPAIGNS_ERROR,
                });
            });

    };
}
export function loadClassesByCourse(course_id) {
    return function (dispatch) {
        dispatch({type: BEGIN_LOAD_CLASSES});
        registerStudentsApi.loadClassesApi(course_id)
            .then(
                (res) => {
                    dispatch({
                        type: LOADED_CLASSES_SUCCESS,
                        classes: res.data.data.classes,
                    });
                }
            )
            .catch(() => {
                dispatch({
                    type: LOADED_CLASSES_ERROR,
                });
            });

    };
}

export function createRegister(register,hide) {
    return function (dispatch) {
        dispatch({type : BEGIN_SAVE_REGISTER});
        registerStudentsApi.saveRegisterApi(register)
            .then(
                (res) => {
                    if (res.data.status) {
                        dispatch({
                            type: SAVED_REGISTER_SUCCESS,
                            register: res.data.data.register,
                        });
                        hide();
                        helper.showTypeNotification("Đang thêm học viên", "success");
                    }
                    else{
                        helper.showErrorNotification("Lỗi");
                    }
                }
            )
            .catch(() => {
                dispatch({
                    type: SAVED_REGISTER_ERROR,
                });
            });

    };
}

/*eslint no-console: 0 */
