import * as types from '../../constants/actionTypes';
import * as courseApi from './courseApi';
import * as helper from '../../helpers/helper';

export function loadCourses(page = 1, query='') {

    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_COURSES_DATA});
        courseApi.loadCoursesData(page,query)
            .then(res => {
                dispatch({
                    type: types.LOADED_COURSES_DATA_SUCCESS,
                    courses: res.data.courses,
                    paginator : res.data.paginator
                });
            })
            .catch(() => {
                dispatch({type: types.LOADED_COURSES_DATA_ERROR});
            });
    };
}

export function deleteCourse(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_COURSES,
        });
        courseApi.deleteCourse(id)
            .then(() => {
                helper.showNotification('Xóa môn học thành công');
                dispatch({
                    type: types.DELETE_COURSES_SUCCESS,
                    courseId: id
                });
            })
            .catch(() => {
                helper.showNotification('Xóa môn học thất bại');
                dispatch({
                    type: types.DELETE_COURSES_ERROR,
                });
            });
    };

}


