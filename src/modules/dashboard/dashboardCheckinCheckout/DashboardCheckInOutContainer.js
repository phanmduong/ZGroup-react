import React from 'react';
import {IndexLink, Link} from 'react-router';
import {observer} from 'mobx-react';
import Loading from "../../../components/common/Loading";
import filterStore from "./filterStore";

const routePrefix = "/dashboard/checkin-checkout";
const routes = [
    {
        path: `${routePrefix}`, text: 'Giảng dạy',
    },
    {
        path: `${routePrefix}/work-shift`, text: 'Làm việc',
    },
    {
        path: `${routePrefix}/shift`, text: 'Trực',
    },

];

@observer
export default class DashboardCheckInOutContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        // filterStore.loadData();
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
                {filterStore.isLoading ? <Loading/> : this.props.children}
            </div>
        );
    }
}
