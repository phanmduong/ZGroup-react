/**
 * Created by phanmduong on 12/12/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as roomActions from './roomActions';
import Loading from "../../components/common/Loading";
import {Link} from "react-router";
import Search from "../../components/common/Search";
import Pagination from "../../components/common/Pagination";
import ListRoom from "./ListRoom";
import {Modal} from "react-bootstrap";
import FormInputText from "../../components/common/FormInputText";

class RoomsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
            edit: false,
            showModal: false,
            room: {}
        };
        this.timeOut = null;
        this.roomsSearchChange = this.roomsSearchChange.bind(this);
        this.loadRooms = this.loadRooms.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
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
            this.props.roomActions.loadRoomsData(1, value);
        }.bind(this), 500);

    }

    componentWillMount() {
        this.props.roomActions.loadBasesData();
        this.props.roomActions.loadRoomsData();
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({showModal: true});
    }

    loadRooms(page = 1) {
        this.setState({page});
        this.props.roomActions.loadRoomsData(page, this.state.query);
    }

    updateFormData(event) {
        const field = event.target.name;
        let room = {...this.state.room};
        room[field] = event.target.value;
        this.setState({room: room});
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


                            {this.props.isLoading ? <Loading/> :
                                <ListRoom
                                    rooms={this.props.rooms}
                                />
                            }
                            <Pagination
                                currentPage={this.state.page}
                                totalPages={this.props.totalPages}
                                loadDataPage={this.loadRooms}
                            />
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
                            {
                                this.props.isSendingMail ?
                                    (
                                        <button
                                            className="btn btn-rose"
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
                                            onClick={this.sendMail}
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
        currentPage: state.rooms.currentPage,
        totalPages: state.rooms.totalPages,
        rooms: state.rooms.rooms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        roomActions: bindActionCreators(roomActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer);
