import * as types from '../constants/actionTypes';
import * as loadLoginApi from '../apis/LoginApi';

export function beginUpdateLoginForm() {
  return {type: types.BEGIN_UPDATE_LOGIN_FORM};
}

export function loginError() {
  return {type: types.LOGIN_ERROR}
}

export function updateFormData(login) {
  return function (dispatch) {
    dispatch(beginUpdateLoginForm());
    loadLoginApi.loadLoginApi(login).then(function (res) {
      dispatch(updatedLoginForm(res));
    }).catch(error => {
      localStorage.setItem('token', '');
      dispatch(loginError());
      throw (error);
    })
  };
}

export function updatedLoginForm(res) {
  let token = "";
  if (res.data.user.role != 0) token = res.data.token;
  localStorage.setItem('token', token);
  return ({
    type: types.UPDATED_LOGIN_FORM,
    token: token,
    user: res.data.user
  })
}
