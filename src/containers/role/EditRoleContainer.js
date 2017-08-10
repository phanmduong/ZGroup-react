/**
 * Created by phanmduong on 8/6/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EditRoleComponent from '../../components/role/EditRoleComponent';
import {bindActionCreators} from 'redux';
import * as tabsActions from '../../modules/tab/tabsActions';
import * as roleActions from '../../actions/roleActions';

class EditRoleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeCheckTab = this.changeCheckTab.bind(this);
        this.editRole = this.editRole.bind(this);
        this.deleteRole = this.deleteRole.bind(this);
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
        this.props.tabsActions.changeCheckTab(tab);
    }

    editRole(){
        this.props.roleActions.editRoleData(this.props.tabsListData, this.props.roleForm);
    }

    deleteRole(){
        this.props.roleActions.deleteRoleData(this.props.params.roleId);
    }

    render() {
        return (
            <EditRoleComponent
                tabsListData={this.props.tabsListData}
                changeCheckTab={this.changeCheckTab}
                editRole={this.editRole}
                updateFormData={this.updateFormData}
                deleteRole={this.deleteRole}
                {...this.props}
            />
        );
    }
}


EditRoleContainer.propTypes = {
    tabsActions: PropTypes.object.isRequired,
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
        tabsListData: state.tabs.allTabs,
        isLoadingUpdateRole: state.roles.editRole.isLoadingUpdateRole,
        roleForm: state.roles.roleForm,
        isLoadingDeleteRole: state.roles.isLoadingDeleteRole,
        errorDeleteRole: state.roles.errorDeleteRole
    };
}

function mapDispatchToProps(dispatch) {
    return {
        tabsActions: bindActionCreators(tabsActions, dispatch),
        roleActions: bindActionCreators(roleActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoleContainer);
