/**
 * Created by phanmduong on 12/12/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as roomActions from './roomActions';
import Loading from "../../components/common/Loading";
import Search from "../../components/common/Search";
import Pagination from "../../components/common/Pagination";
import ListRoom from "./ListRoom";
import {Modal} from "react-bootstrap";
import FormInputText from "../../components/common/FormInputText";
import Select from "../../components/common/Select";
import * as helper from "../../helpers/helper";

class RoomsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            edit: false,
            showModal: false,
            room: {},
            selectBaseId: 0,
            bases: []
        };
        this.timeOut = null;
        this.roomsSearchChange = this.roomsSearchChange.bind(this);
        this.loadRooms = this.loadRooms.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.onChangeBaseForm = this.onChangeBaseForm.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.storeRoom = this.storeRoom.bind(this);
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

    componentWillMount() {
        this.props.roomActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingBases != this.props.isLoadingBases && !nextProps.isLoadingBases) {
            const bases = this.getBases(nextProps.bases);
            this.setState({
                bases: bases
            });
        }
        if (nextProps.isStoringRoom != this.props.isStoringRoom && !nextProps.isStoringRoom) {
            if (!nextProps.errorStoreRoom) {
                this.props.roomActions.loadRoomsData(this.state.page, this.state.query, this.state.selectBaseId);
            }
        }
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

    closeModal() {
        this.setState({showModal: false});
    }

    openModal(room) {
        if (room) {
            this.setState({
                showModal: true,
                room,
                edit: true,
            });
        } else {
            this.setState({
                showModal: true,
                room: {},
                edit: false,
            });
        }
    }

    loadRooms(page = 1) {
        this.setState({page});
        this.props.roomActions.loadRoomsData(page, this.state.query, this.state.selectBaseId);
    }

    updateFormData(event) {
        const field = event.target.name;
        let room = {...this.state.room};
        room[field] = event.target.value;
        this.setState({room: room});
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value, page: 1});
        this.props.roomActions.loadRoomsData(1, this.state.query, value);
    }

    onChangeBaseForm(value) {
        this.setState({
            room: {
                ...this.state.room,
                base_id: value
            }
        });
    }

    storeRoom() {
        if (helper.isEmptyInput(this.state.room.base_id)) {
            helper.showTypeNotification("Vui lòng chọn cơ sở", "warning");
            return;
        }
        this.props.roomActions.storeRoom(this.state.room, this.closeModal);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Phòng học</h4>


                            {this.props.isLoadingBases ? <Loading/> :
                                <div>
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                    <div style={{marginTop: "15px"}}>
                                        <div className="col-md-3">
                                            <a className="btn btn-rose" onClick={this.openModal}>
                                                Thêm phòng
                                            </a>
                                        </div>
                                        <Search
                                            onChange={this.roomsSearchChange}
                                            value={this.state.query}
                                            placeholder="Tìm kiếm tên phòng, cơ sở"
                                            className="col-md-9"
                                        />
                                    </div>
                                    <ListRoom
                                        rooms={this.props.rooms}
                                        isLoading={this.props.isLoading}
                                        loadData={this.loadRooms}
                                        openModalEdit={this.openModal}
                                    />
                                    <div className="card-content">
                                        <Pagination
                                            currentPage={this.state.page}
                                            totalPages={this.props.totalPages}
                                            loadDataPage={this.loadRooms}
                                        />
                                    </div>
                                </div>

                            }

                        </div>


                    </div>


                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? "Sửa phòng" : "Tạo phòng"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form role="form"
                              id="form-add-room">
                            <FormInputText
                                label="Tên phòng"
                                required
                                name="name"
                                updateFormData={this.updateFormData}
                                value={this.state.room.name}
                            />
                            <Select
                                defaultMessage={'Chọn cơ sở'}
                                options={this.state.bases}
                                value={this.state.room.base_id}
                                onChange={this.onChangeBaseForm}
                            />
                            {
                                this.props.isStoringRoom ?
                                    (
                                        <button
                                            className="btn btn-rose disabled"
                                            type="button"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {this.state.edit ? 'Đang lưu' : 'Đang tạo'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button
                                            className="btn btn-rose"
                                            type="button"
                                            onClick={this.storeRoom}
                                        >
                                            {this.state.edit ? 'Lưu' : 'Tạo'}
                                        </button>
                                    )
                            }
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.rooms.isLoading,
        isLoadingBases: state.rooms.isLoadingBases,
        isStoringRoom: state.rooms.isStoringRoom,
        errorStoreRoom: state.rooms.errorStoreRoom,
        currentPage: state.rooms.currentPage,
        totalPages: state.rooms.totalPages,
        rooms: state.rooms.rooms,
        bases: state.rooms.bases,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer);
