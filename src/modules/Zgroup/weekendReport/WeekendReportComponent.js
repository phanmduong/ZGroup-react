import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as weekendReportAction from "./weekendReportAction";
import {bindActionCreators} from 'redux';
import TooltipButton from "../../../components/common/TooltipButton";
import {Link} from "react-router";

class WeekendReportComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    showModal(i) {
        this.props.weekendReportAction.showCheckWeekendReportModal();
        this.props.weekendReportAction.loadReportById(i);
    }

    render() {

        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Nhân viên</th>
                        <th>Tiêu đề</th>
                        <th>Thời gian</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.reports && this.props.reports.map((report, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {report.staff.name}
                                    </td>
                                    <td style={{width: '50%'}}>
                                        {report.title}
                                    </td>
                                    <td>
                                        {report.created_at.date.slice(0, 19)}
                                    </td>
                                    <td>
                                        {
                                            report.status === 0 ?
                                                <div className="btn-group-action">
                                                    {this.props.user.role === 2?
                                                    <div style={{display: "inline-block"}}>
                                                        <TooltipButton placement="top"
                                                                       text={`Duyệt`}>
                                                            <a onClick={() => this.showModal(report.id)}>
                                                                <i className="material-icons">check</i>
                                                            </a></TooltipButton>&ensp;
                                                    </div>:''
                                                    }
                                                    { this.props.user.id === report.staff.id ?
                                                        <Link
                                                            onClick={() => {
                                                                let a = {
                                                                    title: report.title,
                                                                    report: report.content
                                                                };
                                                                this.props.weekendReportAction.handleReport(a);
                                                            }}
                                                            to={`/administration/weekend-report/edit/` + report.id}
                                                            style={{display: "inline-block"}}>
                                                            <TooltipButton placement="top"
                                                                           text={`Sửa`}>
                                                                <i className="material-icons">edit</i>
                                                            </TooltipButton>
                                                        </Link> :''
                                                    }
                                                </div> :
                                                <b style={{cursor: "pointer"}}
                                                   onClick={() => this.showModal(report.id)}>
                                                    Đã Duyệt</b>
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

WeekendReportComponent.propTypes = {
    reports: PropTypes.array.isRequired,
    weekendReportAction: PropTypes.object.isRequired,
    report: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        reports: state.weekendReport.reports,
        report: state.weekendReport.report,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekendReportComponent);