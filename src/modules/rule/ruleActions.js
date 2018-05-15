/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as ruleApi from './ruleApi';



export function loadRules() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_RULES_VIEW
        });
        ruleApi.loadRule()
            .then((res) => {
                dispatch({
                    type: types.LOAD_RULES_VIEW_SUCCESS,
                    ruleView: res.data.data.content
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_RULES_VIEW_ERROR
                });
            });
    };
}
