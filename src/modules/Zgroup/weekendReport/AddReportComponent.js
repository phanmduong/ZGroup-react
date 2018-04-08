import React from "react";
import {linkUploadImageEditor} from "../../../constants/constants";
import ReactEditor from "../../../components/common/ReactEditor";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loading from "../../../components/common/Loading";
import * as weekendReportAction from "./weekendReportAction";
import {bindActionCreators} from 'redux';
import * as helper from '../../../helpers/helper';


class AddReportComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleReport = this.handleReport.bind(this);
        this.handleReport2 = this.handleReport2.bind(this);
        this.saveReport = this.saveReport.bind(this);
    }

    saveReport() {
        const index = this.props.user;
        const report = {...this.props.weekendReportModal};
        if(
            helper.isEmptyInput(report.title)
            || helper.isEmptyInput(report.report)
        ) {
           if(helper.isEmptyInput(report.title)) helper.showErrorNotification("Bạn Chưa Nhập Tiêu Đề");
           if(helper.isEmptyInput(report.report)) helper.showErrorNotification("Bạn Chưa Nhập Nội Dung");
        }
        else this.props.weekendReportAction.saveReport(report, index);
    }

    handleReport(e) {
        const field = e.target.name;
        let report = {
            ...this.props.weekendReportModal,
            [field]: e.target.value
        };
        this.props.weekendReportAction.handleReport(report);
    }
    handleReport2(e){
        let report = {...this.props.weekendReportModal};
        report.report = e;
        this.props.weekendReportAction.handleReport(report);
    }
    render() {
        return (
            <div>
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
                {
                    this.props.addReport ?
                        <div>
                            <br/><br/><br/><br/>
                            <Loading/>
                            <br/><br/><br/><br/>
                        </div> :
                        <div className="form-group">
                            <form method="#" action="#">
                                <div className="form-group">
                                    <h5>Tiêu đề</h5>
                                    <input type="text"
                                           name="title"
                                           className="form-control"
                                           onChange={this.handleReport}
                                           value={this.props.weekendReportModal.title}
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
                                    value={this.props.weekendReportModal.report || ''}
                                    />
                                    </div>
                                    </div>
                                </div>


                            </form>
                        </div>
                }
                <div>
                    <button rel="tooltip" data-placement="top" title=""
                            data-original-title="" type="button"
                            className="btn btn-success btn-round" data-dismiss="modal"
                            onClick={this.saveReport}

                    >
                        <i className="material-icons">check</i> Gửi báo cáo
                    </button>
                    <a href={'/administration/weekend-report'}>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Trở lại" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                        >
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </a>
                </div>
            </div>
        );
    }
}

AddReportComponent.propTypes = {
    weekendReportModal: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addReport: PropTypes.bool.isRequired,
    weekendReportAction: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        weekendReportModal: state.weekendReport.weekendReportModal,
        addReport: state.weekendReport.addReport,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReportComponent);
