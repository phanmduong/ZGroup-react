import React from 'react';
import {Modal} from "react-bootstrap";
import * as weekendReportAction from "./weekendReportAction";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';


class CheckWeekendReportModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return(
            <Modal show={this.props.checkWeekendReportModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Báo cáo cuối tuần</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <h3>Lê Khả Hải</h3>
                                <h3>How to be the rich</h3>
                                <p>
                                    firstly! You must handsome <br/>
                                    Sometime you have to accpect that
                                </p>
                                <h4>1 + 1 = 3!</h4>
                            </div>

                            <br/><br/>
                            {

                                    <div>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-success btn-round" data-dismiss="modal"
                                                onClick={() => this.props.weekendReportAction.showCheckWeekendReportModal()}
                                        >
                                            <i className="material-icons">check</i> Duyệt
                                        </button>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-danger btn-round" data-dismiss="modal"
                                                onClick={() => this.props.weekendReportAction.showCheckWeekendReportModal()}
                                        >
                                            <i className="material-icons">close</i> Huỷ
                                        </button>
                                    </div>

                            }
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

CheckWeekendReportModal.propTypes = {
    weekendReportAction: PropTypes.object.isRequired,
    checkWeekendReportModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        checkWeekendReportModal: state.weekendReport.checkWeekendReportModal,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        weekendReportAction: bindActionCreators(weekendReportAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckWeekendReportModal);