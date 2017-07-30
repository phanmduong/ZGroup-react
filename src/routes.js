import React from 'react';
import {Route, IndexRoute} from 'react-router';
import LoginContainer from './containers/LoginContainer';
import App from './components/App';
import DashboardContainer from './containers/DashboardContainer';
import RegisterListContainer from './containers/RegisterListContainer';
import CollectMoneyContainer from './containers/financialManager/CollectMoneyContainer';
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={DashboardContainer}/>
      <Route path="register-list" component={RegisterListContainer}/>
      <Route path="collect-money" component={CollectMoneyContainer}/>
    </Route>
    <Route path="login" component={LoginContainer}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
