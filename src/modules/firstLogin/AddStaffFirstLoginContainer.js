/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddStaffFirstLoginComponent from './AddStaffFirstLoginComponent';
import * as staffActions from '../manageStaff/staffActions';
import * as roleActions from '../role/roleActions';
import * as helper from '../../helpers/helper';

class AddStaffFirstLoginContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.addStaff = this.addStaff.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.usernameEmpty = true;
    }

    componentWillMount() {
        this.props.staffActions.initForm();
        this.props.roleActions.loadRolesData();
        this.props.staffActions.loadDataBase();
    }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    // }

    componentDidUpdate() {
        this.initForm();
    }

    updateFormData(event) {
        const field = event.target.name;
        let staffForm = {...this.props.staffForm};
        if (staffForm[field] != event.target.value) {
            if (field === 'email') {
                if (helper.isEmptyInput(staffForm['username']) || this.usernameEmpty) {
                    this.usernameEmpty = true;
                    staffForm['username'] = event.target.value;
                }
            }

            if (field === 'username') {
                this.usernameEmpty = false;
            }

            staffForm[field] = event.target.value;
            this.props.staffActions.updateAddStaffFormData(staffForm);
        }
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        this.props.staffActions.createAvatar(file);

    }

    addStaff() {
        if (this.props.staffForm.role_id == null || this.props.staffForm.role_id == undefined || this.props.staffForm.role_id <= 0) {
            helper.showTypeNotification("Vui lòng chọn chức vụ", 'warning');
            return;
        }
        this.props.staffActions.addStaffData(this.props.staffForm);

    }

    initForm() {
        helper.setFormValidation('#form-add-staff');
        $('#form-date-start-company').datetimepicker({
            format: "YYYY-MM-DD"
        });
    }

    changeColor(color) {
        let staffForm = {...this.props.staffForm};
        staffForm.color = color.hex;
        this.props.staffActions.updateAddStaffFormData(staffForm);
    }

    resetPassword() {

    }

    render() {
        let roles = (this.props.roles !== undefined) ? this.props.roles : [];
        let bases = (this.props.bases !== undefined) ? this.props.bases : [];
        return (


                                <AddStaffFirstLoginComponent
                                    {...this.props}
                                    updateFormData={this.updateFormData}
                                    changeColor={this.changeColor}
                                    addStaff={this.addStaff}
                                    resetPassword={this.resetPassword}
                                    type={"create"}
                                    handleFileUpload={this.handleFileUpload}
                                    roles={[{id: 0, role_title: ''}, ...roles]}
                                    bases={[{id: 0, name: '', address: ''}, ...bases]}
                                />


        );
    }
}

AddStaffFirstLoginContainer.propTypes = {
    staffForm: PropTypes.object.isRequired,
    staffActions: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    isLoadingAddStaff: PropTypes.bool.isRequired,
    isLoadingStaff: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
    isLoadingRoles: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
    location: PropTypes.object,
    route: PropTypes.object,
    params: PropTypes.object,
    user: PropTypes.object,
};

AddStaffFirstLoginContainer.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        staffForm: state.staffs.addStaff.staffForm,
        isLoadingStaff: state.staffs.addStaff.isLoadingStaff,
        isLoadingAddStaff: state.staffs.addStaff.isLoading,
        isChangingAvatar: state.staffs.addStaff.isChangingAvatar,
        isResettingPassword: state.staffs.addStaff.isResettingPassword,
        isLoadingRoles: state.roles.isLoading,
        error: state.staffs.addStaff.error,
        roles: state.roles.roleListData,
        bases: state.staffs.bases.basesData,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffActions: bindActionCreators(staffActions, dispatch),
        roleActions: bindActionCreators(roleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStaffFirstLoginContainer);
