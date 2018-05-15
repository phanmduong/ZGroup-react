import * as types from '../../constants/actionTypes';
import * as workShiftSessionApi from './workShiftSessionApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadWorkShiftSessions() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_WORK_SHIFT_SESSIONS
        });
        workShiftSessionApi.loadWorkShiftSessions()
            .then((res) => {
                dispatch({
                    type: types.LOAD_WORK_SHIFT_SESSIONS_SUCCESS,
                    workShiftSessions: res.data.data.work_shift_sessions,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_WORK_SHIFT_SESSIONS_ERROR
            });
        });
    };
}

export function storeWorkShiftSession(workShiftSession, closeModal) {
    if (helper.isEmptyInput(workShiftSession.id)) {
        workShiftSession.id = '';
    }
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_WORK_SHIFT_SESSION,
        });

        let api = helper.isEmptyInput(workShiftSession.id) ? workShiftSessionApi.createWorkWorkShiftSession(workShiftSession) :
            workShiftSessionApi.editWorkWorkShiftSession(workShiftSession);

        api.then(res => {
            if (res.data.status === 1) {
                closeModal();
                helper.showNotification("Tải lên thành công");
                dispatch({
                    type: types.STORE_WORK_SHIFT_SESSION_SUCCESS,
                    workShiftSession: res.data.data.work_shift_session,
                    edit: !helper.isEmptyInput(workShiftSession.id)
                });
            } else {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.STORE_WORK_SHIFT_SESSION_ERROR,
                });
            }
        })
            .catch(() => {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.STORE_WORK_SHIFT_SESSION_ERROR,
                });
            });
    };
}

export function deleteWorkShiftSession(workShiftSessionId) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ca làm việc", 'info');
        dispatch({
            type: types.BEGIN_DELETE_WORK_SHIFT_SESSION
        });
        workShiftSessionApi.deleteWorkShiftSession(workShiftSessionId)
            .then(() => {
                helper.showNotification("Xóa ca làm việc thành công");
                dispatch({
                    type: types.DELETE_WORK_SHIFT_SESSION_SUCCESS,
                    workShiftSessionId: workShiftSessionId,
                });
            }).catch(() => {
            helper.showErrorNotification("Xóa ca làm việc thất bại. Thử lại");
            dispatch({
                type: types.DELETE_WORK_SHIFT_SESSION_ERROR
            });
        });
    };
}







