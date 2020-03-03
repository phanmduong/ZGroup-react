/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddStaffComponent from './AddStaffComponent';
import * as staffActions from './staffActions';
import * as roleActions from '../role/roleActions';
import * as helper from '../../helpers/helper';
import {CIRCLE_PICKER_COLORS} from "../../constants/constants";

class AddStaffContainer extends React.Component {
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
        if (this.props.route.type === 'edit') {
            this.props.staffActions.loadStaffData(this.props.params.staffId);
            this.usernameEmpty = false;
        }
    }

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

            let value = event.target.value;

            if (field === "kpis") {
                // eslint-disable-next-line
                const regex = new RegExp("[^0-9,]", "ig");
                value = value.replace(regex, "");
            }

            staffForm[field] = value;

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
        let data = {...this.props.staffForm};
        if (!CIRCLE_PICKER_COLORS.find(c=>this.props.staffForm.color == c)) {
            let length = CIRCLE_PICKER_COLORS.length - 1;
            let index = Math.floor(length* Math.random()) ;
            data.color = CIRCLE_PICKER_COLORS[index].substr(1);
        }
        if (this.props.staffForm.role_id == null || this.props.staffForm.role_id == undefined || this.props.staffForm.role_id <= 0) {
            helper.showTypeNotification("Vui lòng chọn chức vụ", 'warning');
            return;
        }
        if (this.props.route.type === 'edit') {
            this.props.staffActions.editStaffData(data);
        } else {
            this.props.staffActions.addStaffData(data);
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

    resetPassword() {
        this.props.staffActions.resetPassword(this.props.params.staffId);
    }

    render() {
        let roles = (this.props.roles !== undefined) ? this.props.roles : [];
        let bases = (this.props.bases !== undefined) ? this.props.bases : [];
        let departs = (this.props.departments !== undefined) ? this.props.departments : [];
        return (
            <AddStaffComponent
                {...this.props}
                updateFormData={this.updateFormData}
                changeColor={this.changeColor}
                addStaff={this.addStaff}
                resetPassword={this.resetPassword}
                type={this.props.route.type}
                isModal={this.props.isModal}
                handleFileUpload={this.handleFileUpload}
                roles={[{id: 0, role_title: ''}, ...roles]}
                bases={[{id: 0, name: '', address: ''}, ...bases]}
                departments={[{id: 0, name: ''}, ...departs]}
            />
        );
    }
}

AddStaffContainer.propTypes = {
    staffForm: PropTypes.object.isRequired,
    staffActions: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    isLoadingAddStaff: PropTypes.bool.isRequired,
    isLoadingStaff: PropTypes.bool.isRequired,
    isChangingAvatar: PropTypes.bool.isRequired,
    isLoadingRoles: PropTypes.bool.isRequired,
    isModal: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    departments: PropTypes.array.isRequired,
};

AddStaffContainer.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStaffContainer);
