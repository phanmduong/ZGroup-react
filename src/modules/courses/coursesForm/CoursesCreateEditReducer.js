
import * as types   from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';


export default function courseReducer(state = initialState.coursesCreateEdit, action) {
    //console.log(action.type);
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
        case types.BEGIN_UPLOAD_LOGO_COURSE:
            return {
                ...state,
                ...{
                    isUpdatingLogo: true,
                    updateLogoError: false,
                }
            };
        case types.UPLOAD_LOGO_COURSE_SUCCESS:
            return {
                ...state,
                ...{
                    isUpdatingLogo: false,
                    updateLogoError: false,
                    data: action.data
                }
            };
        case types.UPLOAD_LOGO_COURSE_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingLogo: false,
                    updateLogoError: true,

                }
            };
        case types.BEGIN_UPLOAD_COVER_COURSE:
            return {
                ...state,
                ...{
                    isUpdatingCover: true,
                    updateCoverError: false,
                }
            };
        case types.UPLOAD_COVER_COURSE_SUCCESS:
            return {
                ...state,
                ...{
                    isUpdatingCover: false,
                    updateCoverError: false,
                    data: action.data
                }
            };
        case types.UPLOAD_COVER_COURSE_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingCover: false,
                    updateCoverError: true,

                }
            };
        case types.BEGIN_CREATE_EDIT_COURSES:
            return {
                ...state,
                ...{
                    isCommitting: true
                }
            };
        case types.CREATE_EDIT_COURSES_SUCCESS:
            return {
                ...state,
                ...{
                    isCommitting: false,
                    data: action.data
                }
            };
        case types.CREATE_EDIT_COURSES_ERROR:
            return {
                ...state,
                ...{
                    isCommitting: false,

                }
            };
        default:
            return state;
    }
}

