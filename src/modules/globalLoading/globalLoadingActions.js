import * as types from '../../constants/actionTypes';
// import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function display() {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
    };
}

export function hide() {
    return function (dispatch) {
        dispatch({
            type: types.HIDE_GLOBAL_LOADING
        });
    };
}
