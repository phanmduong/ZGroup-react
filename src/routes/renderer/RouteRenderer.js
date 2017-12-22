import React from 'react';
import AppContainer from "../../containers/AppContainer";
import NotFoundPage from "../../components/NotFoundPage";
import {IndexRoute, Route} from "react-router";
import LoginContainer from "../../modules/login/LoginContainer";

export default (InputRoutes) => (
    <Route>
        <Route path="/" component={AppContainer}>
            {
                InputRoutes && InputRoutes.map((route) => <Route {...route}>
                    {
                        route.children && route.children.map((routeChild) => {
                            if (routeChild.path === "/")
                                return <IndexRoute component={routeChild.component}/>;
                            return (
                                <Route {...routeChild}/>
                            );
                        })
                    }
                </Route>)
            }

        </Route>
        <Route path="/login" component={LoginContainer}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
