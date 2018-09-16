import * as types from '../../constants/actionTypes';
import * as passwordApi from './passwordApi';
import * as helper from '../../helpers/helper';

export function loadAllPasswords(page,limit) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PASSWORDS
        });
        passwordApi.loadAllPasswordsApi(page,limit)
            .then((res) => {
                dispatch({
                    type : types.LOAD_PASSWORDS_SUCCESS,
                    passwords : res.data.data.data,
                    totalPages: res.data.data.last_page,
                    currentPage: res.data.data.current_page,
                    limit: res.data.data.per_page,
                    totalCount: res.data.data.total,
                });
            });
    };
}

export function showEditPasswordModal() {
    return ({
        type: types.TOGGLE_ADD_EDIT_PASSWORDS_MODAL
    });
}

export function handlePassword(passwordAccount) {
    return ({
        type: types.HANDLE_PASSWORDS,
        passwordAccount
    });
}



// export function savePassword(passwordAccount) {
//     return function (dispatch) {
//         dispatch({
//             type: types.BEGIN_SAVE_PASSWORDS
//         });
//         passwordApi.savePasswordApi(passwordAccount)
//             .then((res) => {
//                 if(res.data.status){
//                     helper.showNotification("Thêm tài khoản thành công");
//                     dispatch({
//                         type: types.SAVE_PASSWORDS_SUCCESS,
//                         passwordAccount
//                     });
//                 }
//                 else {
//                     helper.showNotification(res.data.message);
//                     dispatch({
//                         type: types.ADD_PASSWORD_ERROR,
//                     });
//                 }
//             });
//     };
// }

export function editPassword(passwordAccount) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_PASSWORDS
        });
        passwordApi.editPasswordApi(passwordAccount)
            .then((res) => {
                dispatch({
                    type: types.EDIT_PASSWORDS_SUCCESS,
                    passwordAccount
                });
                if(res.data.status === 1){helper.showNotification("Chỉnh sửa thành công");}
                else if(res.data.message === "Trùng mật khẩu cũ"){helper.showErrorNotification("Mật khẩu mới trùng mật khẩu cũ");}
                else {helper.showErrorNotification("Chỉnh sửa thất bại");}
            });
    };
}
