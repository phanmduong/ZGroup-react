import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as staffActions from '../actions/staffActions';
import * as roleActions from '../actions/roleActions';
import * as baseActions from '../actions/baseActions';
import ManageStaffsComponent from "../components/manageStaff/ManageStaffsComponent";

// Import actions here!!

class CollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeRoleStaff = this.changeRoleStaff.bind(this);
    }

    componentWillMount() {
        this.props.staffActions.loadStaffsData();
        this.props.roleActions.loadRolesData();
        if (!this.props.baseListData || this.props.baseListData.length<=0){
            this.props.baseActions.loadDataBase();
        }
    }

    changeRoleStaff(staffId, roleId){
        this.props.staffActions.changeRoleStaff(staffId, roleId);
    }

    render() {
        return (
            <ManageStaffsComponent
                {...this.props}
                changeRoleStaff={this.changeRoleStaff}
                roleListData={[{id: 0, role_title:''}, ...this.props.roleListData]}
            />
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CollectMoneyContainer);
