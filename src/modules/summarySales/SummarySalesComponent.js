import React from 'react';
import {Link, IndexLink} from 'react-router';
import Loading from "../../components/common/Loading";

class SummarySalesComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.loadSummary();
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loading/>
            );
        } else {
            this.path = this.props.location.pathname;
            return (
                <div>
                    <div className="row" style={{marginTop: '10px', marginBottom: '10px'}}>
                        <div className="col-md-12">
                            <ul className="nav nav-pills nav-pills-rose">
                                <li className={this.path === `/manage/sales` ? 'active' : ''}>
                                    <IndexLink to={`/manage/sales`}>
                                        Tổng quan
                                    </IndexLink>
                                </li>
                                <li className={this.path === `/manage/sales/statistic` ? 'active' : ''}>
                                    <Link to={`/manage/sales/statistic`}>
                                        Thống kê
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default SummarySalesComponent;
