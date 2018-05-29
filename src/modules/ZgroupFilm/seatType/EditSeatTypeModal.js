import React from 'react';
import {Modal} from "react-bootstrap";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import * as filmAction from "../filmAction";
import * as helper from "../../../helpers/helper";
import FormInputText from "../../../components/common/FormInputText";
import Loading from "../../../components/common/Loading";


class EditSeatTypeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSeatType = this.handleSeatType.bind(this);
        this.editSeatType = this.editSeatType.bind(this);

    }

    handleSeatType(e) {
        const field = e.target.name;
        let seatType = {
            ...this.props.handleSeatTypeModal,
            [field]: e.target.value
        };
        this.props.filmAction.handleSeatTypeModal(seatType);
    }

    editSeatType() {
        if (helper.isEmptyInput(this.props.handleSeatTypeModal.type))
            helper.showErrorNotification("Bạn cần nhập loại ghế");
        else this.props.filmAction.editSeatType(this.props.handleSeatTypeModal);
    }


    render() {
        return (
            <Modal
                show={this.props.openModal}
                onHide={() => {
                    helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật",
                        () => {
                            this.props.filmAction.toggleSeatTypeModal();
                        });

                }}>
                <a onClick={() => {
                    this.props.filmAction.toggleSeatTypeModal();
                }}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title>Quản lý loại ghế</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">

                        <form role="form">
                            <div>
                                <label>Màu ghế: </label>&emsp;
                                <button style={{
                                    backgroundColor: this.props.handleSeatTypeModal.color || '', color: "white",
                                    padding: "10px 11px", border: "none", borderRadius: "20px"
                                }}>
                                    <b>A1</b>
                                </button>
                                <FormInputText
                                    label="Ý nghĩa"
                                    name="type"
                                    updateFormData={this.handleSeatType}
                                    value={this.props.handleSeatTypeModal.type || ''}
                                    required
                                    disabled={this.props.isEditSeatType}
                                />
                            </div>
                            <br/>
                            {
                                this.props.isEditSeatType ?
                                    <Loading/>
                                    :
                                    <div style={{textAlign: "right"}}>

                                        <div>
                                            <button
                                                type="button"
                                                className="btn btn-rose"
                                                onClick={this.editSeatType}
                                            >
                                                Lưu
                                            </button>
                                            <button
                                                type="button"
                                                className="btn"
                                                onClick={() => {
                                                    this.props.filmAction.toggleSeatTypeModal();
                                                }}
                                            >
                                                Huỷ
                                            </button>
                                        </div>


                                    </div>
                            }
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

EditSeatTypeModal.propTypes = {
    filmAction: PropTypes.object.isRequired,
    handleSeatTypeModal: PropTypes.object.isRequired,
    openModal: PropTypes.bool.isRequired,
    isEditSeatType: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        openModal: state.film.openModal,
        isEditSeatType: state.film.isEditSeatType,
        handleSeatTypeModal: state.film.handleSeatTypeModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSeatTypeModal);