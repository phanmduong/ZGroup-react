/**
 * Created by nangbandem.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfoStaffComponent from './InfoStaffComponent';
import * as staffActions from './staffActions';
import * as roleActions from '../role/roleActions';
import * as helper from '../../helpers/helper';

class InfoStaffContainer extends React.Component {
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
        this.props.staffActions.loadDepartments();
        if(this.props.params) this.props.staffActions.loadStaffData(this.props.params.staffId);
        else
        if(this.props.staffId) this.props.staffActions.loadStaffData(this.props.staffId);
        this.usernameEmpty = false;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.staffId != this.props.staffId)
            this.props.staffActions.loadStaffData(nextProps.staffId);
    }

    componentDidUpdate() {
        this.initForm();
    }

    updateFormData(event) {
        const field = event.target.name;
        let staffForm = {...this.props.staffForm};
        if (staffForm[field] != event.target.value) {
            if (field === 'email'){
                if (helper.isEmptyInput(staffForm['username']) || this.usernameEmpty){
                    this.usernameEmpty = true;
                    staffForm['username'] = event.target.value;
                }
            }

            if (field === 'username'){
                this.usernameEmpty = false;
            }

            staffForm[field] = event.target.value;
            this.props.staffActions.updateAddStaffFormData(staffForm);
        }
    }

    handleFileUpload(event) {
        let file = event.target.files[0];
        if (this.props.route.type === 'edit') {
            this.props.staffActions.changeAvatar(file, this.props.params.staffId);
        } else {
            this.props.staffActions.createAvatar(file);
        }
    }

    addStaff() {
        if (this.props.staffForm.role_id == null || this.props.staffForm.role_id == undefined || this.props.staffForm.role_id <= 0) {
            helper.showTypeNotification("Vui lòng chọn chức vụ", 'warning');
            return;
        }
        if (this.props.route.type === 'edit') {
            this.props.staffActions.editStaffData(this.props.staffForm);
        } else {
            this.props.staffActions.addStaffData(this.props.staffForm);
        }
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

    resetPassword(){
        this.props.staffActions.resetPassword(this.props.params.staffId);
    }

    render() {
        let roles = (this.props.roles !== undefined) ? this.props.roles : [];
        let bases = (this.props.bases !== undefined) ? this.props.bases : [];
        let departs = (this.props.departments !== undefined) ? this.props.departments : [];
        return (
            <InfoStaffComponent
                {...this.props}
                updateFormData={this.updateFormData}
                changeColor={this.changeColor}
                addStaff={this.addStaff}
                resetPassword={this.resetPassword}
                handleFileUpload={this.handleFileUpload}
                roles={[{id: 0, role_title: ''}, ...roles]}
                bases={[{id: 0, name: '', address: ''}, ...bases]}
                departments={[{id: 0, name: ''}, ...departs]}
                role={this.props.role}
            />
        );
    }
}

InfoStaffContainer.propTypes = {
    staffForm: PropTypes.object,
    staffActions: PropTypes.object,
    roleActions: PropTypes.object,
    isLoadingAddStaff: PropTypes.bool,
    isLoadingStaff: PropTypes.bool,
    isChangingAvatar: PropTypes.bool,
    isLoadingRoles: PropTypes.bool,
    error: PropTypes.bool,
    roles: PropTypes.array,
    bases: PropTypes.array,
    location: PropTypes.object,
    route: PropTypes.object,
    params: PropTypes.object,
    departments: PropTypes.array,
    role: PropTypes.number,
    staffId: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};

InfoStaffContainer.contextTypes = {
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
        departments: state.staffs.departments,
        role: state.login.user.role,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffActions: bindActionCreators(staffActions, dispatch),
        roleActions: bindActionCreators(roleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoStaffContainer);
