import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as staffActions from '../../actions/staffActions';
import * as roleActions from '../../actions/roleActions';
import * as baseActions from '../../actions/baseActions';
import ManageStaffsComponent from "../../components/manageStaff/ManageStaffsComponent";

// Import actions here!!

class ManageStaffsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeRoleStaff = this.changeRoleStaff.bind(this);
        this.changeBaseStaff = this.changeBaseStaff.bind(this);
    }

    componentWillMount() {
        this.props.staffActions.loadStaffsData();
        this.props.roleActions.loadRolesData();
        if (!this.props.baseListData || this.props.baseListData.length <= 0) {
            this.props.baseActions.loadDataBase();
        }
    }

    changeRoleStaff(staffId, roleId) {
        this.props.staffActions.changeRoleStaff(staffId, roleId);
    }

    changeBaseStaff(staffId, baseId) {
        this.props.staffActions.changeBaseStaff(staffId, baseId);
    }

    render() {
        let roleListData = (this.props.roleListData !== undefined) ? this.props.roleListData : [];
        return (
            <ManageStaffsComponent
                {...this.props}
                changeRoleStaff={this.changeRoleStaff}
                changeBaseStaff={this.changeBaseStaff}
                roleListData={[{id: 0, role_title: ''}, ...roleListData]}
            />
        );

    }
}

ManageStaffsContainer.propTypes = {
    staffActions: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    baseActions: PropTypes.object.isRequired,
    isLoadingStaffs: PropTypes.bool.isRequired,
    isLoadingRoles: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    errorStaffs: PropTypes.bool.isRequired,
    errorBases: PropTypes.bool.isRequired,
    errorRoles: PropTypes.bool.isRequired,
    staffListData: PropTypes.array.isRequired,
    roleListData: PropTypes.array.isRequired,
    baseListData: PropTypes.array.isRequired,
};

ManageStaffsContainer.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    return {
        isLoadingStaffs: state.staffs.isLoading,
        staffListData: state.staffs.staffListData,
        errorStaffs: state.staffs.error,
        isLoadingRoles: state.roles.isLoading,
        roleListData: state.roles.roleListData,
        errorRoles: state.roles.error,
        isLoadingBases: state.bases.isLoading,
        baseListData: state.bases.baseData,
        errorBases: state.bases.error,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        staffActions: bindActionCreators(staffActions, dispatch),
        roleActions: bindActionCreators(roleActions, dispatch),
        baseActions: bindActionCreators(baseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaffsContainer);
