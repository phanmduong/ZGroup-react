/**
 * Created by phanmduong on 8/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CreateEmailFormComponent from './CreateEmailFormComponent';
import * as emailFormsActions from './emailFormsActions';
import * as helper from '../../helpers/helper';
import initialState from '../../reducers/initialState';

class CreateEmailFormContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateEmailFormData = this.updateEmailFormData.bind(this);
        this.updateEditorContent = this.updateEditorContent.bind(this);
        this.updateEditorFooter = this.updateEditorFooter.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.saveEmailForm = this.saveEmailForm.bind(this);
        this.preSaveEmailForm = this.preSaveEmailForm.bind(this);
        this.handleFileUploadAvatar = this.handleFileUploadAvatar.bind(this);
        this.sendMail = this.sendMail.bind(this);
        this.checkValidate = this.checkValidate.bind(this);
    }

    componentWillMount() {
        this.props.emailFormsActions.updateEmailFormData(initialState.emailForms.emailForm);
        this.props.emailFormsActions.loadSubscribersList();
        if (this.props.route.type === 'edit') {
            this.props.emailFormsActions.loadEmailForm(this.props.params.emailFormId);
        }
    }

    updateEmailFormData(event) {
        const field = event.target.name;
        let data = {...this.props.emailForm};
        if (event.target.type === "checkbox") {
            data[field] = event.target.checked;
        } else {
            data[field] = event.target.value;
        }
        this.props.emailFormsActions.updateEmailFormData(data);
    }

    updateEditorContent(value) {
        let data = {...this.props.emailForm};
        data.content = value;
        this.props.emailFormsActions.updateEmailFormData(data);
    }

    updateEditorFooter(value) {
        let data = {...this.props.emailForm};
        data.footer = value;
        this.props.emailFormsActions.updateEmailFormData(data);
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.emailFormsActions.uploadImage(file);
    }

    handleFileUploadAvatar(event) {
        let file = event.target.files[0];
        this.props.emailFormsActions.uploadAvatar(file);
    }

    checkValidate() {
        if ($('#form-email-form').valid()) {
            if (helper.isEmptyInput(this.props.emailForm.logoUrl)) {
                helper.showTypeNotification('Vui lòng chọn logo', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.emailForm.avatarUrl)) {
                helper.showTypeNotification('Vui lòng chọn ảnh đại điện', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.emailForm.content)) {
                helper.showTypeNotification('Vui lòng nhập content', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.emailForm.footer)) {
                helper.showTypeNotification('Vui lòng nhập footer', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.emailForm.template.name)) {
                helper.showTypeNotification('Vui lòng chọn template', 'warning');
                return false;
            }
            return true;
        }

        return false;
    }

    saveEmailForm() {
        if (this.checkValidate()) {
            this.props.emailFormsActions.saveEmailForm(this.props.emailForm);
        }
    }

    preSaveEmailForm() {
        this.props.emailFormsActions.preSaveEmailForm(this.props.emailForm);
    }

    sendMail(email) {

        if (helper.isEmptyInput(this.props.emailForm.template.name)) {
            helper.showTypeNotification('Vui lòng chọn template', 'warning');
            return false;
        }
        this.props.emailFormsActions.sendMailTest(this.props.emailForm, email);
    }

    render() {
        return (
            <CreateEmailFormComponent
                {...this.props}
                updateEmailFormData={this.updateEmailFormData}
                updateEditorContent={this.updateEditorContent}
                updateEditorFooter={this.updateEditorFooter}
                handleFileUpload={this.handleFileUpload}
                preSaveEmailForm={this.preSaveEmailForm}
                saveEmailForm={this.saveEmailForm}
                sendMail={this.sendMail}
                handleFileUploadAvatar={this.handleFileUploadAvatar}
                checkValidate={this.checkValidate}
            />
        );
    }
}

CreateEmailFormContainer.propTypes = {
    emailForm: PropTypes.object.isRequired,
    subscribersList: PropTypes.array.isRequired,
    isUpdatingLogo: PropTypes.bool.isRequired,
    isUpdatingAvatar: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isPreSaving: PropTypes.bool.isRequired,
    isSendingMail: PropTypes.bool.isRequired,
    isLoadingEmailForm: PropTypes.bool.isRequired,
    emailFormsActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        emailForm: state.emailForms.emailForm,
        isUpdatingLogo: state.emailForms.isUpdatingLogo,
        isUpdatingAvatar: state.emailForms.isUpdatingAvatar,
        isSaving: state.emailForms.isSaving,
        isPreSaving: state.emailForms.isPreSaving,
        isLoadingEmailForm: state.emailForms.emailForm.isLoading,
        isSendingMail: state.emailForms.isSendingMail,
        subscribersList: state.emailCampaigns.subscribersList,
        isStoringCampaign: state.emailCampaigns.isStoring,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailFormsActions: bindActionCreators(emailFormsActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmailFormContainer);
