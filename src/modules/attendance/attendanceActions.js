import * as types from '../../constants/actionTypes';
import * as attendanceApi from './attendanceApi';
import * as helper from '../../helpers/helper';


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

