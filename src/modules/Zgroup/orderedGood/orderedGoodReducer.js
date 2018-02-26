/**
 * Created by nangbandem
 */
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function orderedGoodReducer(state = initialState.orderedGood, action) {
    // console.log(action.type, state.data);
    switch (action.type) {
        case types.BEGIN_LOAD_EXPORT_ORDERS:
            return {
                ...state,
            };
        default:
            return state;
    }
}
