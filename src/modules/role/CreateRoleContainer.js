/**
 * Created by phanmduong on 8/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import CreateRoleComponent from './CreateRoleComponent';
import {bindActionCreators} from 'redux';
import * as roleActions from './roleActions';
import PropTypes from 'prop-types';

class CreateRoleContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.changeCheckTab = this.changeCheckTab.bind(this);
        this.createRole = this.createRole.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    componentWillMount(){
        this.props.roleActions.loadAllTabsData();
        this.props.roleActions.updateRoleFormData({});
    }

    componentDidUpdate() {
        $('#form-add-role').validate({
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

    createRole(){
        this.props.roleActions.createRoleData(this.props.tabsListData, this.props.roleForm);
    }

    render() {
        return (
            <CreateRoleComponent
                tabsListData={this.props.tabsListData}
                changeCheckTab={this.changeCheckTab}
                createRole={this.createRole}
                updateFormData={this.updateFormData}
                {...this.props}
            />
        );
    }
}


CreateRoleContainer.propTypes = {
    isLoadingTab: PropTypes.bool.isRequired,
    tabsListData: PropTypes.array.isRequired,
    errorLoadingTab: PropTypes.bool.isRequired,
    isLoadingCreateRole: PropTypes.bool.isRequired,
    roleForm: PropTypes.object.isRequired,
    roleActions: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
    return {
        isLoadingTab: state.roles.tabs.isLoadingAllTabs,
        errorLoadingTab: state.roles.tabs.errorAllTabs,
        tabsListData: state.roles.tabs.allTabs,
        isLoadingCreateRole: state.roles.createRole.isLoading,
        roleForm: state.roles.roleForm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roleActions: bindActionCreators(roleActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoleContainer);
