import React from "react";
import PropTypes from "prop-types";
import { CirclePicker } from "react-color";
import Slider from "../../../components/common/Slider";
import {
    FormGroup,
    FormControl,
    ControlLabel,
    Badge,
    Popover,
    OverlayTrigger,
} from "react-bootstrap";

const propTypes = {
    seat: PropTypes.object.isRequired,
    updateSeatFormData: PropTypes.func.isRequired,
};

class CreateSeatComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.changeSlider = this.changeSlider.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeColor = this.changeColor.bind(this);
    }

    handleChange(event) {
        const seat = { ...this.props.seat };
        const field = event.target.name;
        seat[field] = event.target.value;
        this.props.updateSeatFormData(seat);
    }

    changeColor(color) {
        this.props.updateSeatFormData({
            ...this.props.seat,
            color: color.hex,
        });
    }

    changeSlider(value) {
        this.props.updateSeatFormData({
            ...this.props.seat,
            r: Number(value),
        });
    }

    render() {
        const { seat } = this.props;

        const popoverColor = (
            <Popover id="popover-positioned-bottom" title="Chọn màu ghế">
                <CirclePicker
                    width="100%"
                    color={seat.color || "rgb(244, 67, 54)"}
                    onChangeComplete={this.changeColor}
                />
            </Popover>
        );

        return (
            <div className="row">
                <div className="col-xs-4">
                    <FormGroup controlId="seat-name">
                        <ControlLabel>Tên chỗ ngồi</ControlLabel>
                        <FormControl
                            type="text"
                            name="name"
                            value={seat.name}
                            placeholder="Tên chỗ ngồi"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </div>

                <div className="col-xs-4">
                    <FormGroup>
                        <ControlLabel>
                            <span style={{ marginRight: 5 }}>
                                Kích thước ghế
                            </span>
                            <Badge>{parseInt(seat.r || 1)}</Badge>
                        </ControlLabel>
                        <Slider
                            id="seatSize"
                            onChange={this.changeSlider}
                            step={1}
                            value={seat.r || 1}
                            min={1}
                            max={10}
                        />
                    </FormGroup>
                </div>

                <div className="col-xs-4">
                    <FormGroup>
                        <ControlLabel>Màu ghế</ControlLabel>
                        <div>
                            <OverlayTrigger
                                trigger="click"
                                rootClose
                                placement="bottom"
                                overlay={popoverColor}
                            >
                                <div
                                    style={{
                                        width: 30,
                                        height: 30,
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        border: "1px solid #d9d9d9",
                                        background: `${seat.color}`,
                                    }}
                                />
                            </OverlayTrigger>
                        </div>
                    </FormGroup>
                </div>
            </div>
        );
    }
}

CreateSeatComponent.propTypes = propTypes;

export default CreateSeatComponent;
