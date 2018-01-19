import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function orderedDetailReducer(state = initialState.orderedDetail, action) {
    switch (action.type) {
        case types.HANDLE_ORDER_ORDERED_DETAIL:
            return {
                ...state,
                order: action.order
            };
        default:
            return state;
    }
}
