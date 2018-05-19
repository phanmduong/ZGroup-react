import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import Loading from "../../../components/common/Loading";
import RoomGrid from "../../bases/room/RoomGrid";
import { DATETIME_SEAT_FORMAT } from "../../../constants/constants";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import moment from "moment";
import ConfirmSeatModalContainer from "./ConfirmSeatModalContainer";
import { showErrorMessage } from "../../../helpers/helper";
import ChooseSeatHistoryModalContainer from "./ChooseSeatHistoryModalContainer";

class ChooseSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.setActiveRoom = this.setActiveRoom.bind(this);
        this.onChooseSeat = this.onChooseSeat.bind(this);
        this.mergeSeats = this.mergeSeats.bind(this);
        this.onFromDateInputChange = this.onFromDateInputChange.bind(this);
        this.onToDateInputChange = this.onToDateInputChange.bind(this);
        this.loadSeats = this.loadSeats.bind(this);
        this.openChooseSeatHistoryModal = this.openChooseSeatHistoryModal.bind(
            this,
        );
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal && nextProps.base) {
            this.props.chooseSeatActions.loadRooms(nextProps.base.id);
        }
    }

    openChooseSeatHistoryModal() {
        this.props.chooseSeatActions.toggleChooseSeatHistoryModal(true);
    }

    timeValid(from, to) {
        const unixFrom = moment(from, DATETIME_SEAT_FORMAT).unix();
        const unixTo = moment(to, DATETIME_SEAT_FORMAT).unix();

        return unixFrom <= unixTo;
    }

    loadSeats(roomId = null) {
        let { room, from, to } = this.props;
        from = moment(from, DATETIME_SEAT_FORMAT).unix();
        to = moment(to, DATETIME_SEAT_FORMAT).unix();

        if (from && to && roomId) {
            this.props.chooseSeatActions.loadSeats(roomId, from, to);
            return;
        }

        if (from && to && room.id) {
            this.props.chooseSeatActions.loadSeats(room.id, from, to);
            return;
        }
    }

    mergeSeats(bookedSeats = [], seats = []) {
        return [
            ...seats,
            ...bookedSeats.map(seat => {
                return {
                    ...seat,
                    booked: true,
                };
            }),
        ].map(seat => {
            return {
                ...seat,
                index: seat.id,
            };
        });
    }

    onChooseSeat(index) {
        const seats = this.mergeSeats(this.props.bookedSeats, this.props.seats);
        const seat = seats.filter(seat => {
            return index === seat.id;
        })[0];

        if (seat.booked) {
            showErrorMessage("Lỗi", "Ghế này đã được đặt.");
        } else {
            this.props.chooseSeatActions.toggleConfirmSeatModal(true, seat);
        }
    }

    handleClose() {
        this.props.chooseSeatActions.toggleShowChooseSeatModal(false);
    }

    setActiveRoom(roomId) {
        this.props.chooseSeatActions.setActiveRoom(roomId);
        this.loadSeats(roomId);
    }

    onFromDateInputChange(event) {
        const from = event.target.value;

        if (this.timeValid(from, this.props.to)) {
            this.loadSeats();
        }
        this.props.chooseSeatActions.setFromTime(from);
    }

    onToDateInputChange(event) {
        const to = event.target.value;

        if (this.timeValid(this.props.from, to)) {
            this.loadSeats();
        }
        this.props.chooseSeatActions.setToTime(to);
    }

    render() {
        const { rooms, room, from, to, register } = this.props;

        return (
            <Modal
                animation={false}
                bsSize="large"
                show={this.props.showModal}
                onHide={this.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cơ sở {this.props.base.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <ChooseSeatHistoryModalContainer />
                        <ConfirmSeatModalContainer />
                        <div className="col-sm-8">
                            {!this.timeValid(from, to) && (
                                <div className="col-sm-12">
                                    <div className="alert alert-danger">
                                        Thời gian bắt đầu phải nhỏ hơn thời gian
                                        kết thúc
                                    </div>
                                </div>
                            )}

                            <div className="col-md-6">
                                <FormInputDateTime
                                    format={DATETIME_SEAT_FORMAT}
                                    name="from"
                                    id="from"
                                    maxDate={to}
                                    label="Bắt đầu"
                                    value={from}
                                    defaultDate={moment()}
                                    updateFormData={this.onFromDateInputChange}
                                />
                            </div>
                            <div className="col-md-6">
                                {register.subscription && (
                                    <FormInputDateTime
                                        name="to"
                                        format={DATETIME_SEAT_FORMAT}
                                        id="to"
                                        minDate={from}
                                        label="Kết thúc"
                                        value={to}
                                        defaultDate={moment().add(
                                            register.subscription.hours,
                                            "hours",
                                        )}
                                        updateFormData={
                                            this.onToDateInputChange
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div className="col-sm-4" style={{ paddingTop: 30 }}>
                            <Button
                                onClick={this.openChooseSeatHistoryModal}
                                className="btn btn-success"
                            >
                                Lịch sử đặt chỗ
                            </Button>
                        </div>
                    </div>
                    {this.props.isLoading ? (
                        <Loading />
                    ) : (
                        <div className="card-content">
                            <ul className="nav nav-pills nav-pills-rose">
                                {rooms &&
                                    rooms.map(room => (
                                        <li
                                            key={room.id}
                                            className={
                                                room.isActive ? "active" : ""
                                            }
                                        >
                                            <a
                                                onClick={() =>
                                                    this.setActiveRoom(room.id)
                                                }
                                                aria-expanded="true"
                                            >
                                                {room.name}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                            <div
                                className="tab-content"
                                style={{ marginTop: 20 }}
                            >
                                {this.props.isLoadingSeats ? (
                                    <Loading />
                                ) : (
                                    this.timeValid(from, to) &&
                                    room.id && (
                                        <div
                                            key={room.id}
                                            className="tab-pane active"
                                        >
                                            <div>
                                                <RoomGrid
                                                    canvasId={
                                                        "bookingRegisterSession-canvas" + room.id
                                                    }
                                                    gridSize={30}
                                                    gridOn={false}
                                                    onClick={() => {}}
                                                    onDrag={() => {}}
                                                    roomLayoutUrl={
                                                        room.room_layout_url
                                                    }
                                                    onPointClick={
                                                        this.onChooseSeat
                                                    }
                                                    width={room.width}
                                                    height={room.height}
                                                    seats={this.mergeSeats(
                                                        this.props.bookedSeats,
                                                        this.props.seats,
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        );
    }
}

ChooseSeatModalContainer.propTypes = {
    chooseSeatActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    base: PropTypes.object.isRequired,
    register: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    isLoadingSeats: PropTypes.bool.isRequired,
    seats: PropTypes.array.isRequired,
    seatsCount: PropTypes.number.isRequired,
    availableSeats: PropTypes.number.isRequired,
    bookedSeats: PropTypes.array.isRequired,
    room: PropTypes.object.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const {
        seats,
        seatsCount,
        availableSeats,
        bookedSeats,
        from,
        rooms,
        room,
        to,
        register,
        isLoading,
        showModal,
        base,
        isLoadingSeats,
    } = state.chooseSeat;
    return {
        seats,
        seatsCount,
        availableSeats,
        bookedSeats,
        from,
        rooms,
        room,
        to,
        register,
        isLoading,
        showModal,
        base,
        isLoadingSeats,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSeatActions: bindActionCreators(chooseSeatActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ChooseSeatModalContainer,
);
