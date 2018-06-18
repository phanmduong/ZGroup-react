import React from 'react';
import * as helper from "../../../helpers/helper";
import {Modal} from "react-bootstrap";
import FormInputText from "../../../components/common/FormInputText";
import CheckBoxMaterial from "../../../components/common/CheckBoxMaterial";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import *as filmAction from "../filmAction";


class BookingRegisterSessionModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            confirm:false,
        };
        this.updateFormData = this.updateFormData.bind(this);
    }
    updateFormData(event) {
        const field = event.target.name;
        let film = {
            ...this.props.handleBookingModal,
            [field]: event.target.value,
        };
        this.props.filmAction.handleBookingModal(film);
    }
    render(){
        return(
            <Modal show={this.props.addBookingRegisterSessionModal}
                   onHide={() => {
                       helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật", () => {
                            this.props.filmAction.toggleBookingModal();
                       });

                   }}
            >
                <a onClick={() => this.props.filmAction.toggleBookingModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Đặt vé </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        label="Họ tên"
                        name="name"
                        updateFormData={this.updateFormData}
                        value={this.props.handleBookingModal.name || ''}
                        required
                    />
                    <FormInputText
                        label="Số điện thoại"
                        name="phone"
                        updateFormData={this.updateFormData}
                        value={this.props.handleBookingModal.phone|| ''}
                        required
                    />
                    <FormInputText
                        label="Email"
                        name="email"
                        updateFormData={this.updateFormData}
                        value={this.props.handleBookingModal.email || ''}
                        required
                    />
                    <br/>
                    <CheckBoxMaterial
                        name="display"
                        checked={this.state.confirm}
                        onChange={()=>{
                            this.setState({...this.state,
                            confirm:!this.state.confirm});
                        }}
                        label="Xác nhận số tiền đã thu là:"
                    />
                    <p style={{textAlign:'center',fontSize:'24px', fontWeight:'400'}}>
                        {this.props.handleBookingModal.sum/1000 || ''}.000 VNĐ
                    </p>
                    <br/>
                    <div style={{textAlign: "right"}}>
                        <div>
                            <button
                                type="button"
                                className="btn btn-rose"
                                onClick={()=>{
                                    //console.log("a",this.props.handleBookingModal);
                                    this.props.filmAction.bookingSeat(this.props.handleBookingModal);
                                }}
                            >
                                Xác nhận
                            </button>
                            <button
                                type="button"
                                className="btn"
                                onClick={() => {this.props.filmAction.toggleBookingModal();}}
                            >
                                Huỷ
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

BookingRegisterSessionModal.propTypes = {
    addBookingRegisterSessionModal: PropTypes.bool.isRequired,
    filmAction: PropTypes.object.isRequired,
    handleBookingModal: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {
        addBookingRegisterSessionModal: state.film.addBookingRegisterSessionModal,
        handleBookingModal: state.film.handleBookingModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators( filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRegisterSessionModal);