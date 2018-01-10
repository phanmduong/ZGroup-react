import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function surveyReducer(state = initialState.survey, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_SURVEYS_LIST:
            return {
                ...state,
                    isLoading: true,

            };
        case types.LOAD_SURVEYS_LIST_SUCCESS:
            return {
                ...state,
                    isLoading: false,
                    surveys: action.surveys,
            };
        default:
            return state;
    }
}
