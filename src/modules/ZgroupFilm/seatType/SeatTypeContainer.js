import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as seatTypeAction from "./seatTypeAction";
import * as roomActions from "../../rooms/roomActions";
import {bindActionCreators} from 'redux';
import TooltipButton from "../../../components/common/TooltipButton";
import EditSeatTypeModal from "./EditSeatTypeModal";
import Select from "../../../components/common/Select";
import Loading from "../../../components/common/Loading";


class SeatTypeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            selectBaseId: 1,
            bases: [],
            rooms: [],
            selectRoomId: 1,
            seatType:{},
        };
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);
    }

    componentWillMount() {
        this.props.roomActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            const bases = this.getBases(nextProps.bases);
            this.setState({
                bases: bases
            });
        }
        if (nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading) {
            const rooms = this.getRooms(nextProps.rooms);
            this.setState({
                rooms: rooms
            });
        }
    }

    getBases(bases) {
        let baseData = bases.map(function (base) {
            return {
                key: base.id,
                value: base.name + ": " + base.address
            };
        });
        this.setState({selectBaseId: baseData[0].key});
        this.props.roomActions.loadRoomsData(1, "", baseData[0].key, 20);
        return [...baseData];
    }

    getRooms(rooms) {

        let roomsData = rooms.map(function (room) {
            return {
                key: room.id,
                value: room.name
            };
        });
        this.setState({selectRoomId: roomsData[0].key});
        this.props.seatTypeAction.loadAllSeatTypes(roomsData[0].key);
        return [...roomsData];
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value, page: 1});
        this.props.roomActions.loadRoomsData(1, "", value, 20);
    }

    onChangeRoom(value) {
        this.setState({selectRoomId: value, page: 1});
        this.props.seatTypeAction.loadAllSeatTypes(value);
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        {
                            (this.state.selectBaseId >= 0 && this.state.bases.length > 0) ?

                                <div className="col-md-3">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                :
                                <div/>

                        }
                        {
                            (this.state.selectRoomId >= 0 && this.state.rooms.length > 0) ?

                                <div className="col-md-3">
                                    <Select
                                        defaultMessage={'Chọn phòng'}
                                        options={this.state.rooms}
                                        value={this.state.selectRoomId}
                                        onChange={this.onChangeRoom}
                                    />
                                </div>
                                :
                                <div/>

                        }
                    </div>
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <h4 className="card-title">
                                    <strong>Loại ghế</strong></h4>
                                <br/>
                                {
                                    (this.props.isLoading || this.props.isLoadingBases || this.props.isLoadingSeat) ?
                                        <Loading/>
                                        :
                                        <div className="table-responsive">
                                            <table className="table table-hover">
                                                <thead className="text-rose">
                                                <tr className="text-rose">
                                                    <th>STT</th>
                                                    <th>Màu ghế</th>
                                                    <th>Ý nghĩa</th>
                                                    <th/>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    this.props.seatTypes && this.props.seatTypes.map((seatType, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>&ensp;{index+1}</td>
                                                                <td>
                                                                    &emsp;
                                                                    <button style={{
                                                                        backgroundColor: seatType.color, color: "white",
                                                                        padding: "10px 11px", border: "none", borderRadius: "20px"
                                                                    }}>
                                                                        <b>A1</b>
                                                                    </button>

                                                                </td>
                                                                <td>{seatType.type}</td>
                                                                <td>
                                                                    <div className="btn-group-action">
                                                                        <TooltipButton
                                                                            placement="top"
                                                                            text="Sửa">
                                                                            <a style={{color: "#878787"}}
                                                                               onClick={()=>{
                                                                                   this.props.seatTypeAction.toggleSeatTypeModal();
                                                                                   this.props.seatTypeAction.handleSeatTypeModal(seatType);
                                                                               }}
                                                                            >
                                                                                <i className="material-icons">edit</i>
                                                                            </a>
                                                                        </TooltipButton>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                </tbody>

                                            </table>
                                            <br/>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <EditSeatTypeModal/>
                </div>
            </div>
        );
    }
}

SeatTypeContainer.propTypes = {
    seatTypeAction: PropTypes.object.isRequired,
    roomActions: PropTypes.object.isRequired,
    seatTypes: PropTypes.object.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingSeat: PropTypes.bool.isRequired,
    rooms: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.rooms.isLoading,
        isLoadingBases: state.rooms.isLoadingBases,
        rooms: state.rooms.rooms,
        bases: state.rooms.bases,
        isLoadingSeat: state.seatType.isLoadingSeat,
        seatTypes: state.seatType.seatTypes,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        seatTypeAction: bindActionCreators(seatTypeAction, dispatch),
        roomActions: bindActionCreators(roomActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatTypeContainer);