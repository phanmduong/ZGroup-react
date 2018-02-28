import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import Loading from "../../../components/common/Loading";

class ChooseSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.setActiveRoom = this.setActiveRoom.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.showModal && nextProps.showModal && nextProps.base) {
            this.props.chooseSeatActions.loadRooms(nextProps.base.id);
        }
    }

    handleClose() {
        this.props.chooseSeatActions.toggleShowChooseSeatModal(false);
    }

    setActiveRoom(roomId) {
        this.props.chooseSeatActions.setActiveRoom(roomId);
    }

    render() {
        const { rooms } = this.props;

        return (
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cơ sở {this.props.base.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.isLoading ? (
                        <Loading />
                    ) : (
                        <div className="card-content">
                            <ul className="nav nav-pills nav-pills-rose">
                                {rooms.map(room => (
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
                                <div className="tab-pane active">
                                    {this.props.isLoadingSeats ? (
                                        <Loading />
                                    ) : (
                                        <div>test</div>
                                    )}
                                </div>
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
    rooms: PropTypes.array.isRequired,
    isLoadingSeats: PropTypes.bool.isRequired,
    seats: PropTypes.array.isRequired,
    seatsCount: PropTypes.number.isRequired,
    availableSeats: PropTypes.number.isRequired,
    bookedSeats: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        seats: state.chooseSeat.seats,
        seatsCount: state.chooseSeat.seatsCount,
        availableSeats: state.chooseSeat.availableSeats,
        bookedSeats: state.chooseSeat.bookedSeats,
        from: state.chooseSeat.from,
        rooms: state.chooseSeat.rooms,
        to: state.chooseSeat.to,
        isLoading: state.chooseSeat.isLoading,
        showModal: state.chooseSeat.showModal,
        base: state.chooseSeat.base,
        isLoadingSeats: state.chooseSeat.isLoadingSeats,
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
