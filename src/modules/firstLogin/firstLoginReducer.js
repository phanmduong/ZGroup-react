/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function firstLoginReducer(state = initialState.firstLogin, action) {
    switch (action.type) {

        case types.BEGIN_LOAD_MY_PROFILE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_MY_PROFILE_SUCCESSFULL:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    profile: action.profile
                }
            };
        case types.LOAD_MY_PROFILE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false
                }
            };

        case types.BEGIN_CHANGE_AVATAR_PROFILE:
            return {
                ...state,
                ...{
                    isChangingAvatar: true,
                }
            };
        case types.CHANGE_AVATAR_PROFILE_SUCCESS:
            return {
                ...state,
                ...{
                    isChangingAvatar: false,
                    profile: {
                        ...state.profile,
                        avatar_url: action.avatar_url
                    }
                }
            };
        case types.UPDATE_EDIT_PROFILE_FORM_DATA: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case types.BEGIN_UPDATE_PROFILE:
            return {
                ...state,
                ...{
                    isSaving: true,
                    savingError: false,
                    updateSuccess: false,
                }
            };
        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                ...{
                    isSaving: false,
                    savingError: false,
                    updateSuccess: true,
                }
            };
        case types.UPDATE_PROFILE_ERROR:
            return {
                ...state,
                ...{
                    isSaving: false,
                    savingError: true,
                    updateSuccess: false,
                }
            };
        case types.BEGIN_CHANGE_PASSWORD_PROFILE:
            return {
                ...state,
                ...{
                    isChangingPassword: true,
                    errorChangePassword: false
                }
            };
        case types.CHANGE_PASSWORD_PROFILE_SUCCESS:
            return {
                ...state,
                ...{
                    isChangingPassword: false,
                    errorChangePassword: false
                }
            };
        case types.CHANGE_PASSWORD_PROFILE_ERROR:
            return {
                ...state,
                ...{
                    isChangingPassword: false,
                    errorChangePassword: true,
                }
            };
        default:
            return state;
    }
}

