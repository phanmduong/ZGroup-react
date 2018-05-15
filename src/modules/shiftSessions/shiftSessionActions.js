import * as types from '../../constants/actionTypes';
import * as shiftSessionApi from './shiftSessionApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadShiftSessions() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SHIFT_SESSIONS
        });
        shiftSessionApi.loadShiftSessions()
            .then((res) => {
                dispatch({
                    type: types.LOAD_SHIFT_SESSIONS_SUCCESS,
                    shiftSessions: res.data.data.shift_sessions,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_SHIFT_SESSIONS_ERROR
            });
        });
    };
}

export function storeShiftSession(shiftSession, closeModal) {
    if (helper.isEmptyInput(shiftSession.id)) {
        shiftSession.id = '';
    }
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_SHIFT_SESSION,
        });
        shiftSessionApi.storeShiftSession(shiftSession)
            .then(res => {
                if (res.data.status === 1) {
                    closeModal();
                    helper.showNotification("Tải lên thành công");
                    dispatch({
                        type: types.STORE_SHIFT_SESSION_SUCCESS,
                        shiftSession: res.data.data.shift_session,
                        edit: !helper.isEmptyInput(shiftSession.id)
                    });
                } else {
                    helper.showErrorNotification("Tải lên thất bại");
                    dispatch({
                        type: types.STORE_SHIFT_SESSION_ERROR,
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.STORE_SHIFT_SESSION_ERROR,
                });
            });
    };
}

export function deleteShiftSession(shiftSessionId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_SHIFT_SESSION
        });
        shiftSessionApi.deleteShiftSession(shiftSessionId)
            .then(() => {
                helper.showNotification("Xóa ca trực thành công");
                dispatch({
                    type: types.DELETE_SHIFT_SESSION_SUCCESS,
                    shiftSessionId: shiftSessionId,
                });
            }).catch(() => {
            helper.showErrorNotification("Xóa ca trực thất bại. Thử lại");
            dispatch({
                type: types.DELETE_SHIFT_SESSION_ERROR
            });
        });
    };
}







