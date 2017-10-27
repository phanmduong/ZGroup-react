
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';


export default function courseReducer(state = initialState.coursesCreateEdit, action) {
    console.log(action.type);
    switch (action.type) {
        case types.BEGIN_LOAD_COURSE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_COURSE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    data: action.data
                }
            };
        case types.LOAD_COURSE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.BEGIN_UPLOAD_AVATAR_COURSE:
            return {
                ...state,
                ...{
                    isUpdatingAvatar: true,
                    updateAvatarError: false,
                }
            };
        case types.UPLOAD_AVATAR_COURSE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    isUpdatingAvatar: false,
                    updateAvatarError: false,
                    data: action.data
                }
            };
        case types.UPLOAD_AVATAR_COURSE_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingAvatar: false,
                    updateAvatarError: true,

                }
            };
        default:
            return state;
    }
}

