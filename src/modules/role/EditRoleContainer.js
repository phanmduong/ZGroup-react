/**
 * Created by phanmduong on 8/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EditRoleComponent from './EditRoleComponent';
import {bindActionCreators} from 'redux';
import * as roleActions from './roleActions';

class EditRoleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeCheckTab = this.changeCheckTab.bind(this);
        this.editRole = this.editRole.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount(){
        this.props.roleActions.loadRoleData(this.props.params.roleId);
    }

    componentDidUpdate() {
        $('#form-edit-role').validate({
            errorPlacement: function (error, element) {
                $(element).parent('div').addClass('has-error');
            }
        });
    }

    updateFormData(event) {
        const field = event.target.name;
        let roleForm = {...this.props.roleForm};
        roleForm[field] = event.target.value;
        this.props.roleActions.updateRoleFormData(roleForm);
    }
    changeCheckTab(tab){
        this.props.roleActions.changeCheckTab(tab);
    }

    editRole(){
        this.props.roleActions.editRoleData(this.props.tabsListData, this.props.roleForm);
    }

    render() {
        return (
            <EditRoleComponent
                tabsListData={this.props.tabsListData}
                changeCheckTab={this.changeCheckTab}
                editRole={this.editRole}
                updateFormData={this.updateFormData}
                {...this.props}
            />
        );
    }
}


EditRoleContainer.propTypes = {
    isLoadingRole: PropTypes.bool.isRequired,
    tabsListData: PropTypes.array.isRequired,
    errorLoadingRole: PropTypes.bool.isRequired,
    isLoadingUpdateRole: PropTypes.bool.isRequired,
    roleForm: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    isLoadingDeleteRole: PropTypes.bool.isRequired,
    errorDeleteRole: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoadingRole: state.roles.editRole.isLoadingRole,
        errorLoadingRole: state.roles.editRole.errorRole,
        tabsListData: state.roles.tabs.allTabs,
        isLoadingUpdateRole: state.roles.editRole.isLoadingUpdateRole,
        roleForm: state.roles.roleForm,
        isLoadingDeleteRole: state.roles.isLoadingDeleteRole,
        errorDeleteRole: state.roles.errorDeleteRole
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roleActions: bindActionCreators(roleActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleContainer);
