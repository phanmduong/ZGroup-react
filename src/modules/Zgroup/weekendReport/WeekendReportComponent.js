import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as weekendReportAction from "./weekendReportAction";
import {bindActionCreators} from 'redux';

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
                        <th>Stt</th>
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
                                        {report.id}
                                    </td>
                                    <td>
                                        {report.staff.name}
                                    </td>
                                    <td style={{width:'50%'}}>
                                        {report.title}
                                    </td>
                                    <td>
                                        {report.created_at.date.slice(0,19)}
                                    </td>
                                    <td>
                                        {
                                        report.status === 0 ?
                                            <div className="btn-group-action">
                                                <a style={{color: "#878787"}}
                                                   data-toggle="tooltip" title=""
                                                   type="button" rel="tooltip"
                                                   data-original-title="Duyệt"
                                                   onClick={() => this.showModal(report.id)}
                                                >
                                                    <i className="material-icons">check</i>
                                                </a>
                                            </div> :
                                            <h1>v</h1>
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
};

function mapStateToProps(state) {
    return {
        reports: state.weekendReport.reports,
        report: state.weekendReport.report,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekendReportComponent);