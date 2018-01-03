import * as types from '../../constants/actionTypes';
import * as firstLoginApi from './firstLoginApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadMyProfile() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_MY_PROFILE});
        firstLoginApi.getProfile()
            .then(res => {
                dispatch({
                    type: types.LOAD_MY_PROFILE_SUCCESSFULL,
                    profile: res.data.data.user
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_MY_PROFILE_ERROR});
            });
    };
}

export function changeAvatar(file, staffId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CHANGE_AVATAR_PROFILE});
        firstLoginApi.changeAvatar(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            dispatch({type: types.CHANGE_AVATAR_PROFILE_SUCCESS, avatar_url: data.avatar_url});
            helper.showNotification(data.message);
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.id == staffId) {
                user.avatar_url = data.avatar_url;
                localStorage.setItem('user', JSON.stringify(user));
                dispatch(getUserLocal());
            }
        }, staffId);
    };
}

export function getUserLocal() {
    let user = JSON.parse(localStorage.getItem('user'));
    return ({
        type: types.GET_USER_LOCAL,
        token: localStorage.getItem('token'),
        user: user,
    });
}

export function updateEditProfileFormData(profile) {
    return ({
        type: types.UPDATE_EDIT_PROFILE_FORM_DATA,
        profile: {...profile}
    });
}

export function editProfile(profile) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPDATE_PROFILE});
        firstLoginApi.editProfile(profile)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Cập nhật thành công");
                    let user = (res.data.data.user);
                    user.first_login = 1;
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(getUserLocal());
                    dispatch({type: types.UPDATE_PROFILE_SUCCESS});

                } else {
                    let data = res.data.message;
                    if (data && data.email) {
                        helper.showErrorNotification(data.email);
                    }

                    if (data && data.username) {
                        helper.showErrorNotification(data.username);
                    }

                    dispatch({type: types.UPDATE_PROFILE_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Cập nhật thất bại");
                dispatch({type: types.UPDATE_PROFILE_ERROR});
            });
    };
}

export function changePassword(oldPassword, newPassword, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CHANGE_PASSWORD_PROFILE});
        firstLoginApi.changePassword(oldPassword, newPassword)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification(res.data.data.message);
                    closeModal();
                    dispatch({type: types.CHANGE_PASSWORD_PROFILE_SUCCESS});

                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({type: types.CHANGE_PASSWORD_PROFILE_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Cập nhật thất bại");
                dispatch({type: types.CHANGE_PASSWORD_PROFILE_ERROR});
            });
    };
}



