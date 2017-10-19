/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as attendanceStudentApi from './attendanceStudentApi';
import {showErrorNotification, showNotification, showTypeNotification} from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadGensData() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_GENS_ATTENDANCE_STUDENT});
        attendanceStudentApi.loadGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_ATTENDANCE_STUDENT_SUCCESSFUL,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen.id,
                    isLoading: false,
                    error: false
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_GENS_ATTENDANCE_STUDENT_ERROR});
            });
    };
}

