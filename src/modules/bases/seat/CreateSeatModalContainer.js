import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Badge, Button, ControlLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import {createSeat, toggleCreateSeatModal, updateSeatFormData} from "./seatActions";
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
        this.saveSeat = this.saveSeat.bind(this);
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

    saveSeat() {
        const {x, y} = this.props.point;
        this.props.actions.createSeat(this.props.roomId, {
            ...this.props.seat,
            x,
            y
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
                        <ControlLabel>
                            <span style={{marginRight: 5}}>Kích thước ghế</span>
                            <Badge>{parseInt(seat.r || 1)}</Badge>
                        </ControlLabel>
                        <Slider
                            onChange={this.changeSlider}
                            step={1}
                            value={seat.r || 1}
                            min={1}
                            max={10}/>
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
                    <Button
                        onClick={this.saveSeat}
                        className="btn btn-rose">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CreateSeatModalContainer.propTypes = {
    showCreateSeatModal: PropTypes.bool.isRequired,
    roomId: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
    ]),
    actions: PropTypes.object.isRequired,
    point: PropTypes.object.isRequired,
    seat: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showCreateSeatModal: state.seat.showCreateSeatModal,
        seat: state.seat.seat,
        point: state.seat.point
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleCreateSeatModal,
            createSeat,
            updateSeatFormData
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSeatModalContainer);