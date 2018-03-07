import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import { dotNumber } from "../../../helpers/helper";
import { DATETIME_SEAT_FORMAT } from "../../../constants/constants";
import Loading from "../../../components/common/Loading";

class ConfirmSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.bookSeat = this.bookSeat.bind(this);
    }

    handleClose() {
        this.props.chooseSeatActions.toggleConfirmSeatModal(false);
    }

    bookSeat() {
        const { register, seat, from, to } = this.props;
        this.props.chooseSeatActions.bookSeat({
            registerId: register.id,
            seatId: seat.id,
            startTime: moment(from, DATETIME_SEAT_FORMAT).unix(),
            endTime: moment(to, DATETIME_SEAT_FORMAT).unix(),
        });
    }

    render() {
        const icon = {
            fontSize: 20,
            position: "relative",
            top: 5,
            color: "#888",
        };
        const {
            showConfirmSeatModal,
            seat,
            from,
            to,
            isBookingSeat,
        } = this.props;
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
                                        Ghế{" "}
                                        <div
                                            style={{
                                                borderRadius: "50%",
                                                height: 28,
                                                width: 28,
                                                fontWeight: "bold",
                                                lineHeight: "28px",
                                                textAlign: "center",
                                                background: seat.color,
                                                color: "white",
                                                display: "inline-block",
                                            }}
                                        >
                                            {seat.name}
                                        </div>
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
                                    <b>{from}</b>
                                    <br />
                                    <i style={icon} className="material-icons">
                                        pause_circle_filled
                                    </i>{" "}
                                    <b>{to}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {isBookingSeat ? (
                        <Loading />
                    ) : (
                        <div>
                            <Button
                                className="btn btn-rose"
                                onClick={this.bookSeat}
                            >
                                Đặt chỗ
                            </Button>
                            <Button onClick={this.handleClose}>Đóng</Button>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>
        );
    }
}

ConfirmSeatModalContainer.propTypes = {
    chooseSeatActions: PropTypes.object.isRequired,
    seat: PropTypes.object.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    showConfirmSeatModal: PropTypes.bool.isRequired,
    isBookingSeat: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {
        showConfirmSeatModal,
        register,
        seat,
        from,
        to,
        isBookingSeat,
    } = state.chooseSeat;
    return {
        showConfirmSeatModal,
        register,
        seat,
        isBookingSeat,
        from,
        to,
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
