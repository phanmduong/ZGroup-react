
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let data;
export default function courseReducer(state = initialState.courses, action) {
    console.log(action.type);
    switch (action.type) {
        case types.BEGIN_LOAD_COURSES_DATA:
            return {
                ...state,
                ...{
                    isLoading   : true,
                    error       : false,
                    paginator   : {current_page: action.page}
                }
            };
        case types.LOADED_COURSES_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading       : false,
                    error           : false,
                    coursesList     : action.courses,
                    paginator       : action.paginator
                }
            };
        case types.LOADED_COURSES_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading   : false,
                    error       : true,
                }
            };
        case types.BEGIN_DELETE_COURSES:
            return {
                ...state,
            };

        case types.DELETE_COURSES_SUCCESS:
            data = deleteCourse(action.courseId,state.coursesList);
            return {
                ...state,
                ...{
                    isLoading   : false,
                    error       : false,
                    coursesList : data
                }
            };
        case types.DELETE_COURSES_ERROR:
            return {
                ...state,
                ...{

                }
            };
        default:
            return state;
    }
}

function deleteCourse(courseId, courseList) {
    if (courseList) {
        courseList = courseList.filter(course => course.id !== courseId);
    }
    return courseList;
}