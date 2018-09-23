
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function lessonsReducer(state = initialState.lessons, action) {
    switch (action.type) {
        case types.UPDATE_DATA_LESSON: {
            let feild = action.feild;
            let value = action.value;
            let data = {...state.data};
            data[feild] = value;
            return {
                ...state,
                ...{
                    data: data
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
        case types.BEGIN_EDIT_LESSON: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: true
                }
            };
        }
        case types.EDIT_LESSON_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isCommitting: false
                }
            };
        }
        case types.EDIT_LESSON_ERROR: {
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

        case types.BEGIN_UPLOAD_ICON_LESSON: {
            return {
                ...state,
                ...{
                    isUploadingLessonIcon: true,
                }
            };
        }
        case types.UPLOAD_ICON_LESSON_SUCCESS: {
            let newdata = {...state.data};
            newdata.image_url = action.url;
            return {
                ...state,
                ...{
                    isUploadingLessonIcon: false,
                    data: newdata,
                }
            };
        }
        case types.UPLOAD_ICON_LESSON_FAILED: {
            return {
                ...state,
                ...{
                    isUploadingLessonIcon: false,
                }
            };
        }
        case types.BEGIN_LOAD_TERMS: {
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        }
        case types.LOAD_TERMS_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    terms: action.terms,
                }
            };
        }
        case types.LOAD_TERMS_ERROR: {
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

