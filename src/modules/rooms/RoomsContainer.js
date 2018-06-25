/**
 * Created by phanmduong on 12/12/17.
 */

/**
 * Edited by TienTaiNguyen on 01/26/18.
 */

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as roomActions from './roomActions';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import Pagination from "../../components/common/Pagination";
import ListRoom from "./ListRoom";
import PropTypes from "prop-types";
import Select from "../../components/common/Select";
import EditRoomModalContainer from "../bases/room/EditRoomModalContainer";
import RoomTypeManageModal from "./RoomTypeManageModal";

class RoomsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            showModal: false,
            room: {},
            selectBaseId: 0,
            bases: []
        };
        this.timeOut = null;
        this.roomsSearchChange = this.roomsSearchChange.bind(this);
        this.loadRooms = this.loadRooms.bind(this);
        this.openModal = this.openModal.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
    }


    componentWillMount() {
        this.props.roomActions.loadRoomsData();
        this.props.roomActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            const bases = this.getBases(nextProps.bases);
            this.setState({
                bases: bases
            });
        }
        if (nextProps.isStoringRoom !== this.props.isStoringRoom && !nextProps.isStoringRoom) {
            if (!nextProps.errorStoreRoom) {
                this.props.roomActions.loadRoomsData(this.state.page, this.state.query, this.state.selectBaseId);
            }
        }
    }

    roomsSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.roomActions.loadRoomsData(1, value, this.state.selectBaseId);
        }.bind(this), 500);
    }

    getBases(bases) {
        let baseData = bases.map(function (base) {
            return {
                key: base.id,
                value: base.name + ": " + base.address
            };
        });
        this.setState({selectBaseId: 0});
        return [{
            key: 0,
            value: 'Tất cả'
        }, ...baseData];
    }


    openModal(room) {
        this.props.roomActions.showRoomEditModal();
        this.props.roomActions.handleRoomEditModal(room);
    }

    loadRooms(page = 1) {
        this.setState({page});
        this.props.roomActions.loadRoomsData(page, this.state.query, this.state.selectBaseId);
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value, page: 1});
        this.props.roomActions.loadRoomsData(1, this.state.query, value);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <EditRoomModalContainer/>
                    <RoomTypeManageModal/>
                    {
                        (this.state.selectBaseId >= 0 && this.state.bases.length > 0) ?

                            <div className="col-md-4">
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
                    <div className="col-md-12">
                        <div className="card" style={{marginTop: 15}}>
                            <div className="card-content">
                                 <div className="tab-content">
                                    <div className="flex-row flex">
                                        <h4 className="card-title">
                                            <strong>Phòng</strong>
                                        </h4>
                                        <div>
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                type="button" onClick={() => this.openModal({})}>
                                                <strong>+</strong>
                                            </button>
                                        </div>
                                    </div>
                                    <Search
                                        onChange={this.roomsSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm tên phòng, cơ sở"
                                    />
                                </div>

                                {/*<Select
                                    defaultMessage={'Chọn cơ sở'}
                                    options={this.state.bases}
                                    value={this.state.selectBaseId}
                                    onChange={this.onChangeBase}
                                />*/}
                               
                                {
                                    this.props.isLoadingBases ? <Loading/> :
                                        <ListRoom
                                            rooms={this.props.rooms}
                                            isLoading={this.props.isLoading}
                                            loadData={this.loadRooms}
                                            openModalEdit={this.openModal}
                                        />
                                }
                                <div className="card-content">
                                    <Pagination
                                        currentPage={this.state.page}
                                        totalPages={this.props.totalPages}
                                        loadDataPage={this.loadRooms}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

RoomsContainer.propTypes = {
    isStoringRoom: PropTypes.bool.isRequired,
    roomActions: PropTypes.object.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    errorStoreRoom: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    rooms: PropTypes.array.isRequired,
    bases: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.rooms.isLoading,
        isLoadingBases: state.rooms.isLoadingBases,
        errorStoreRoom: state.rooms.errorStoreRoom,
        currentPage: state.rooms.currentPage,
        totalPages: state.rooms.totalPages,
        rooms: state.rooms.rooms,
        bases: state.rooms.bases,
        isStoringRoom: state.rooms.isStoringRoom
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer);
