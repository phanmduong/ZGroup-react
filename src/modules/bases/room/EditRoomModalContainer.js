import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputText from "../../../components/common/FormInputText";
import {Modal} from "react-bootstrap";
import Select from "../../../components/common/Select";
import * as helper from "../../../helpers/helper";
import {storeRoom} from "../../rooms/roomActions";

// Import actions here!!

class EditRoomModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closeModal = this.closeModal.bind(this);
        this.onChangeBaseForm = this.onChangeBaseForm.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    closeModal() {
        this.props.closeModal();
    }

    onChangeBaseForm(value) {
        // this.setState({
        //     room: {
        //         ...this.state.room,
        //         base_id: value
        //     }
        // });
    }

    updateFormData(event) {
        const field = event.target.name;
        let room = {...this.props.room};
        room[field] = event.target.value;

    }


    storeRoom() {
        if (helper.isEmptyInput(this.state.room.base_id)) {
            helper.showTypeNotification("Vui lòng chọn cơ sở", "warning");
            return;
        }
        this.props.actions.storeRoom(this.state.room);
    }


    render() {
        return (
            <Modal show={this.props.showEditRoomModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.isEditRoom ? "Sửa phòng" : "Tạo phòng"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form role="form"
                          id="form-add-room">
                        <FormInputText
                            label="Tên phòng"
                            required
                            name="name"
                            updateFormData={this.updateFormData}
                            value={this.props.room.name || ""}
                        />
                        <Select
                            defaultMessage={'Chọn cơ sở'}
                            options={this.props.bases}
                            value={this.props.room.base_id}
                            onChange={this.onChangeBaseForm}
                        />
                        {
                            this.props.isStoringRoom ?
                                (
                                    <button
                                        className="btn btn-rose disabled"
                                        type="button"
                                    >
                                        <i className="fa fa-spinner fa-spin"/>
                                        {this.props.isEditRoom ? 'Đang lưu' : 'Đang tạo'}
                                    </button>
                                )
                                :
                                (
                                    <button
                                        className="btn btn-rose"
                                        type="button"
                                        onClick={this.storeRoom}
                                    >
                                        {this.props.isEditRoom ? 'Lưu' : 'Tạo'}
                                    </button>
                                )
                        }
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

EditRoomModalContainer.propTypes = {
    isEditRoom: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    isStoringRoom: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    showEditRoomModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isStoringRoom: state.rooms.isStoringRoom,
        showEditRoomModal: state.rooms.showEditRoomModal,
        isEditRoom: state.rooms.isEditRoom,
        room: state.rooms.room,
        bases: state.rooms.bases
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({storeRoom}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoomModalContainer);