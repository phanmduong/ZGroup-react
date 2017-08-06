/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EditStaffComponent from '../../components/manageStaff/EditStaffComponent';
import * as staffActions from '../../actions/staffActions';
import * as roleActions from '../../actions/roleActions';

class EditStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.editStaff = this.editStaff.bind(this);
        this.deteleStaff = this.deteleStaff.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let staffForm = {...this.props.staffForm};
        staffForm[field] = event.target.value;
        this.props.staffActions.updateEditStaffFormData(staffForm);
    }

    editStaff() {
        this.props.staffActions.editStaffData(this.props.staffForm);
    }

    deteleStaff() {
        this.props.staffActions.deleteStaffData(this.props.staffForm);
    }

    componentWillMount() {
        if (this.props.roles === null || this.props.roles === undefined || this.props.roles.length <= 0) {
            this.props.roleActions.loadRolesData();
        }
        this.props.staffActions.loadStaffData(this.props.params.staffId);
    }

    render() {
        let roles = (this.props.roles !== undefined) ?  this.props.roles : [];
        return (
            <EditStaffComponent
                {...this.props}
                updateFormData={this.updateFormData}
                editStaff={this.editStaff}
                deteleStaff={this.deteleStaff}
                roles={[{id: 0, role_title:''}, ...roles]}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        staffForm: state.staffs.editStaff.staff,
        isLoadingStaff: state.staffs.editStaff.isLoadingStaff,
        isLoadingUpdateStaff: state.staffs.editStaff.isLoadingUpdateStaff,
        isLoadingDeleteStaff: state.staffs.editStaff.isLoadingDeleteStaff,
        errorStaff: state.staffs.editStaff.errorStaff,
        roles: state.roles.roleListData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffActions: bindActionCreators(staffActions, dispatch),
        roleActions: bindActionCreators(roleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStaffContainer);
