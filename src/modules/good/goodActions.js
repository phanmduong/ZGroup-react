/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';

// import _ from 'lodash';
/*eslint no-console: 0 */
export function resetBase() {
    return function (dispatch) {
        dispatch({
            type: types.RESET_CREATE_BASE_DATA
        });
    };
}
