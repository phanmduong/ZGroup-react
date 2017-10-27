
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';


export default function courseReducer(state = initialState.coursesCreateEdit, action) {
    console.log(action.type);
    switch (action.type) {
        case types.BEGIN_LOAD_COURSE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_COURSE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    data: action.data
                }
            };
        case types.LOAD_COURSE_ERROR:
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

