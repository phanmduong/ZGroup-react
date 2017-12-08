import * as types from '../../constants/actionTypes';
import * as attendanceApi from './attendanceApi';
import * as helper      from '../../helpers/helper';

export function loadGensData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA_ATTENDANCE
        });
        attendanceApi.loadGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_ATTENDANCE_SUCCESS,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GENS_ATTENDANCE_ERROR
            });
        });
    };
}

export function loadBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_DATA_ATTENDANCE
        });
        attendanceApi.loadBases()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_ATTENDANCE_SUCCESS,
                    bases: res.data.data.bases,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_ATTENDANCE_ERROR
            });
        });
    };
}



export function loadClasses(search ="", page="", teacherId="", baseid='' , genid='') {
    return function (dispatch) {
        dispatch({
            type: types.ATTENDANCE_BEGIN_LOAD_CLASS_DATA,
        });
        attendanceApi.loadClasses(search, page, teacherId, baseid , genid)
            .then((res) => {
                dispatch({
                    type: types.ATTENDANCE_LOAD_CLASS_DATA_SUCCESS,
                    data: res.data
                });
            }).catch((err) => {
            helper.showErrorNotification(err);
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

