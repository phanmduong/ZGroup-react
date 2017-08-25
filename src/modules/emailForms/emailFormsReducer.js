/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.emailForms, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_EMAIL_FORMS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_EMAIL_FORMS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    forms: action.forms
                }
            };
        case types.LOAD_EMAIL_FORMS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.UPDATE_EMAIL_FORM_DATA:
            return {
                ...state,
                emailForm: action.emailForm
            };
        case types.BEGIN_UPLOAD_IMAGE_EMAIL_FORM:
            return {
                ...state,
                ...{
                    isUpdatingLogo: true,
                    updateLogoError: false
                }
            };
        case types.UPLOAD_IMAGE_EMAIL_FORM_SUCCESS:
            return {
                ...state,
                ...{
                    isUpdatingLogo: false,
                    updateLogoError: false,
                    emailForm: {
                        ...state.emailForm,
                        logoUrl: action.imageUrl
                    }
                }
            };
        case types.UPLOAD_IMAGE_EMAIL_FORM_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingLogo: false,
                    updateLogoError: true
                }
            };
        case types.BEGIN_LOAD_EMAIL_TEMPLATES:
            return {
                ...state,
                ...{
                    emailTemplates: {
                        ...state.emailTemplates,
                        ...{
                            isLoading: true,
                            error: false,
                        }
                    }
                }
            };
        case types.LOAD_EMAIL_TEMPLATES_SUCCESS:
            return {
                ...state,
                ...{
                    emailTemplates: {
                        ...state.emailTemplates,
                        ...{
                            isLoading: false,
                            error: false,
                            currentPage: action.currentPage,
                            totalPages: action.totalPages,
                            templates: action.templates
                        }
                    }
                }
            };
        case types.LOAD_EMAIL_TEMPLATES_ERROR:
            return {
                ...state,
                ...{
                    emailTemplates: {
                        ...state.emailTemplates,
                        ...{
                            isLoading: false,
                            error: true
                        }
                    }
                }
            };
        case types.CHOOSE_EMAIL_TEMPLATE_FOR_EMAIL_FORM:
            return {
                ...state,
                ...{
                    emailForm: {
                        ...state.emailForm,
                        template: action.template
                    }
                }
            };
        case types.BEGIN_SAVE_EMAIL_FORM:
            return {
                ...state,
                ...{

                    isSaving: true,
                    saveError: false,
                }
            };
        case types.SAVE_EMAIL_FORM_SUCCESS:
            return {
                ...state,
                ...{

                    isSaving: false,
                    saveError: false,
                    emailForm:{
                        ...state.emailForm,
                        id: action.emailFormId,
                    }
                }
            };
        case types.SAVE_EMAIL_FORM_FAILED:
            return {
                ...state,
                ...{
                    isSaving: false,
                    saveError: true,
                }
            };
        case types.BEGIN_PRE_SAVE_EMAIL_FORM:
            return {
                ...state,
                ...{

                    isPreSaving: true,
                    preSaveError: false,
                }
            };
        case types.PRE_SAVE_EMAIL_FORM_SUCCESS:
            return {
                ...state,
                ...{

                    isPreSaving: false,
                    preSaveError: false,
                    emailForm:{
                        ...state.emailForm,
                        id: action.emailFormId,
                    }
                }
            };
        case types.PRE_SAVE_EMAIL_FORM_FAILED:
            return {
                ...state,
                ...{
                    isPreSaving: false,
                    preSaveError: true,
                }
            };
        default:
            return state;
    }

}