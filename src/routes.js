import React from 'react';
import {Route, IndexRoute} from 'react-router';
import LoginContainer from './containers/LoginContainer';
import AppContainer from './containers/AppContainer';
import DashboardContainer from './containers/DashboardContainer';
import RegisterListContainer from './containers/RegisterListContainer';
import CollectMoneyContainer from './containers/financialManager/CollectMoneyContainer';
import ManageStaffsContainer from './containers/ManageStaffsContainer';
import AddStaffContainer from './containers/AddStaffContainer';
import EditStaffContainer from './containers/EditStaffContainer';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={DashboardContainer}/>
      <Route path="register-list" component={RegisterListContainer}/>
      <Route path="collect-money" component={CollectMoneyContainer}/>
      <Route path="manage/quan-li-nhan-su" component={ManageStaffsContainer}/>
      <Route path="add-staff" component={AddStaffContainer}/>
      <Route path="staff/:staffId/edit" component={EditStaffContainer}/>
    </Route>
    <Route path="login" component={LoginContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
