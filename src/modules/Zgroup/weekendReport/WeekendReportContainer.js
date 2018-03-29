import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import WeekendReportComponent from "./WeekendReportComponent";
import PropTypes from 'prop-types';
import *as weekendReportAction from "./weekendReportAction";
import CheckWeekendReportModal from "./CheckWeekendReportModal";


class WeekendReportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        this.props.weekendReportAction.loadAllReports();
    }

    render() {
        return (
            <div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>
                                                <a href={"/administration/weekend-report/add-report"}>
                                                    <button
                                                        rel="tooltip" data-placement="top" title=""
                                                        className="btn btn-rose">
                                                        Thêm Báo Cáo
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content"><h4 className="card-title">Danh sách
                                                bài báo cáo</h4>
                                                <br/>
                                                {
                                                    (
                                                        <WeekendReportComponent
                                                            reports={this.props.reports}
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
                <CheckWeekendReportModal/>
            </div>
        );
    }

}

WeekendReportContainer.propTypes = {
    reports: PropTypes.object.isRequired,
    weekendReportAction: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reports: state.weekendReport.reports,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekendReportContainer);

