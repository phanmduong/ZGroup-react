/**
 * Created by phanmduong on 8/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ManageRoleComponent from './ManageRoleComponent';
import * as roleActions from './roleActions';

class ManageRoleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteRole = this.deleteRole.bind(this);
    }

    componentWillMount() {
        this.props.roleActions.loadRolesData();
    }

    deleteRole(roleId) {
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


ManageRoleContainer.propTypes = {
    isLoadingRoles: PropTypes.bool.isRequired,
    roleListData: PropTypes.array.isRequired,
    errorRoles: PropTypes.bool.isRequired,
    isLoadingDeleteRole: PropTypes.bool.isRequired,
    errorDeleteRole: PropTypes.bool.isRequired,
    roleActions: PropTypes.object.isRequired,

};

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
