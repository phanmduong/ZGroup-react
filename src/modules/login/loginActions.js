import * as types from '../../constants/actionTypes';
import * as loadLoginApi from './LoginApi';
import * as helper from '../../helpers/helper';
import async from 'async';
import {messageingFirebase} from '../../constants/env';

/*eslint no-console: 0 */
export function beginUpdateLoginForm() {
    return {type: types.BEGIN_UPDATE_LOGIN_FORM};
}

export function loginError() {
    return {type: types.LOGIN_ERROR};
}

export function updateFormData(login) {
    return function (dispatch) {
        dispatch(beginUpdateLoginForm());
        async.waterfall([
            function (callback) {
                if (messageingFirebase) {
                    messageingFirebase.getToken()
                        .then(function (currentToken) {
                            console.log(currentToken);
                            callback(null, currentToken);
                        }).catch(function (error) {
                        console.log(error);
                        callback(null, "");
                    });
                } else {
                    callback(null, "");
                }
            },
            function (tokenBrowser, callback) {
                loadLoginApi.loadLoginApi(login, tokenBrowser).then(function (res) {
                    callback(null, res);
                }).catch(error => {
                    console.log(error);
                });
            }
        ], function (err, result) {
            if (err) {
                dispatch(loginError());
            } else {
                dispatch(updatedLoginForm(result));
            }
        });
    };
}

export function updatedLoginForm(res) {
    let token = null;
    if (res.data.user.role !== 0) {
        token = res.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        helper.saveDataLoginLocal(helper.encodeToken(res.data));
    }
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
