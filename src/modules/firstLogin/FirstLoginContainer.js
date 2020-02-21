/**
 * Created by nangbandem
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FirstLoginComponent from './FirstLoginComponent';
import * as firstLoginActions from './firstLoginActions';
import * as helper from '../../helpers/helper';

class firstLoginContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }

    componentWillMount() {
        this.props.firstLoginActions.loadMyProfile();
        this.usernameEmpty = false;
    }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    // }

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
            this.props.firstLoginActions.updateEditProfileFormData(profile);
        }
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.firstLoginActions.changeAvatar(file, this.props.profile.id);
    }

    editProfile() {
        this.props.firstLoginActions.editProfile(this.props.profile);
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
        this.props.firstLoginActions.updateEditProfileFormData(profile);
    }


    render() {
        console.log('this.props.user.first_login',this.props.user.first_login);
        return (
            <FirstLoginComponent
                {...this.props}
                updateFormData={this.updateFormData}
                changeColor={this.changeColor}
                editProfile={this.editProfile}
                handleFileUpload={this.handleFileUpload}
                first_login={this.props.user ? this.props.user.first_login : 1}
                updateSuccess={this.props.updateSuccess}
            />
        );
    }
}

firstLoginContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    firstLoginActions: PropTypes.object.isRequired,
    isLoadingProfile: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
    updateSuccess: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};

firstLoginContainer.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        profile: state.firstLogin.profile,
        isLoadingProfile: state.firstLogin.isLoading,
        isSaving: state.firstLogin.isSaving,
        isChangingAvatar: state.firstLogin.isChangingAvatar,
        user: state.login.user,
        updateSuccess: state.firstLogin.updateSuccess,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        firstLoginActions: bindActionCreators(firstLoginActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(firstLoginContainer);
