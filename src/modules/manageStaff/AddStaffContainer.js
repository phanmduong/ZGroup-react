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

class AddStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.addStaff = this.addStaff.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.state={
            isDidUpdate: false
        }
    }

    componentWillMount() {
        this.props.staffActions.initForm();
        // this.props.roleActions.loadRolesData();
        if (this.props.route.type === 'edit') {
            this.props.staffActions.loadStaffData(this.props.params.staffId);
            this.setState({isDidUpdate: true});
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        let staffForm = {...this.props.staffForm};
        staffForm[field] = event.target.value;
        this.props.staffActions.updateAddStaffFormData(staffForm);
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

    componentDidUpdate(){
            this.initForm();
    }


    render() {
        let roles = (this.props.roles !== undefined) ? this.props.roles : [];
        return (
            <AddStaffComponent
                {...this.props}
                updateFormData={this.updateFormData}
                addStaff={this.addStaff}
                type={this.props.route.type}
                handleFileUpload={this.handleFileUpload}
                roles={[{id: 0, role_title: ''}, ...roles]}
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
    error: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
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
        isLoadingRoles: state.roles.isLoading,
        error: state.staffs.addStaff.error,
        roles: state.roles.roleListData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffActions: bindActionCreators(staffActions, dispatch),
        roleActions: bindActionCreators(roleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStaffContainer);
