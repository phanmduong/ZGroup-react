import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function orderedDetailReducer(state = initialState.orderedDetail, action) {
    switch (action.type) {
        case types.GET_MANUFACTURES_CREATE_PRODUCT:
            return {
                ...state,

            };
        default:
            return state;
    }
}
