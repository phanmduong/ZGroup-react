import React from "react";
import {linkUploadImageEditor} from "../../../constants/constants";
import ReactEditor from "../../../components/common/ReactEditor";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loading from "../../../components/common/Loading";
import * as weekendReportAction from "./weekendReportAction";
import {bindActionCreators} from 'redux';
import * as helper from '../../../helpers/helper';
import {browserHistory} from "react-router";

class AddReportComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleReport = this.handleReport.bind(this);
        this.handleReport2 = this.handleReport2.bind(this);
        this.saveReport = this.saveReport.bind(this);
        this.exit = this.exit.bind(this);
    }

    saveReport() {

        const index = this.props.user;
        const report = {...this.props.weekendReportModal};
        if (
            helper.isEmptyInput(report.title)
            || helper.isEmptyInput(report.report)
        ) {
            if (helper.isEmptyInput(report.title)) helper.showErrorNotification("Bạn Chưa Nhập Tiêu Đề");
            if (helper.isEmptyInput(report.report)) helper.showErrorNotification("Bạn Chưa Nhập Nội Dung");
        }
        else if (!this.props.params.reportId)
            this.props.weekendReportAction.saveReport(report, index);
        else {
            this.props.weekendReportAction.editReport(index, this.props.params.reportId, report);
        }
    }
    exit() {
        helper.confirm(
            "warning",
            "Cảnh báo",
            "Bạn có chắc muốn thoát? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                browserHistory.push("/administration/weekend-report");
            },
        );
    }
    handleReport(e) {
        const field = e.target.name;
        let report = {
            ...this.props.weekendReportModal,
            [field]: e.target.value
        };
        this.props.weekendReportAction.handleReport(report);
    }

    handleReport2(e) {
        let report = {...this.props.weekendReportModal};
        report.report = e;
        this.props.weekendReportAction.handleReport(report);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">

                    <div className="row">
                        <div className="col-md-5 col-xs-5">
                            <h5>Nhân viên: <b>{this.props.user.name}</b></h5>
                        </div>
                        <div className="col-md-3 col-xs-3">
                            <h5>Date: {new Date().toLocaleDateString()}</h5>
                        </div>
                        <div className="col-md-4 col-xs-4">
                            <h5>Time: {new Date().toLocaleTimeString()} </h5>
                        </div>
                    </div>

                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <h5>Tiêu đề</h5>
                                <input type="text" style={{cursor:"auto"}}
                                       name="title"
                                       className="form-control"
                                       onChange={this.handleReport}
                                       value={this.props.weekendReportModal.title}
                                       disabled={true}
                                />
                                <span className="material-input"/>
                            </div>
                            <br/>

                            <div>
                                <h5>Nội dung bài viết</h5>
                                <div className="row">
                                    <div className="col-md-12">
                                        <ReactEditor
                                            urlPost={linkUploadImageEditor()}
                                            fileField="image"
                                            updateEditor={this.handleReport2}
                                            value={this.props.weekendReportModal.report}
                                        />
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>

                    {
                        this.props.addReport ?
                            <Loading/>
                            :
                            <div style={{float: "right"}}>

                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="" type="button"
                                        className="btn btn-rose" data-dismiss="modal"
                                        onClick={this.saveReport}

                                >
                                    <i className="material-icons">check</i> Xác nhận
                                </button>
                                &ensp;

                                <button className="btn" type="button" onClick={this.exit}>
                                    <i className="material-icons">close</i> Huỷ
                                </button>&emsp;

                            </div>
                    }
                </div>
            </div>
        );
    }
}

AddReportComponent.propTypes = {
    weekendReportModal: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addReport: PropTypes.bool.isRequired,
    reports: PropTypes.array.isRequired,
    weekendReportAction: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        weekendReportModal: state.weekendReport.weekendReportModal,
        addReport: state.weekendReport.addReport,
        user: state.login.user,
        reports: state.weekendReport.reports,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReportComponent);
