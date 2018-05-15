/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let emailForms;
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
        case types.BEGIN_UPLOAD_AVATAR_EMAIL_FORM:
            return {
                ...state,
                ...{
                    isUpdatingAvatar: true,
                    updateAvatarError: false
                }
            };
        case types.UPLOAD_AVATAR_EMAIL_FORM_SUCCESS:
            return {
                ...state,
                ...{
                    isUpdatingAvatar: false,
                    updateAvatarError: false,
                    emailForm: {
                        ...state.emailForm,
                        avatarUrl: action.imageUrl
                    }
                }
            };
        case types.UPLOAD_AVATAR_EMAIL_FORM_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingAvatar: false,
                    updateAvatarError: true
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
                    emailForm: {
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
                    emailForm: {
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
        case types.DELETE_EMAIL_FORM_SUCCESS:
            emailForms = deleteEmailForm(action.emailFormId, state.forms);
            return {
                ...state,
                forms: emailForms
            };
        case types.BEGIN_LOAD_EMAIL_FORM:
            return {
                ...state,
                ...{
                    emailForm: {
                        ...state.emailForm,
                        ...{
                            isLoading: true,
                            error: false,
                        }
                    }
                }
            };
        case types.LOAD_EMAIL_FORM_SUCCESS:
            return {
                ...state,
                ...{
                    emailForm: {
                        ...state.emailForm,
                        ...{
                            isLoading: false,
                            error: false,
                            id: action.emailForm.id,
                            name: action.emailForm.name,
                            logoUrl: action.emailForm.logo_url,
                            title: action.emailForm.title,
                            subtitle: action.emailForm.subtitle,
                            template: action.emailForm.template,
                            content: action.emailForm.content,
                            footer: action.emailForm.footer,
                            avatarUrl: action.emailForm.avatar_url,
                            titleButton: action.emailForm.title_button,
                            linkButton: action.emailForm.link_button,
                        }
                    }
                }
            };
        case types.LOAD_EMAIL_FORM_ERROR:
            return {
                ...state,
                ...{
                    emailForm: {
                        ...state.emailForm,
                        ...{
                            isLoading: false,
                            error: true,
                        }
                    }
                }
            };
        case types.BEGIN_SEND_MAIL_FORM_TEST:
            return {
                ...state,
                ...{
                    isSendingMail: true,
                    errorSendMail: false,
                }
            };
        case types.SEND_EMAIL_FORM_SUCCESS:
            return {
                ...state,
                ...{
                    isSendingMail: false,
                    errorSendMail: false,
                }
            };
        case types.SEND_EMAIL_FORM_ERROR:
            return {
                ...state,
                ...{
                    isSendingMail: false,
                    errorSendMail: true
                }
            };
        case types.LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                ...{
                    subscribersList: action.subscribersList
                }
            };
        case types.BEGIN_STORE_EMAIL_CAMPAIGN:
            return {
                ...state,
                ...{
                    isStoring: true,
                    errorStore: false,
                }
            };
        case types.STORE_EMAIL_CAMPAIGN_SUCCESS:
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: false,
                }
            };
        case types.STORE_EMAIL_CAMPAIGN_ERROR:
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: true
                }
            };
        case types.BEGIN_CHANGE_HIDE_EMAIL_FORM:
            return {
                ...state,
                forms: changeHideForm(action.emailFormId, action.hide, state.forms)
            };
        default:
            return state;
    }
}

function changeHideForm(emailFormId, hide, forms) {
    if (forms) {
        forms = forms.map((form) => {
            if (form.id === emailFormId) {
                return {
                    ...form,
                    hide: hide
                };
            }
            return form;
        });
    }
    return forms;
}

function deleteEmailForm(emailFormId, emailFormsData) {
    if (emailFormsData) {
        emailFormsData = emailFormsData.filter(emailForm => emailForm.id !== emailFormId);
    }
    return emailFormsData;
}