import React from 'react';
import {IndexRoute, Route} from 'react-router';
import LoginContainer from './modules/login/LoginContainer';
import NotFoundPage from './components/NotFoundPage';

import EmailRoutes from "./routes/EmailRoute";
import AppContainer from "./containers/AppContainer";
import DashboardContainer from "./modules/dashboard/DashboardContainer";


export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={DashboardContainer}/>
        <Route path="/manage/dashboard" component={DashboardContainer}/>
        {
            EmailRoutes && EmailRoutes.map((route) => <Route {...route}/>)
        }
        <Route path="login" component={LoginContainer}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
