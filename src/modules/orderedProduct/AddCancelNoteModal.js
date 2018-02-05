import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";

class AddCancelNoteModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleNote = this.handleNote.bind(this);
    }

    handleNote(e) {
        let cancelNote = {
            ...this.props.cancelNote,
            noteCancel: e.target.value
        };
        this.props.orderedProductAction.handleAddCancelNoteModal(cancelNote);
    }

    render() {
        let cancelNote = this.props.cancelNote;
        return (
            <Modal show={this.props.addCancelNoteModal}
                   onHide={() => this.props.orderedProductAction.showAddCancelNoteModal()}>
                <a onClick={() => this.props.orderedProductAction.showAddCancelNoteModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Ghi chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="control-label">Ghi chú</label>
                        <textarea type="text" className="form-control"
                                  value={cancelNote.noteCancel ? cancelNote.noteCancel : ''}
                                  onChange={this.handleNote}/>
                        <span className="material-input"/>
                    </div>
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.changeStatus("cancel", cancelNote.id, cancelNote.noteCancel)}>
                            <i
                                className="material-icons">check</i> Xác nhận
                        </button>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-danger btn-round" data-dismiss="modal"
                                onClick={() => this.props.orderedProductAction.showAddCancelNoteModal()}>
                            <i className="material-icons">close</i> Huỷ
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddCancelNoteModal.propTypes = {
    orderedProductAction: PropTypes.object.isRequired,
    addCancelNoteModal: PropTypes.bool,
    cancelNote: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        addCancelNoteModal: state.orderedProduct.addCancelNoteModal,
        cancelNote: state.orderedProduct.cancelNote,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedProductAction: bindActionCreators(orderedProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCancelNoteModal);
