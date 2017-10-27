import * as types from '../../constants/actionTypes';
import * as courseApi from './courseApi';


export function loadCourses(page = 1) {

    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_COURSES_DATA});
        courseApi.loadCoursesData(page)
            .then(res => {
                console.log(res);
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



