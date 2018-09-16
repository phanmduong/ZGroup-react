/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EditProfileComponent from './EditProfileComponent';
import * as profileActions from './profileActions';
import * as helper from '../../helpers/helper';

class EditProfileContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    componentWillMount() {
        this.props.profileActions.loadMyProfile();
        this.usernameEmpty = false;
    }

    componentDidUpdate() {
        this.initForm();
    }

    updateFormData(event) {
        const field = event.target.name;
        let profile = {...this.props.profile};
        if (profile[field] != event.target.value) {
            profile[field] = event.target.value;
            if (field === 'email') {
                if (helper.isEmptyInput(profile['username']) || this.usernameEmpty) {
                    this.usernameEmpty = true;
                    profile['username'] = event.target.value;
                }
            }

            if (field === 'username') {
                this.usernameEmpty = false;
            }
            this.props.profileActions.updateEditProfileFormData(profile);
        }
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.profileActions.changeAvatar(file, this.props.profile.id);
    }

    editProfile() {
        this.props.profileActions.editProfile(this.props.profile);
    }

    initForm() {
        helper.setFormValidation('#form-edit-profile');
        $('#form-date-start-company').datetimepicker({
            format: "YYYY-MM-DD"
        });
    }

    changeColor(color) {
        let profile = {...this.props.profile};
        profile.color = color.hex;
        this.props.profileActions.updateEditProfileFormData(profile);
    }


    render() {
        return (
            <EditProfileComponent
                {...this.props}
                updateFormData={this.updateFormData}
                changeColor={this.changeColor}
                editProfile={this.editProfile}
                handleFileUpload={this.handleFileUpload}
            />
        );
    }
}

EditProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
    isLoadingProfile: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
};

EditProfileContainer.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        profile: state.profile.profile,
        isLoadingProfile: state.profile.isLoading,
        isSaving: state.profile.isSaving,
        isChangingAvatar: state.profile.isChangingAvatar,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);
