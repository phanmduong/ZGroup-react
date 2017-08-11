/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';

// import _ from 'lodash';

export function loadBase() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASE
        });
    };
}


