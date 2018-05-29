import React from "react";
import { Link, IndexLink } from "react-router";
import Loading from "../../components/common/Loading";
import PropTypes from "prop-types";

class SummarySalesComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.loadSummary();
    }

    render() {
        if (this.props.isLoading) {
            return <Loading />;
        } else {
            this.path = this.props.location.pathname;
            return (
                <div>
                    <div
                        className="row"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                        <div className="col-md-12">
                            <ul className="nav nav-pills nav-pills-rose">
                                <li
                                    className={
                                        this.path === `/sales/sales`
                                            ? "active nav-item"
                                            : "nav-item"
                                    }
                                >
                                    <IndexLink to={`/sales/sales`}>
                                        Tổng quan
                                    </IndexLink>
                                </li>
                                <li
                                    className={
                                        this.path ===
                                        `/sales/sales/statistic`
                                            ? "active nav-item"
                                            : "nav-item"
                                    }
                                >
                                    <Link to={`/sales/sales/statistic`}>
                                        Thống kê
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">{this.props.children}</div>
                    </div>
                </div>
            );
        }
    }
}

SummarySalesComponent.propTypes = {
    loadSummary: PropTypes.func.isRequired,
    summarySalesActions: PropTypes.object.isRequired,
    currentGen: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object,
    children: PropTypes.element,
};

export default SummarySalesComponent;
