import * as types from '../../constants/actionTypes';
import * as courseApi from './courseApi';


export function loadCourses() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_COURSES_DATA});
        courseApi.loadCoursesData()
            .then(res => {
                dispatch({
                    type: types.LOADED_COURSES_DATA_SUCCESS,
                    courses: res.data.courses
                });
            })
            .catch(() => {
                dispatch({type: types.LOADED_COURSES_DATA_ERROR});
            });
    };
}
