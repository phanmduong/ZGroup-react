/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddStaffComponent from '../../components/manageStaff/AddStaffComponent';
import * as staffActions from '../../actions/staffActions';
import * as roleActions from '../../actions/roleActions';

class AddStaffContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.addStaff = this.addStaff.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let staffForm = {...this.props.staffForm};
        staffForm[field] = event.target.value;
        this.props.staffActions.updateAddStaffFormData(staffForm);
    }

    addStaff() {
        this.props.staffActions.addStaffData(this.props.staffForm);
    }

    componentWillMount() {
        if (this.props.roles === null || this.props.roles === undefined || this.props.roles.length <= 0) {
            this.props.roleActions.loadRolesData();
        }
    }

    render() {
        let roles = (this.props.roles !== undefined) ?  this.props.roles : [];
        return (
            <AddStaffComponent
                {...this.props}
                updateFormData={this.updateFormData}
                addStaff={this.addStaff}
                roles={[{id: 0, role_title:''}, ...roles]}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        staffForm: state.staffs.addStaff.staffForm,
        isLoadingAddStaff: state.staffs.addStaff.isLoading,
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
