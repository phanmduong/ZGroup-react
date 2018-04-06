import React from 'react';
import {Modal} from "react-bootstrap";
import * as weekendReportAction from "./weekendReportAction";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../../components/common/Loading";

class CheckWeekendReportModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal show={this.props.checkWeekendReportModal}
                   onHide={() => this.props.weekendReportAction.showCheckWeekendReportModal()}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Báo cáo cuối tuần</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            this.props.loadingModal ? <div><br/><Loading/><br/><br/><br/></div> :
                                (
                                    <div>
                                        {
                                            this.props.report && this.props.report.map((report, index) => {
                                                return (
                                                    <div className="form-group" key={index}>
                                                        <form method="#" action="#">
                                                            <div className="form-group">
                                                                <h4><b>{report.staff.name}</b></h4>
                                                                <span style={{color: 'tomato', fontWeight: '600'}}>Tiêu đề:</span>
                                                                <p><b>&emsp;{report.title}</b></p>
                                                                <span style={{color: 'tomato', fontWeight: '600'}}>Nội dung:</span>
                                                                <p>
                                                                    &emsp;{
                                                                }
                                                                    <div
                                                                        //eslint-disable-next-line
                                                                        dangerouslySetInnerHTML={{__html: report.content}}/>
                                                                </p>
                                                            </div>
                                                            <br/><br/>
                                                            {
                                                                report.status === 0 ?
                                                                    <div>
                                                                        <button rel="tooltip" data-placement="top"
                                                                                title=""
                                                                                data-original-title="Remove item"
                                                                                type="button"
                                                                                className="btn btn-success btn-round"
                                                                                data-dismiss="modal"
                                                                                onClick={() => {
                                                                                    this.props.weekendReportAction.showCheckWeekendReportModal();
                                                                                    this.props.weekendReportAction.checkV(report);
                                                                                }}
                                                                        >
                                                                            <i className="material-icons">check</i> Duyệt
                                                                        </button>
                                                                        <button rel="tooltip" data-placement="toxp"
                                                                                title=""
                                                                                data-original-title="Remove item"
                                                                                type="button"
                                                                                className="btn btn-danger btn-round"
                                                                                data-dismiss="modal"
                                                                                onClick={() => this.props.weekendReportAction.showCheckWeekendReportModal()}
                                                                        >
                                                                            <i className="material-icons">close</i> Huỷ
                                                                        </button>
                                                                    </div> :
                                                                    <button rel="tooltip" data-placement="top" title=""
                                                                            data-original-title="Remove item"
                                                                            type="button"
                                                                            className="btn btn-success btn-round"
                                                                            data-dismiss="modal"
                                                                            onClick={() => this.props.weekendReportAction.showCheckWeekendReportModal()}
                                                                    >
                                                                        <i className="material-icons">check</i> Trở lại
                                                                    </button>

                                                            }
                                                        </form>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                )
                        }
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}

CheckWeekendReportModal.propTypes = {
    weekendReportAction: PropTypes.object.isRequired,
    checkWeekendReportModal: PropTypes.bool.isRequired,
    report: PropTypes.array.isRequired,
    loadingModal: PropTypes.bool.isRequired,

};

function mapStateToProps(state) {
    return {
        loadingModal: state.weekendReport.loadingModal,
        checkWeekendReportModal: state.weekendReport.checkWeekendReportModal,
        report: state.weekendReport.report,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckWeekendReportModal);