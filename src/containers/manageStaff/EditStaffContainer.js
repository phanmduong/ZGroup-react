/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
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
        this.deleteStaff = this.deleteStaff.bind(this);
    }

    componentWillMount() {
        if (this.props.roles === null || this.props.roles === undefined || this.props.roles.length <= 0) {
            this.props.roleActions.loadRolesData();
        }
        this.props.staffActions.loadStaffData(this.props.params.staffId);
    }

    updateFormData(event) {
        const field = event.target.name;
        let staffForm = {...this.props.staffForm};
        staffForm[field] = event.target.value;
        this.props.staffActions.updateEditStaffFormData(staffForm);
    }

    componentDidMount() {
        $('#form-edit-staff').validate({
            errorPlacement: function (error, element) {
                $(element).parent('div').addClass('has-error');
            }
        });
        $('#form-date-start-company').datetimepicker({
            format: "YYYY-MM-DD"
        });
    }

    editStaff() {
        this.props.staffActions.editStaffData(this.props.staffForm);
    }

    deleteStaff() {
        this.props.staffActions.deleteStaffData(this.props.staffForm);
    }

    render() {
        let roles = (this.props.roles !== undefined) ?  this.props.roles : [];
        return (
            <EditStaffComponent
                {...this.props}
                updateFormData={this.updateFormData}
                editStaff={this.editStaff}
                deleteStaff={this.deleteStaff}
                roles={[{id: 0, role_title:''}, ...roles]}
            />
        );
    }
}


EditStaffContainer.propTypes = {
    staffForm: PropTypes.object.isRequired,
    staffActions: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    isLoadingStaff: PropTypes.bool.isRequired,
    isLoadingUpdateStaff: PropTypes.bool.isRequired,
    isLoadingDeleteStaff: PropTypes.bool.isRequired,
    errorStaff: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
};

EditStaffContainer.contextTypes = {
    router: PropTypes.object
};

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
