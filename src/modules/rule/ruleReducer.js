/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function registerReducer(state = initialState.rule, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_RULES_VIEW:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_RULES_VIEW_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    ruleView: action.ruleView
                }
            };
        case types.LOAD_RULES_VIEW_ERROR:
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




