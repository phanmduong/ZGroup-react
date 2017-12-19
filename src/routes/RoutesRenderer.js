import React from 'react';
import {Route} from 'react-router';
import AppContainer from "../containers/AppContainer";
import NotFoundPage from "../components/NotFoundPage";
// import LoginContainer from './modules/login/LoginContainer';

// import Routes from "./routes/ManufactureRoute";
// import DashboardContainer from "./modules/dashboard/DashboardContainer";


export default (Routes) => (
    <Route path="/" component={AppContainer}>
        {/*<IndexRoute component={DashboardContainer}/>*/}
        {/*<Route path="/manage/dashboard" component={DashboardContainer}/>*/}
        {
            Routes && Routes.map((route) => <Route {...route}/>)
        }
        {/*<Route path="login" component={LoginContainer}/>*/}
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
