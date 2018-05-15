import * as types from '../../constants/actionTypes';
import * as studySessionApi from './studySessionApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadStudySession() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_STUDY_SESSION});
        studySessionApi.loadStudySession()
            .then(res => {
                dispatch({
                    type: types.LOAD_STUDY_SESSION_SUCCESS,
                    studySessions: res.data.data.study_sessions
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_STUDY_SESSION_ERROR});
            });
    };
}

export function updateStudySessionFormData(studySession) {
    return {
        type: types.UPDATE_STUDY_SESSION_FROM,
        studySession: studySession
    };
}

export function addStudySession(studySession) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_STUDY_SESSION,
        });
        studySessionApi.addStudySession(studySession)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Tạo ca học thành công");
                    dispatch({
                        type: types.ADD_STUDY_SESSION_SUCCESS,
                        studySession: res.data.data.study_session,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.ADD_STUDY_SESSION_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Tạo ca học thất bại');
                dispatch({
                    type: types.ADD_STUDY_SESSION_ERROR
                });
            });
    };
}

export function deleteStudySession(studySessionId) {
    return function (dispatch) {
        helper.showTypeNotification('Đang xóa ca học', 'info');
        dispatch({
            type: types.BEGIN_DELETE_STUDY_SESSION,
        });
        studySessionApi.deleteStudySession(studySessionId)
            .then(() => {
                helper.showNotification("Xóa ca học thành công");
                dispatch({
                    type: types.DELETE_STUDY_SESSION_SUCCESS,
                    studySessionId: studySessionId,
                });
            })
            .catch(() => {
                helper.showNotification("Xóa ca học thất bại");
                dispatch({
                    type: types.DELETE_STUDY_SESSION_ERROR
                });
            });
    };
}

export function editStudySession(studySession, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_STUDY_SESSION,
        });
        studySessionApi.editStudySession(studySession)
            .then((res) => {
                if (res.data.status === 1) {
                    closeModal();
                    helper.showNotification("Cập nhật ca học thành công");
                    dispatch({
                        type: types.EDIT_STUDY_SESSION_SUCCESS,
                        studySession: studySession,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.EDIT_STUDY_SESSION_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Cập nhật ca học thất bại');
                dispatch({
                    type: types.EDIT_STUDY_SESSION_ERROR
                });
            });
    };
}
