import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import App from '../components/App';
// Import actions here!!
import * as tabsActions from '../actions/tabsActions';
import * as loginActions from '../actions/loginActions';

class DashboardContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onLogOut = this.onLogOut.bind(this);
  }

  componentWillMount(){
    this.props.tabsActions.loadTabsData();
  }

  onLogOut(){
    localStorage.removeItem('token');
    this.context.router.push('login');
    this.props.loginActions.logOut();
  }

  render() {
    console.log('render App');
    return (
      <App
        {...this.props}
        onLogOut={this.onLogOut}
      />
    );
  }
}


DashboardContainer.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    isLoadingTab: state.tabs.isLoading,
    errorLoadingTab: state.tabs.error,
    tabsListData: state.tabs.tabListData,
    user: state.login.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tabsActions: bindActionCreators(tabsActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
