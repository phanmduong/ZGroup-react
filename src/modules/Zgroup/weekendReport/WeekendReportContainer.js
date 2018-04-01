import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import WeekendReportComponent from "./WeekendReportComponent";
import PropTypes from 'prop-types';
import *as weekendReportAction from "./weekendReportAction";
import CheckWeekendReportModal from "./CheckWeekendReportModal";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";


class WeekendReportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1
        };
        this.loadOrders = this.loadOrders.bind(this);
    }
    componentWillMount() {
        this.props.weekendReportAction.loadAllReports();
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.weekendReportAction.loadAllReports(page);
    }
    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
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
                                                    this.props.isLoading ? <Loading/> :
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
                                <div className="row float-right">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                         style={{textAlign: 'right'}}>
                                        <b style={{marginRight: '15px'}}>
                                            Hiển thị kêt quả từ {first}
                                            - {end}/{this.props.totalCount}</b><br/>
                                        <Pagination
                                            totalPages={this.props.totalPages}
                                            currentPage={this.props.currentPage}
                                            loadDataPage={this.loadOrders}
                                        />
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
    limit: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    reports: PropTypes.array.isRequired,
    weekendReportAction: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        totalPages: state.weekendReport.totalPages,
        totalCount: state.weekendReport.totalCount,
        currentPage: state.weekendReport.currentPage,
        reports: state.weekendReport.reports,
        isLoading: state.weekendReport.isLoading,
        limit: state.weekendReport.limit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekendReportContainer);

