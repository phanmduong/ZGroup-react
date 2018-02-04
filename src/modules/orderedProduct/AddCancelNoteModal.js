import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";

class AddCancelNoteModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checkbox: false
        };
        this.handleNote = this.handleNote.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleNote(e) {
        this.setState({checkbox: false});
        let cancelNote = {
            ...this.props.cancelNote,
            noteCancel: e.target.value
        };
        this.props.orderedProductAction.handleAddCancelNoteModal(cancelNote);
    }

    handleCheckbox(e) {
        this.setState({checkbox: true});
        let cancelNote = {
            ...this.props.cancelNote,
            noteCancel: e.target.name
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
                    <Modal.Title id="contained-modal-title">Lý do hủy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="radio">
                            <label>
                                <input type="radio"
                                       name="Hết hàng"
                                       checked={(cancelNote.noteCancel === "Hết hàng")}
                                       onChange={this.handleCheckbox}
                                />
                                <span className="circle"/>
                                <span className="check"/>Hết hàng
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                       name="Sai thông tin"
                                       checked={(cancelNote.noteCancel === "Sai thông tin")}
                                       onChange={this.handleCheckbox}
                                />
                                <span className="circle"/>
                                <span className="check"/>Sai thông tin
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                       name="Hết sale"
                                       checked={(cancelNote.noteCancel === "Hết sale")}
                                       onChange={this.handleCheckbox}
                                />
                                <span className="circle"/>
                                <span className="check"/>Hết sale
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="label-control">Lý do khác</label>
                        <textarea type="text" className="form-control"
                                  value={cancelNote.noteCancel && !this.state.checkbox ? cancelNote.noteCancel : ''}
                                  onChange={this.handleNote}
                                  placeholder="Nhập lý do khác vào đây"/>
                        <span className="material-input"/>
                    </div>
                    <div>
                        <button rel="tooltip" data-placement="top" title=""
                                data-original-title="Remove item" type="button"
                                className="btn btn-success btn-round" data-dismiss="modal"
                                onClick={() =>
                                    this.props.orderedProductAction.changeStatus(
                                        "cancel",
                                        cancelNote.id,
                                        cancelNote.noteCancel,
                                        null
                                    )}>
                            <i className="material-icons">check</i> Xác nhận
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
