import * as types from '../../constants/actionTypes';
import * as lessonsApi from './lessonsApi';
import * as helper from '../../helpers/helper';
import { browserHistory } from 'react-router';
// import * as courseApi from "../courses/courseApi";


export function loadLessonData(id) {

    return function (dispatch) {
        dispatch({ type: types.BEGIN_LOAD_DATA_LESSON });
        lessonsApi.loadLessonDetail(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_DATA_LESSON_SUCCESS,
                    data: res.data.data.lesson
                });
            })
            .catch(() => {
                dispatch({ type: types.LOAD_DATA_LESSON_ERROR });
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
                created_at: "",
                term_id: "",
                audio_url: "",
                video_url: "",
                image_url: "",
            }
        });

    };
}

export function createLesson(data, courseid) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_CREATE_LESSON, data: data });
        helper.showNotification("Đang tạo...");
        lessonsApi.createLesson(data)
            .then(res => {
                helper.showNotification("Tạo Thành Công!");
                dispatch({
                    type: types.CREATE_LESSON_SUCCESS,
                    data: res
                });
                browserHistory.push("/teaching/courses/edit/" + courseid);
            })
            .catch(() => {
                helper.sweetAlertError("Có lỗi xảy ra! ");
                dispatch({ type: types.CREATE_LESSON_ERROR });
            });
    };
}
export function editLesson(data) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_EDIT_LESSON, data: data });
        helper.showNotification("Đang sửa...");
        lessonsApi.editLesson(data)
            .then(res => {
                helper.showNotification("Sửa Thành Công!");
                dispatch({
                    type: types.EDIT_LESSON_SUCCESS,
                    data: res
                });
                browserHistory.push("/teaching/courses/edit/" + data.course_id);
            })
            // .catch((err) => {
            //     helper.sweetAlertError("Có lỗi xảy ra! " + err);
            //     dispatch({ type: types.EDIT_LESSON_ERROR });
            // })
        ;
    };
}
export function loadTerms(courseId) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_LOAD_TERMS });
        lessonsApi.loadTerms(courseId)
            .then(res => {
                dispatch({
                    type: types.LOAD_TERMS_SUCCESS,
                    terms: res.data.data.terms,
                });
            })
            .catch(() => {
                dispatch({ type: types.LOAD_TERMS_ERROR });
            });
    };
}

export function uploadLessonIcon(url) {
    return function (dispatch) {


        dispatch({
            type: types.UPLOAD_ICON_LESSON_SUCCESS,
            url,
        });

    };
}