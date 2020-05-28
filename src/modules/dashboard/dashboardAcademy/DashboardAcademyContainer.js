import React from 'react';
import {observer} from 'mobx-react';

import {IndexLink, Link} from "react-router";

const routePrefix = "/dashboard/academy";
const routes = [
    {
        path: `${routePrefix}`, text: 'Lớp học',
    },
    {
        path: `${routePrefix}/exams`, text: 'Bài kiểm tra',
    },


];

@observer
export default class DashboardAcademyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
    }

    render() {
        this.path = this.props.location.pathname;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-pills nav-pills-dark margin-top-10" data-tabs="tabs">
                            {routes.map((route, index) => {
                                let className = this.path === route.path ? 'active' : '';
                                return (
                                    index ?
                                        <li className={className}>
                                            <Link to={route.path}>
                                                {route.text}
                                            </Link>
                                        </li>
                                        :
                                        <li className={className}>
                                            <IndexLink to={route.path}>
                                                {route.text}
                                            </IndexLink>
                                        </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                {this.props.children}

            </div>
        );
    }
}
