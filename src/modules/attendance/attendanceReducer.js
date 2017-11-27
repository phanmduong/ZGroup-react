
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function attendanceReducer(state = initialState.attendance, action) {
    console.log(action.type);
    switch (action.type) {
        case types.ATTENDANCE_BEGIN_LOAD_CLASS_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.ATTENDANCE_LOAD_CLASS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: action.data,
                }
            };
        case types.ATTENDANCE_LOAD_CLASS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_LOAD_LESSON_CLASS_MODAL:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.LOAD_LESSON_CLASS_MODAL_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    class: action.class,
                    data: state.data,
                }
            };
        case types.LOAD_LESSON_CLASS_MODAL_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        default:        return state;
    }
}