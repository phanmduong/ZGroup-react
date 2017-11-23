
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function lessonsReducer(state = initialState.lessons, action) {
    switch (action.type) {
        case types.UPDATE_DATA_LESSON: {
            let feild = action.feild;
            let value = action.value;
            state.data[feild] = value;
            return {
                ...state,
                ...{
                    data: state.data
                }
            };
        }
        case types.BEGIN_CREATE_LESSON: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: true
                }
            };
        }
        case types.CREATE_LESSON_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: false
                }
            };
        }
        case types.CREATE_LESSON_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: false
                }
            };
        }
        case types.BEGIN_LOAD_DATA_LESSON: {
            return {
                ...state,
                ...{
                    isLoading: true,
                    isCommitting: false
                }
            };
        }
        case types.LOAD_DATA_LESSON_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: false,
                    data: action.data
                }
            };
        }
        case types.LOAD_DATA_LESSON_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: false
                }
            };
        }
        case types.CLEAR_DATA_LESSON: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: false,
                    data: action.data
                }
            };
        }
        default:
            return state;
    }
}

