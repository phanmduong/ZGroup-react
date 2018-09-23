import * as types from '../../constants/actionTypes';
import * as emailFormApi from './emailFormApi';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';
import async from 'async';

export function loadForms(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_FORMS,
        });
        emailFormApi.loadForms(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_FORMS_SUCCESS,
                    forms: res.data.email_forms,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_FORMS_ERROR,
                });
            });
    };
}

export function updateEmailFormData(emailForm) {
    return ({
        type: types.UPDATE_EMAIL_FORM_DATA,
        emailForm: emailForm
    });
}

export function uploadImage(file) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_EMAIL_FORM
        });
        emailFormApi.uploadImage(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            dispatch(uploadImageEmailFormSuccess(data.link));
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch(uploadImageEmailFormFailed());
        });
    };
}

export function uploadImageEmailFormSuccess(imageUrl) {
    return (
        {
            type: types.UPLOAD_IMAGE_EMAIL_FORM_SUCCESS,
            imageUrl: imageUrl
        }
    );
}

export function uploadImageEmailFormFailed() {
    return (
        {
            type: types.UPLOAD_IMAGE_EMAIL_FORM_FAILED,
        }
    );
}

export function uploadAvatar(file) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_AVATAR_EMAIL_FORM
        });
        emailFormApi.uploadImage(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            dispatch(uploadAvatarEmailFormSuccess(data.link));
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch(uploadAvatarEmailFormFailed());
        });
    };
}

export function uploadAvatarEmailFormSuccess(imageUrl) {
    return (
        {
            type: types.UPLOAD_AVATAR_EMAIL_FORM_SUCCESS,
            imageUrl: imageUrl
        }
    );
}

export function uploadAvatarEmailFormFailed() {
    return (
        {
            type: types.UPLOAD_AVATAR_EMAIL_FORM_FAILED,
        }
    );
}

export function loadTemplates(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_TEMPLATES,
        });
        emailFormApi.loadTemplates(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_SUCCESS,
                    templates: res.data.email_templates,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_ERROR,
                });
            });
    };
}

export function chooseTemplate(template) {
    return ({
        type: types.CHOOSE_EMAIL_TEMPLATE_FOR_EMAIL_FORM,
        template: template
    });
}

export function saveEmailForm(emailForm) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_EMAIL_FORM
        });
        emailFormApi.saveEmailForm(emailForm, 1)
            .then((res) => {
                helper.showNotification("Tải lên thành công");
                browserHistory.push('/email/email-maketing/forms');
                dispatch({
                    type: types.SAVE_EMAIL_FORM_SUCCESS,
                    emailFormId: res.data.data.email_form.id,
                });
            }).catch(() => {
            helper.showErrorNotification("Tải lên thất bại");
            dispatch({
                type: types.SAVE_EMAIL_FORM_FAILED
            });
        });
    };
}


export function preSaveEmailForm(emailForm) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_PRE_SAVE_EMAIL_FORM
        });
        emailFormApi.saveEmailForm(emailForm)
            .then((res) => {
                dispatch({
                    type: types.PRE_SAVE_EMAIL_FORM_SUCCESS,
                    emailFormId: res.data.data.email_form.id,
                });
            }).catch(() => {
            helper.showNotification("Tải lên thất bại");
            dispatch({
                type: types.PRE_SAVE_EMAIL_FORM_FAILED
            });
        });
    };
}

export function deleteEmailForm(emailFormId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_EMAIL_FORM,
        });
        emailFormApi.deleteEmailForm(emailFormId)
            .then(() => {
                helper.showNotification('Xóa email form thành công');
                dispatch({
                    type: types.DELETE_EMAIL_FORM_SUCCESS,
                    emailFormId
                });
            })
            .catch(() => {
                helper.showErrorNotification('Xóa email form thất bại');
                dispatch({
                    type: types.DELETE_EMAIL_FORM_ERROR,
                });
            });
    };
}

export function loadEmailForm(emailFormId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_FORM,
        });
        emailFormApi.loadEmailForm(emailFormId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_EMAIL_FORM_SUCCESS,
                    emailForm: res.data.data.email_form
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_FORM_ERROR,
                });
            });
    };
}

export function sendMailTest(emailForm, email) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SEND_MAIL_FORM_TEST,
        });
        async.waterfall([
            function (callback) {
                emailFormApi.saveEmailForm(emailForm)
                    .then((res) => {
                        callback(null, {emailFormId: res.data.data.email_form.id,});
                    }).catch(() => {
                    callback("Lỗi lưu email form");
                });
            },
            function (emailForm, callback) {
                emailFormApi.sendMailTest(emailForm.emailFormId, email)
                    .then((res) => {
                        if (res.data.status === 1) {
                            callback(null, res.data);
                        } else {
                            callback(res.data.data.message);
                        }
                    }).catch(() => {
                    callback("Gửi mail lỗi");
                });
            }
        ], function (err, result) {
            if (err) {
                helper.showErrorNotification(err);
                dispatch({
                    type: types.SEND_EMAIL_FORM_ERROR,
                });
            }
            if (result.status === 1) {
                helper.showNotification("Gửi mail thành công");
                dispatch({
                    type: types.SEND_EMAIL_FORM_SUCCESS,
                });
            }
        });
    };
}


export function loadSubscribersList() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS,
        });
        emailFormApi.loadSubscribersList()
            .then(res => {
                dispatch({
                    type: types.LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS_SUCCESS,
                    subscribersList: res.data.data.subscribers_list,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS_ERROR,
                });
            });
    };
}

export function storeCampaign(emailForm, campaign, closeModal) {

    if (helper.isEmptyInput(campaign.id)) {
        campaign.id = "";
    }

    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_EMAIL_CAMPAIGN,
        });
        async.waterfall([
            function (callback) {
                emailFormApi.saveEmailForm(emailForm, 1)
                    .then((res) => {
                        dispatch({
                            type: types.SAVE_EMAIL_FORM_SUCCESS,
                            emailFormId: res.data.data.email_form.id,
                        });
                        callback(null, res.data.data.email_form.id);
                    }).catch(() => {
                    dispatch({
                        type: types.SAVE_EMAIL_FORM_FAILED
                    });
                    callback("Lưu email form thất bại");
                });
            },
            function (emailFormId, callback) {
                emailFormApi.storeCampaign(campaign, emailFormId)
                    .then(res => {
                        closeModal();
                        helper.showNotification("Tạo chiến dịch thành công");
                        dispatch({
                            type: types.STORE_EMAIL_CAMPAIGN_SUCCESS,
                            campaign: res.data.data.campaign,
                            edit: !helper.isEmptyInput(campaign.id)
                        });
                        callback(null);
                    })
                    .catch(() => {
                        callback("Có lỗi xảy ra");
                    });
            }

        ], function (err) {
            if (err) {
                helper.showErrorNotification(err);
                dispatch({
                    type: types.STORE_EMAIL_CAMPAIGN_ERROR,
                });
            }
        });


    };
}

export function changeHideForm(emailFormId, hide) {
    return function (dispatch) {
        helper.showTypeNotification("Đang thay đổi", 'info');
        dispatch({
            type: types.BEGIN_CHANGE_HIDE_EMAIL_FORM,
            emailFormId: emailFormId,
            hide: hide
        });
        emailFormApi.changeHideForm(emailFormId, hide)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Thay đổi thành công");
                    dispatch({
                        type: types.CHANGE_HIDE_EMAIL_FORM_SUCCESS,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.CHANGE_HIDE_EMAIL_FORM_ERROR,
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.CHANGE_HIDE_EMAIL_FORM_ERROR,
                });
            });
    };
}