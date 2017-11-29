import * as types from '../../constants/actionTypes';
import * as attendanceApi from './attendanceApi';


export function loadClasses(search ="", page="", teacherId="") {
    return function (dispatch) {
        dispatch({
            type: types.ATTENDANCE_BEGIN_LOAD_CLASS_DATA,
        });
        attendanceApi.loadClasses(search, page, teacherId)
            .then((res) => {
                dispatch({
                    type: types.ATTENDANCE_LOAD_CLASS_DATA_SUCCESS,
                    data: res.data
                });
            }).catch(() => {
            dispatch({

                type: types.ATTENDANCE_LOAD_CLASS_DATA_ERROR,
            });
        });
    };
}
export function loadClassLessonModal(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_LESSON_CLASS_MODAL,
        });
        attendanceApi.loadClassLessonModal(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_LESSON_CLASS_MODAL_SUCCESS,
                    class: res.data.data.class_lessons,
            });
            }).catch(() => {
            dispatch({

                type: types.LOAD_LESSON_CLASS_MODAL_ERROR,
            });
        });
    };
}
export function loadLessonDetailModal(classid, lessonid) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_LESSON_DETAIL_MODAL,
        });
        attendanceApi.loadLessonDetailModal(classid, lessonid)
            .then((res) => {
                dispatch({
                    type: types.LOAD_LESSON_DETAIL_MODAL_SUCCESS,
                    lesson: res.data.data.data.attendances
            });
            }).catch(() => {
            dispatch({

                type: types.LOAD_LESSON_DETAIL_MODAL_ERROR,

            });
        });
    };
}


export function takeAttendance(classid, lessonid, studentid, index) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_TAKE_ATTENDANCE,
            index: index,
        });
        attendanceApi.takeAttendance(classid, lessonid, studentid, index)
            .then(() => {
                dispatch({
                    type: types.TAKE_ATTENDANCE_SUCCESS,
                    index: index,
            });
            }).catch(() => {
            dispatch({

                type: types.TAKE_ATTENDANCE_ERROR,
                index: index,

            });
        });
    };
}

