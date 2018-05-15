import React from "react";
import AppContainer from "../../containers/AppContainer";
import NotFoundPage from "../../components/NotFoundPage";
import { IndexRoute, Route } from "react-router";
import LoginContainer from "../../modules/login/LoginContainer";

const RootRoute = InputRoutes => (
    <Route>
        <Route path="/login" component={LoginContainer} />
        <Route path="/" component={AppContainer}>
            {InputRoutes &&
                InputRoutes.map((route, index) => {
                    if (route.path === "/") {
                        return <IndexRoute key={index} component={route.component} />;
                    } else {
                        return (
                            <Route {...route} key={index} >
                                {route.children &&
                                    route.children.map((routeChild, index1) => {
                                        if (routeChild.path === "/")
                                            return (
                                                <IndexRoute key={index1} component={routeChild.component} />
                                            );
                                        return <Route key={index1} {...routeChild} />;
                                    })}
                            </Route>
                        );
                    }
                })}
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Route>
);

export default RootRoute;
