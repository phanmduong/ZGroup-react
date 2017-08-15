/**
 * Created by phanmduong on 8/4/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
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
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    componentWillMount() {
        if (this.props.roles === null || this.props.roles === undefined || this.props.roles.length <= 0) {
            this.props.roleActions.loadRolesData();
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
        console.log(file);
        // this.props.staffActions.changeAvatar(file);
        // console.log('Selected file:', file);
    }

    addStaff() {
        this.props.staffActions.addStaffData(this.props.staffForm);
    }

    componentDidMount() {
        $('#form-add-staff').validate({
            errorPlacement: function (error, element) {
                $(element).parent('div').addClass('has-error');
            }
        });
        $('#form-date-start-company').datetimepicker({
            format: "YYYY-MM-DD"
        });
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

AddStaffContainer.propTypes = {
    staffForm: PropTypes.object.isRequired,
    staffActions: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    isLoadingAddStaff: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    roles: PropTypes.array.isRequired,
};

AddStaffContainer.contextTypes = {
    router: PropTypes.object
};

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
