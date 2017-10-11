
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';


export default function courseReducer(state = initialState.courses, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_COURSES_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOADED_COURSES_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    courses: action.courses
                }
            };
        case types.LOADED_COURSES_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };

        default:
            return state;
    }
}

