import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as weekendReportAction from "./weekendReportAction";
import {bindActionCreators} from 'redux';

class WeekendReportComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
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
                                        {report.stuff_id}</td>
                                    <td>
                                        {report.name}
                                    </td>
                                    <td>
                                        {report.tittle}
                                    </td>
                                    <td>{new Date().toLocaleTimeString()} - {new Date().toLocaleDateString()}</td>
                                    <td>
                                        <div className="btn-group-action">
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Duyệt"
                                               onClick={() => this.props.weekendReportAction.showCheckWeekendReportModal()}
                                            >
                                                <i className="material-icons">check</i>
                                            </a>
                                        </div>
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
    reports: PropTypes.object.isRequired,
    weekendReportAction: PropTypes.object.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(WeekendReportComponent);