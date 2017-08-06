/**
 * Created by phanmduong on 8/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ManageRoleComponent from '../../components/role/ManageRoleComponent';
import * as roleActions from '../../actions/roleActions';

class ManageRoleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteRole = this.deleteRole.bind(this);
    }

    componentWillMount(){
        if (this.props.roleListData === null || this.props.roleListData === undefined || this.props.roleListData.length <= 0) {
            this.props.roleActions.loadRolesData();
        }
    }

    deleteRole(roleId){
        this.props.roleActions.deleteRoleData(roleId);
    }

    render() {
        return (
            <ManageRoleComponent
                {...this.props}
                deleteRole={this.deleteRole}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoadingRoles: state.roles.isLoading,
        roleListData: state.roles.roleListData,
        errorRoles: state.roles.error,
        isLoadingDeleteRole: state.roles.isLoadingDeleteRole,
        errorDeleteRole: state.roles.errorDeleteRole
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roleActions: bindActionCreators(roleActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRoleContainer);
