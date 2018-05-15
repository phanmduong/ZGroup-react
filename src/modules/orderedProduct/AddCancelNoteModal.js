import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import *as orderedProductAction from "./orderedProductAction";
import PropTypes from "prop-types";

class AddCancelNoteModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checkbox: false,
            note: ''
        };
        this.handleNote = this.handleNote.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleNote(e) {
        this.setState({
            checkbox: false,
            note: e.target.value
        });
    }

    handleCheckbox(e) {
        this.setState({
            checkbox: true,
            note: e.target.name
        });
    }

    render() {
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
                                       checked={(this.state.note === "Hết hàng")}
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
                                       checked={(this.state.note === "Sai thông tin")}
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
                                       checked={(this.state.note === "Hết sale")}
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
                                  value={this.state.note && !this.state.checkbox ? this.state.note : ''}
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
                                        this.props.cancelNote,
                                        this.state.note
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
    cancelNote: PropTypes.array.isRequired,
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
