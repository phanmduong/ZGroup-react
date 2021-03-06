import * as types from "../../constants/actionTypes";
import * as loadLoginApi from "./LoginApi";
import * as helper from "../../helpers/helper";
import {setCookie} from "../../helpers/helper";

/*eslint no-console: 0 */
export function beginUpdateLoginForm() {
    return {type: types.BEGIN_UPDATE_LOGIN_FORM};
}

export function loginError() {
    helper.showErrorNotification("Lỗi. Kiểm tra thông tin tài khoản");
    return {type: types.LOGIN_ERROR};
}

export function updateFormData(login) {
    return function (dispatch) {
        dispatch(beginUpdateLoginForm());
        loadLoginApi
            .loadLoginApi(login)
            .then(function (res) {
                dispatch(updatedLoginForm(res));
            })
            .catch(error => {
                console.log(error);
                dispatch(loginError());
            });
    };
}

export function updatedLoginForm(res) {
    let token = null;
    if (res.data.user.role !== 0) {
        token = res.data.token;
        setCookie("token", token, {'max-age': 518400})
        setCookie("user", JSON.stringify(res.data.user), {'max-age': 518400})
        localStorage.setItem("user", JSON.stringify(res.data.user));
        helper.setStorage("token", token, 518400);
    }
    return {
        type: types.UPDATED_LOGIN_FORM,
        token: token,
        user: res.data.user,
    };
}

export function getUserLocal() {
    return {
        type: types.GET_USER_LOCAL,
        token: localStorage.getItem("token"),
        user: JSON.parse(localStorage.getItem("user")),
    };
}

export function logOut() {
    localStorage.removeItem("token");
    return {
        type: types.LOG_OUT,
    };
}
