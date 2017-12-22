
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function jobAssignmentReducer(state = initialState.jobAssignment, action) {
    switch (action.type) {
        case types.CLEAR_DATA_LESSON: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        default:
            return state;
    }
}

