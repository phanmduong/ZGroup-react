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
        this.handleComment = this.handleComment.bind(this);
    }
    handleComment(e) {
        const field = e.target.name;
        let comment = {
            ...this.props.comment,
            [field]: e.target.value
        };
        this.props.weekendReportAction.handleComment(comment);
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
                                                                <span style={{color: 'tomato', fontWeight: '600'}}>Tiêu đề:</span><br/>
                                                                <h5 style={{fontWeight: '500'}}>&emsp;{report.title}</h5>
                                                                <span style={{color: 'tomato', fontWeight: '600'}}>Nội dung:</span>
                                                                <div>
                                                                    &emsp;{
                                                                }
                                                                    <div
                                                                        //eslint-disable-next-line
                                                                        dangerouslySetInnerHTML={{__html: report.content}}/>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <span style={{color: 'tomato', fontWeight: '600'}}>Chú thích:</span>
                                                                <textarea style={{cursor: "auto"}}
                                                                       name="comment"
                                                                       className="form-control"
                                                                       onChange={this.handleComment}
                                                                       value={this.props.comment.comment}
                                                                       disabled={(report.status !== 0)}
                                                                />
                                                                <span className="material-input"/>
                                                            </div>

                                                            <br/>
                                                            {
                                                                report.status === 0 ?
                                                                    <div style={{textAlign: "right"}}>
                                                                        <button rel="tooltip" data-placement="top"
                                                                                title=""
                                                                                data-original-title="Remove item"
                                                                                type="button"
                                                                                className="btn btn-rose"
                                                                                data-dismiss="modal"
                                                                                onClick={() => {
                                                                                    this.props.weekendReportAction.showCheckWeekendReportModal();
                                                                                    this.props.weekendReportAction.checkV(report,this.props.comment);
                                                                                }}
                                                                        >
                                                                            <i className="material-icons">check</i> Duyệt
                                                                        </button>
                                                                        &ensp;
                                                                        <button rel="tooltip" data-placement="toxp"
                                                                                title=""
                                                                                data-original-title="Remove item"
                                                                                type="button"
                                                                                className="btn"
                                                                                data-dismiss="modal"
                                                                                onClick={() => this.props.weekendReportAction.showCheckWeekendReportModal()}
                                                                        >
                                                                            <i className="material-icons">close</i> Huỷ
                                                                        </button>
                                                                        &emsp;
                                                                    </div> :
                                                                    <div style={{textAlign: "right"}}>
                                                                        <button rel="tooltip" data-placement="top"
                                                                                title=""
                                                                                data-original-title="Remove item"
                                                                                type="button"
                                                                                className="btn btn-rose"
                                                                                data-dismiss="modal"
                                                                                onClick={() => this.props.weekendReportAction.showCheckWeekendReportModal()}
                                                                        >
                                                                            <i className="material-icons">check</i> Trở
                                                                            lại
                                                                        </button>
                                                                        &emsp;
                                                                    </div>

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
    comment:PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        loadingModal: state.weekendReport.loadingModal,
        checkWeekendReportModal: state.weekendReport.checkWeekendReportModal,
        report: state.weekendReport.report,
        comment: state.weekendReport.comment,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckWeekendReportModal);