import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import {toggleCreateSeatModal, updateSeatFormData} from "./seatActions";
import {CirclePicker} from "react-color";
import Slider from "../../../components/common/Slider";

// Import actions here!!

class CreateSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.changeSlider = this.changeSlider.bind(this);
    }

    handleClose() {
        this.props.actions.toggleCreateSeatModal(false);
    }

    handleChange(event) {
        const seat = {...this.props.seat};
        const field = event.target.name;
        seat[field] = event.target.value;
        this.props.actions.updateSeatFormData(seat);
    }

    changeColor(color) {
        this.props.actions.updateSeatFormData({
            ...this.props.seat,
            color: color.hex
        });
    }

    changeSlider(value) {
        this.props.actions.updateSeatFormData({
            r: value
        });
    }

    render() {
        const {seat} = this.props;
        return (
            <Modal show={this.props.showCreateSeatModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm ghế</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        controlId="seat-name">
                        <ControlLabel>Tên chỗ ngồi</ControlLabel>
                        <FormControl
                            type="text"
                            name="name"
                            value={seat.name || name}
                            placeholder="Tên chỗ ngồi"
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <div style={{
                            display: "flex"
                        }}>
                            <div style={{border: "1px solid #757575"}}>
                                {seat.r || 1}
                            </div>

                            <div style={{flex: 1}}>
                                <Slider
                                    onChange={this.changeSlider}
                                    step={1}
                                    value={seat.r || 1}
                                    min={1}
                                    max={10}/>
                            </div>

                        </div>
                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Màu ghế</ControlLabel>
                        <CirclePicker
                            width="100%"
                            color={seat.color || ""}
                            onChangeComplete={this.changeColor}/>
                    </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-rose">Lưu</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CreateSeatModalContainer.propTypes = {
    showCreateSeatModal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    seat: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showCreateSeatModal: state.seat.showCreateSeatModal,
        seat: state.seat.seat
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({toggleCreateSeatModal, updateSeatFormData}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSeatModalContainer);