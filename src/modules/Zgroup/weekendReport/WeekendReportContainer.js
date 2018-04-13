import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import WeekendReportComponent from "./WeekendReportComponent";
import PropTypes from 'prop-types';
import *as weekendReportAction from "./weekendReportAction";
import CheckWeekendReportModal from "./CheckWeekendReportModal";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
import {Link} from "react-router";
import Search from "../../../components/common/Search";
import moment from "moment/moment";


class WeekendReportContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: ''
        };
        this.loadOrders = this.loadOrders.bind(this);
        this.templatesSearchChange = this.templatesSearchChange.bind(this);
    }
    componentWillMount() {
        this.props.weekendReportAction.loadAllReports();
    }
    templatesSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.weekendReportAction.loadAllReports(
                1,
                value
            );
        }.bind(this), 500);
    }


    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.weekendReportAction.loadAllReports(page, this.state.query);
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
                                        <div className="card">
                                            <div className="card-header card-header-icon"
                                                 data-background-color="rose"><i
                                                className="material-icons">assignment</i>
                                            </div>
                                            <div className="card-content"><h4 className="card-title">Danh sách báo cáo</h4>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Link
                                                            onClick={() => {
                                                                let report = {
                                                                    title: "Báo cáo cuối tuần ngày " + new Date().toLocaleDateString().slice(0, 2) + ' tháng ' + moment().format('M'),
                                                                    report: ''
                                                                };
                                                                this.props.weekendReportAction.handleReport(report);}}
                                                            className="btn btn-rose"
                                                            to="/administration/weekend-report/create"

                                                        >
                                                            Thêm Báo Cáo
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-9" >
                                                        <Search
                                                            onChange={this.templatesSearchChange}
                                                            value={this.state.query}
                                                            placeholder="Nhập tiêu đề hoặc nội dung tin nhắn để tìm"
                                                        />
                                                    </div>
                                                </div>
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

