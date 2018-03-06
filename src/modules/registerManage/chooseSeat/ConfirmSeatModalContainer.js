import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { dotNumber } from "../../../helpers/helper";

class ConfirmSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.chooseSeatActions.toggleConfirmSeatModal(false);
    }

    render() {
        const icon = {
            fontSize: 20,
            position: "relative",
            top: 5,
            color: "#888",
        };
        const { showConfirmSeatModal, register, seat } = this.props;
        return (
            <Modal show={showConfirmSeatModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đặt chỗ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-12">
                            {seat.id && (
                                <div className="card">
                                    <div
                                        className="card-header card-header-icon"
                                        data-background-color="blue"
                                    >
                                        <i className="material-icons">
                                            event_seat
                                        </i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Chỗ ngồi</h4>
                                        <i
                                            style={icon}
                                            className="material-icons"
                                        >
                                            event_seat
                                        </i>{" "}
                                        Ghế {seat.name}
                                        <br />
                                        <i
                                            style={icon}
                                            className="material-icons"
                                        >
                                            crop_landscape
                                        </i>{" "}
                                        Phòng {seat.room.name}
                                        <br />
                                        <i
                                            style={icon}
                                            className="material-icons"
                                        >
                                            business
                                        </i>{" "}
                                        Cơ sở {dotNumber(seat.room.base.name)}
                                        <br />
                                        <i
                                            style={icon}
                                            className="material-icons"
                                        >
                                            map
                                        </i>{" "}
                                        Cơ sở {seat.room.base.address}
                                    </div>
                                </div>
                            )}

                            <div className="card">
                                <div
                                    className="card-header card-header-icon"
                                    data-background-color="green"
                                >
                                    <i className="material-icons">timer</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">
                                        Thời gian đặt chỗ
                                    </h4>
                                    <i style={icon} className="material-icons">
                                        play_circle_filled
                                    </i>{" "}
                                    {register.subscription.user_pack.name}
                                    <br />
                                    <i style={icon} className="material-icons">
                                        pause_circle_filled
                                    </i>{" "}
                                    {dotNumber(register.subscription.price)} đ
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

ConfirmSeatModalContainer.propTypes = {
    chooseSeatActions: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    showConfirmSeatModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const { showConfirmSeatModal, register, seat } = state.chooseSeat;
    return {
        showConfirmSeatModal,
        register,
        seat,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSeatActions: bindActionCreators(chooseSeatActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ConfirmSeatModalContainer,
);
