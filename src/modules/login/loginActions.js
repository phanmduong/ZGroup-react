import * as types from '../../constants/actionTypes';
import * as loadLoginApi from './LoginApi';
import * as helper from '../../helpers/helper';

export function beginUpdateLoginForm() {
    return {type: types.BEGIN_UPDATE_LOGIN_FORM};
}

export function loginError() {
    return {type: types.LOGIN_ERROR};
}

export function updateFormData(login) {
    return function (dispatch) {
        dispatch(beginUpdateLoginForm());
        loadLoginApi.loadLoginApi(login).then(function (res) {
            dispatch(updatedLoginForm(res));
        }).catch(error => {
            localStorage.removeItem('token');
            dispatch(loginError());
            console.log(error);
        });
    };
}

export function updatedLoginForm(res) {
    let token = null;
    if (res.data.user.role !== 0) token = res.data.token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    helper.saveDataLoginLocal(helper.encodeToken(res.data));
    return ({
        type: types.UPDATED_LOGIN_FORM,
        token: token,
        user: res.data.user
    });
}

export function getUserLocal() {
    return ({
        type: types.GET_USER_LOCAL,
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user'))
    });
}

export function logOut() {
    return ({
        type: types.LOG_OUT
    });
}
