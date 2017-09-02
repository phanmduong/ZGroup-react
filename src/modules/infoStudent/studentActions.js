import * as types from '../../constants/actionTypes';
import * as studentApi from './studentApi';
// import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadInfoStudent(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_INFO_STUDENT});
        studentApi.loadInfoStudent(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_INFO_STUDENT_SUCCESS,
                    student: res.data.data.student
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_INFO_STUDENT_ERROR});
            });
    };
}

export function loadRegisters(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_REGISTERS_INFO_STUDENT});
        studentApi.loadRegisters(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_REGISTERS_INFO_STUDENT_SUCCESS,
                    registers: res.data.data.registers
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_REGISTERS_INFO_STUDENT_ERROR});
            });
    };
}

export function loadHistoryCalls(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_HISTORY_CALLS_INFO_STUDENT});
        studentApi.historyCalls(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_HISTORY_CALLS_INFO_STUDENT_SUCCESS,
                    historyCalls: res.data.data.history_calls
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_HISTORY_CALLS_INFO_STUDENT_ERROR});
            });
    };
}

export function loadProgress(studentId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_PROGRESS_INFO_STUDENT});
        studentApi.loadProgress(studentId)
            .then(res => {
                dispatch({
                    type: types.LOAD_PROGRESS_INFO_STUDENT_SUCCESS,
                    progress: res.data.data.progress
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_PROGRESS_INFO_STUDENT_ERROR});
            });
    };
}

export function editInfoStudent(student, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_EDIT_INFO_STUDENT});
        studentApi.editStudent(student)
            .then(res => {
                closeModal();
                dispatch({
                    type: types.LOAD_EDIT_INFO_STUDENT_SUCCESS,
                    student: res.data.data.student
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_EDIT_INFO_STUDENT_ERROR});
            });
    };
}
