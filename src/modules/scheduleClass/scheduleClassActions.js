import * as types from '../../constants/actionTypes';
import * as scheduleClassApi from './scheduleClassApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadScheduleClass() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_SCHEDULE_CLASSES});
        scheduleClassApi.loadScheduleClasses()
            .then(res => {
                dispatch({
                    type: types.LOAD_SCHEDULE_CLASSES_SUCCESS,
                    scheduleClasses: res.data.data.schedules
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_SCHEDULE_CLASSES_ERROR});
            });
    };
}

export function updateScheduleClassFormData(scheduleClass) {
    return {
        type: types.UPDATE_SCHEDULE_CLASS_FROM,
        scheduleClass: scheduleClass
    };
}

export function addScheduleClass(scheduleClass) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_SCHEDULE_CLASS,
        });
        scheduleClassApi.addScheduleClass(scheduleClass)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Tạo lịch học thành công");
                    dispatch({
                        type: types.ADD_SCHEDULE_CLASS_SUCCESS,
                        scheduleClass: res.data.data.schedule,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.ADD_SCHEDULE_CLASS_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Tạo lịch học thất bại');
                dispatch({
                    type: types.ADD_SCHEDULE_CLASS_ERROR
                });
            });
    };
}

export function deleteScheduleClass(scheduleClassId) {
    return function (dispatch) {
        helper.showTypeNotification('Đang xóa lịch học', 'info');
        dispatch({
            type: types.BEGIN_DELETE_SCHEDULE_CLASS,
        });
        scheduleClassApi.deleteScheduleClass(scheduleClassId)
            .then(() => {
                helper.showNotification("Xóa lịch học thành công");
                dispatch({
                    type: types.DELETE_SCHEDULE_CLASS_SUCCESS,
                    scheduleClassId: scheduleClassId,
                });
            })
            .catch(() => {
                helper.showNotification("Xóa lịch học thất bại");
                dispatch({
                    type: types.DELETE_SCHEDULE_CLASS_ERROR
                });
            });
    };
}

export function editScheduleClass(scheduleClass, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_SCHEDULE_CLASS,
        });
        scheduleClassApi.editScheduleClass(scheduleClass)
            .then((res) => {
                if (res.data.status === 1) {
                    closeModal();
                    helper.showNotification("Cập nhật lịch học thành công");
                    dispatch({
                        type: types.EDIT_SCHEDULE_CLASS_SUCCESS,
                        scheduleClass: res.data.data.schedule,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.EDIT_SCHEDULE_CLASS_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Cập nhật lịch học thất bại');
                dispatch({
                    type: types.EDIT_SCHEDULE_CLASS_ERROR
                });
            });
    };
}

export function loadStudySession() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_STUDY_SESSION});
        scheduleClassApi.loadStudySession()
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
