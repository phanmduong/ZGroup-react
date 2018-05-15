/**
 * Created by phanmduong on 8/24/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import CreateEmailTemplateComponent from './CreateEmailTemplateComponent';
import * as emailTemplatesActions from './emailTemplatesActions';
import * as helper from '../../helpers/helper';
import initialState from '../../reducers/initialState';

class CreateEmailTemplateContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateEmailTemplateData = this.updateEmailTemplateData.bind(this);
        this.updateEditor = this.updateEditor.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.saveEmailTemplate = this.saveEmailTemplate.bind(this);
    }

    componentWillMount(){
        this.props.emailTemplatesActions.updateEmailTemplateData(initialState.emailTemplates.emailTemplate);
        if (this.props.route.type === 'edit') {
            this.props.emailTemplatesActions.loadEmailTemplate(this.props.params.emailTemplateId);
        }
    }

    updateEmailTemplateData(event) {
        const field = event.target.name;
        let data = {...this.props.emailTemplate};
        if (event.target.type === "checkbox") {
            data[field] = event.target.checked;
        } else {
            data[field] = event.target.value;
        }
        this.props.emailTemplatesActions.updateEmailTemplateData(data);
    }

    updateEditor(value) {
        let data = {...this.props.emailTemplate};
        data.content = value;
        this.props.emailTemplatesActions.updateEmailTemplateData(data);
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.emailTemplatesActions.uploadImage(file);
    }

    checkValidate(){
        if ($('#form-email-template').valid()) {
            if (helper.isEmptyInput(this.props.emailTemplate.thumbnailUrl)) {
                helper.showTypeNotification('Vui lòng chọn ảnh đại diện', 'warning');
                return false;
            }
            if (helper.isEmptyInput(this.props.emailTemplate.content)){
                helper.showTypeNotification('Vui lòng nhập content', 'warning');
                return false;
            }
            return true;
        }

        return false;
    }

    saveEmailTemplate() {
        if (this.checkValidate()) {
            this.props.emailTemplatesActions.saveEmailTemplate(this.props.emailTemplate);
        }
    }

    render() {
        return (
            <CreateEmailTemplateComponent
                {...this.props}
                updateEmailTemplateData = {this.updateEmailTemplateData}
                updateEditor = {this.updateEditor}
                handleFileUpload = {this.handleFileUpload}
                saveEmailTemplate = {this.saveEmailTemplate}
            />
        );
    }
}

CreateEmailTemplateContainer.propTypes = {
    emailTemplate: PropTypes.object.isRequired,
    isUpdatingThumbnail: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isLoadingEmailTemplate: PropTypes.bool.isRequired,
    emailTemplatesActions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        emailTemplate : state.emailTemplates.emailTemplate,
        isUpdatingThumbnail : state.emailTemplates.isUpdatingThumbnail,
        isSaving: state.emailTemplates.isSaving,
        isLoadingEmailTemplate: state.emailTemplates.emailTemplate.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        emailTemplatesActions: bindActionCreators(emailTemplatesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmailTemplateContainer);
