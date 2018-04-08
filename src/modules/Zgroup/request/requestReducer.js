/**
 * Created by nangbandem
 */
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function requestReducer(state = initialState.request, action) {
    // console.log(action.type, state.data);
    switch (action.type) {
        case types.BEGIN_CREATE_REQUEST_VACATION:
            return {
                ...state,
                isCommitting: true,
            };
        case types.CREATE_REQUEST_VACATION_SUCCESS: {
            return {
                ...state,
                isCommitting: false,
            };
        }

        case types.CREATE_REQUEST_VACATION_ERROR:
            return {
                ...state,
                isCommitting: false,
            };

        default:
            return state;
    }
}
