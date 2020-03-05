import React from 'react';
import {IndexLink, Link} from 'react-router';
import {observer} from 'mobx-react';
import {store} from "./DashBoardMarketingStore";


@observer
export default class DashboardMarketingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: {}
        };


    }

    componentDidMount() {
        store.pathname = this.props.location.pathname;
        store.initLoad();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname != nextProps.location.pathname) {
            store.pathname = nextProps.location.pathname;
            store.load();
        }

    }


    render() {
        this.path = this.props.location.pathname;
        let {isLoading} = store;
        console.log(isLoading);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-pills nav-pills-dark margin-top-10" data-tabs="tabs">
                            {store.routes.map((route, index) => {
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