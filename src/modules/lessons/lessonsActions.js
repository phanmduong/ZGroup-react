import * as types       from '../../constants/actionTypes';
import * as lessonsApi   from './lessonsApi';
import * as helper      from '../../helpers/helper';
import {browserHistory}  from 'react-router';


export function loadLessonData(id) {

    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_DATA_LESSON});
        lessonsApi.loadLessonDetail(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_DATA_LESSON_SUCCESS,
                    data: res.data.data.lesson
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_DATA_LESSON_ERROR});
            });
    };
}


export function updateData(feild, value) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_LESSON,
            feild: feild,
            value: value
        });

    };
}

export function clearData(course_id) {
    return function (dispatch) {
        dispatch({
            type: types.CLEAR_DATA_LESSON,
            data: {
                id: null,
                course_id: course_id,
                name: "",
                description: "",
                detail: "",
                order: "",
                detail_content: "",
                detail_teacher: "",
                created_at: ""
            }
        });

    };
}

export function createLesson(data, courseid) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_LESSON, data: data});
        helper.showNotification("Đang tạo...");
        lessonsApi.createLesson(data)
            .then(res => {
                helper.showNotification("Tạo Thành Công!");
                dispatch({
                    type: types.CREATE_LESSON_SUCCESS,
                    data: res
                });
                browserHistory.push("/manage/courses/edit/" + courseid + "/curriculum");
            })
            .catch(() => {
                helper.sweetAlertError("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_LESSON_ERROR});
            });
    };
}
export function editLesson(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_LESSON, data: data});
        helper.showNotification("Đang sửa...");
        lessonsApi.editLesson(data)
            .then(res => {
                helper.showNotification("Sửa Thành Công!");
                dispatch({
                    type: types.EDIT_LESSON_SUCCESS,
                    data: res
                });
                browserHistory.push("/manage/courses/edit/" + data.course_id + "/curriculum");
            })
            .catch((err) => {
                helper.sweetAlertError("Có lỗi xảy ra! " + err);
                dispatch({type: types.EDIT_LESSON_ERROR});
            });
    };
}