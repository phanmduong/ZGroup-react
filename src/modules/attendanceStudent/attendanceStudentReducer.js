/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function attendanceStudentReducer(state = initialState.attendanceStudent, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_ATTENDANCE_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                    errorGens: false,
                }
            };
        case types.LOAD_GENS_ATTENDANCE_STUDENT_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: false,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_ATTENDANCE_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: true,
                }
            };
        default:
            return state;
    }

}
