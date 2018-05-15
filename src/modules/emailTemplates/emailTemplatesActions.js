import * as types from '../../constants/actionTypes';
import * as emailTemplateApi from './emailTemplateApi';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';

/*eslint no-console: 0 */
export function loadTemplates(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_TEMPLATES,
        });
        emailTemplateApi.loadTemplates(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_SUCCESS,
                    templates: res.data.email_templates,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() =>{
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATES_ERROR,
                });
        });
    };
}

export function deleteEmailTemplate(emailTemplateId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_EMAIL_TEMPLATE,
        });
        emailTemplateApi.deleteEmailTemplate(emailTemplateId)
            .then(() => {
                helper.showNotification('Xóa email template thành công');
                dispatch({
                    type: types.DELETE_EMAIL_TEMPLATE_SUCCESS,
                    emailTemplateId
                });
            })
            .catch(() => {
                helper.showNotification('Xóa email template thất bại');
                dispatch({
                    type: types.DELETE_EMAIL_TEMPLATE_ERROR,
                });
            });
    };
}

export function uploadImage(file) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_EMAIL_TEMPLATE
        });
        emailTemplateApi.uploadImage(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            dispatch(uploadImageEmailTemplateSuccess(data.link));
        }, function() {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch(uploadImageEmailTemplateFailed());
        });
    };
}

export function uploadImageEmailTemplateSuccess(imageUrl) {
    return (
        {
            type: types.UPLOAD_IMAGE_EMAIL_TEMPLATE_SUCCESS,
            imageUrl: imageUrl
        }
    );
}

export function uploadImageEmailTemplateFailed() {
    return (
        {
            type: types.UPLOAD_IMAGE_EMAIL_TEMPLATE_FAILED,
        }
    );
}

export function updateEmailTemplateData(emailTemplate) {
    return ({
        type: types.UPDATE_EMAIL_TEMPLATE_DATA,
        emailTemplate: emailTemplate
    });
}

export function saveEmailTemplate(emailTemplate) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_EMAIL_TEMPLATE
        });
        emailTemplateApi.saveEmailTemplate(emailTemplate)
            .then(() => {
                helper.showNotification("Tải lên thành công");
                browserHistory.push('/email-maketing/templates');
                dispatch({
                    type: types.SAVE_EMAIL_TEMPLATE_SUCCESS,
                });
            }).catch(() => {
            helper.showNotification("Tải lên thất bại");
            dispatch({
                type: types.SAVE_EMAIL_TEMPLATE_FAILED
            });
        });
    };
}

export function loadEmailTemplate(emailTemplateId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_TEMPLATE,
        });
        emailTemplateApi.loadEmailTemplate(emailTemplateId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATE_SUCCESS,
                    emailTemplate: res.data.data.email_template
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_TEMPLATE_ERROR,
                });
            });
    };
}