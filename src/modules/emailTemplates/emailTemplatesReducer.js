/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let emailTemplates;
export default function baseListReducer(state = initialState.emailTemplates, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_EMAIL_TEMPLATES:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_EMAIL_TEMPLATES_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    templates: action.templates
                }
            };
        case types.LOAD_EMAIL_TEMPLATES_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.DELETE_EMAIL_TEMPLATE_SUCCESS:
            emailTemplates = deleteEmailTemplate(action.emailTemplateId, state.templates);
            return {
                ...state,
                templates: emailTemplates
            };
        case types.BEGIN_UPLOAD_IMAGE_EMAIL_TEMPLATE:
            return {
                ...state,
                ...{
                    isUpdatingThumbnail: true,
                    updateThumbnailError: false
                }
            };
        case types.UPLOAD_IMAGE_EMAIL_TEMPLATE_SUCCESS:
            return {
                ...state,
                ...{
                    isUpdatingThumbnail: false,
                    updateThumbnailError: false,
                    emailTemplate: {
                        ...state.emailTemplate,
                        thumbnailUrl: action.imageUrl
                    }
                }
            };
        case types.UPLOAD_IMAGE_EMAIL_TEMPLATE_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingThumbnail: false,
                    updateThumbnailError: true
                }
            };
        case types.UPDATE_EMAIL_TEMPLATE_DATA:
            return {
                ...state,
                emailTemplate: action.emailTemplate
            };
        case types.BEGIN_SAVE_EMAIL_TEMPLATE:
            return {
                ...state,
                ...{

                    isSaving: true,
                    saveError: false,
                }
            };
        case types.SAVE_EMAIL_TEMPLATE_SUCCESS:
            return {
                ...state,
                ...{

                    isSaving: false,
                    saveError: false,
                }
            };
        case types.SAVE_EMAIL_TEMPLATE_FAILED:
            return {
                ...state,
                ...{
                    isSaving: false,
                    saveError: true,
                }
            };
        case types.BEGIN_LOAD_EMAIL_TEMPLATE:
            return {
                ...state,
                ...{
                    emailTemplate: {
                        ...state.emailTemplate,
                        ...{
                            isLoading: true,
                            error: false,
                        }
                    }
                }
            };
        case types.LOAD_EMAIL_TEMPLATE_SUCCESS:
            return {
                ...state,
                ...{
                    emailTemplate: {
                        ...state.emailTemplate,
                        ...{
                            isLoading: false,
                            error: false,
                            id: action.emailTemplate.id,
                            name: action.emailTemplate.name,
                            thumbnailUrl: action.emailTemplate.thumbnail_url,
                            content: action.emailTemplate.content,
                        }
                    }
                }
            };
        case types.LOAD_EMAIL_TEMPLATE_ERROR:
            return {
                ...state,
                ...{
                    emailTemplate: {
                        ...state.emailTemplate,
                        ...{
                            isLoading: false,
                            error: true,
                        }
                    }
                }
            };
        default:
            return state;
    }
}

function deleteEmailTemplate(emailTemplateId, emailTemplates) {
    if (emailTemplates) {
        emailTemplates = emailTemplates.filter(emailTemplate => emailTemplate.id !== emailTemplateId);
    }
    return emailTemplates;
}