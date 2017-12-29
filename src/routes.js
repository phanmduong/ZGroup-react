import React from 'react';
import {Route} from 'react-router';
// import LoginContainer from './modules/login/LoginContainer';
import NotFoundPage from './components/NotFoundPage';

import Routes from "./routes/EmailRoute";
// import Routes from "./routes/ManufactureRoute";
import AppContainer from "./containers/AppContainer";
// import DashboardContainer from "./modules/dashboard/DashboardContainer";


export default (
    <Route path="/" component={AppContainer}>
        {/*<IndexRoute component={DashboardContainer}/>*/}
        {/*<Route path="/manage/dashboard" component={DashboardContainer}/>*/}
        {
            Routes && Routes.map((route, index) => <Route key={index} {...route}/>)
        }
        {/*<Route path="login" component={LoginContainer}/>*/}
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
