/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.good, action) {
    switch (action.type) {
        case types.CREATE_BASE_SUCCESS:
            return {
                ...state,
                createBase: {
                    ...state.createBase, isSavingBase: false,
                    base: {
                        name: "",
                        address: ""
                    }
                }
            };
        default:
            return state;
    }

}