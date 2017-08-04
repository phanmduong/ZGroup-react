/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import EditStaffComponent from '../components/EditStaffComponent';
import * as staffActions from '../actions/staffActions';
import * as roleActions from '../actions/roleActions';

class EditStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.addStaff = this.addStaff.bind(this);
    }

    updateFormData(event) {
        console.log(event.target.value);
        const field = event.target.name;
        let staffForm = this.props.staffForm;
        staffForm[field] = event.target.value;
        console.log(staffForm);
        this.props.staffActions.updateStaffFormData(staffForm);
    }

    addStaff() {
        this.props.staffActions.addStaffData(this.props.staffForm);
    }

    componentWillMount() {
        if (this.props.roles === null || this.props.roles === undefined || this.props.roles.length <= 0) {
            this.props.roleActions.loadRolesData();
        }
        this.props.staffActions.loadStaffData(this.props.params.staffId);
    }

    render() {
        return (
            <EditStaffComponent
                {...this.props}
                updateFormData={this.updateFormData}
                addStaff={this.addStaff}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        staffForm: state.staffs.editStaff.staff,
        isLoadingStaff: state.staffs.editStaff.isLoadingStaff,
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
