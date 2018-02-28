import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as financeActions from "./financeActions";
import PropTypes from "prop-types";

class CancelReasonModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleNote = this.handleNote.bind(this);
    }

    handleNote(e) {
        let transfer = {...this.props.transferCancelReason};
        transfer.note = e.target.value;
        this.props.financeActions.handleCancelReasonModal(transfer);
    }

    render() {
        let transfer = this.props.transferCancelReason;
        return (
            <Modal show={this.props.cancelReasonModal}
                   onHide={() => this.props.financeActions.showCancelReasonModal()}>
                <a onClick={() => this.props.financeActions.showCancelReasonModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Lý do từ chối</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="label-control">Lý do từ chối</label>
                        <textarea type="text" className="form-control"
                                  value={transfer.note}
                                  name="note"
                                  onChange={this.handleNote}/>
                        <span className="material-input"/>
                    </div>
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() => this.props.financeActions.updateTransferStatus(
                                    transfer.id, "cancel", transfer.note, null
                                )}>
                            <i className="material-icons">check</i> Xác nhận
                        </button>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                                onClick={() => this.props.financeActions.showCancelReasonModal()}>
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

CancelReasonModal.propTypes = {
    financeActions: PropTypes.object.isRequired,
    cancelReasonModal: PropTypes.bool,
    transferCancelReason: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        cancelReasonModal: state.finance.cancelReasonModal,
        transferCancelReason: state.finance.transferCancelReason,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        financeActions: bindActionCreators(financeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelReasonModal);
