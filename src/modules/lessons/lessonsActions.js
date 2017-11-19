import * as types       from '../../constants/actionTypes';
import * as lessonsApi   from './lessonsApi';
import * as helper      from '../../helpers/helper';



export function loadLessonData(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DATA_LESSON
        });
        lessonsApi.loadLessonDetail(id)
            .then(res => {
                dispatch({
                    type: types.LOAD_DATA_LESSON_SUCCESS,
                    data: res.data.data.lesson
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
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

export function commitData(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_LESSON, data: data});
        lessonsApi.commitLesson(data)
            .then(res => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_LESSON_SUCCESS,
                    data: res
                });
                //browserHistory.push("/manage/courses");
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_LESSON_ERROR});
            });
    };
}