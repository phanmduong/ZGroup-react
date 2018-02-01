import React from "react";
import {Modal, Panel} from "react-bootstrap";
import Loading from '../../components/common/Loading';
import FormInputDateTime from "../../components/common/FormInputDateTime";
import {DATETIME_VN_FORMAT} from "../../constants/constants";
import moment from "moment";

class RoomModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            openFilter: false,
            from: moment().format(DATETIME_VN_FORMAT),
            to: moment().format(DATETIME_VN_FORMAT),
            roomId: this.props.rooms[0].id,
        };
        this.onFromDateInputChange = this.onFromDateInputChange.bind(this);
        this.onToDateInputChange = this.onToDateInputChange.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
    }

    componentWillMount() {
        this.props.loadSeats(this.state.from, this.state.to, this.state.roomId);
    }

    onFromDateInputChange(event) {
        this.setState({
            from: event.target.value
        });
        this.props.loadSeats(event.target.value, this.state.to, this.state.roomId);
    }
    changeRoom(value){
        this.setState({roomId: value});
        this.props.loadSeats(this.state.from, this.state.to, value);
    }
    onToDateInputChange(event) {
        this.setState({
            to: event.target.value
        });
        this.props.loadSeats(this.state.from, event.target.value, this.state.roomId);
    }

    render() {
        // Chuyển nav pill thành rose
        return (

            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    {
                        <div>
                            <div className="row">
                                <div className="col-md-3">
                                    <button className="btn btn-info btn-rose btn-round"
                                            onClick={() => this.setState({openFilter: !this.state.openFilter})}>
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                                <div className="col-md-9">
                                </div>
                                <Panel collapsible expanded={this.state.openFilter}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-header card-header-icon"
                                                     data-background-color="rose">
                                                    <i className="material-icons">filter_list</i>
                                                </div>
                                                <div className="card-content">
                                                    <h4 className="card-title">Bộ lọc
                                                        <small/>
                                                    </h4>
                                                    <div className="row">
                                                        <div className="row">
                                                            <div className="col-md-6 col-lg-4">
                                                                <FormInputDateTime
                                                                    format={DATETIME_VN_FORMAT}
                                                                    name="from"
                                                                    id="from"
                                                                    label="Từ ngày"
                                                                    value={this.state.from}
                                                                    updateFormData={this.onFromDateInputChange}/>
                                                            </div>
                                                            <div className="col-md-6 col-lg-4">
                                                                <FormInputDateTime
                                                                    name="to"
                                                                    format={DATETIME_VN_FORMAT}
                                                                    id="to"
                                                                    label="Tới ngày"
                                                                    value={this.state.to}
                                                                    updateFormData={this.onToDateInputChange}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Panel>
                            </div>
                            <h3>Danh sách các phòng</h3>
                            <ul className="nav nav-pills rose">

                                {
                                    this.props.rooms.map((room, index) => {

                                        return (
                                            (index == 0) ?
                                                <li className="active">
                                                    <a href={'#' + index} data-toggle="tab"
                                                       aria-expanded="true"
                                                       onClick={() => this.changeRoom(room.id)}
                                                    > {room.name} </a>
                                                </li>
                                                :
                                                <li className="">
                                                    <a href={'#' + index} data-toggle="tab"
                                                       aria-expanded="true"
                                                       onClick={() => this.changeRoom(room.id)}
                                                    > {room.name} </a>
                                                </li>


                                        );
                                    })
                                }
                            </ul>
                            <br/>
                            {this.props.isLoadingSeats ? <Loading/> :
                                <div className='tab-content'>

                                    {
                                        this.props.rooms.map((room, index) => {
                                            return (
                                                (index == 0) ?
                                                    <div className="tab-pane active" id={index}>
                                                        Tên cơ sở: {room.base_name} <br/>
                                                        Địa chỉ: {room.address} <br/>
                                                        Kiểu phòng: {room.room_type.name}<br/>
                                                        Tổng số chỗ: {this.props.seats_count}<br/>
                                                        Số chỗ còn trống: {this.props.available_seats}
                                                    </div> : <div className="tab-pane" id={index}>
                                                        Tên cơ sở: {room.base_name} <br/>
                                                        Địa chỉ: {room.address} <br/>
                                                        Kiểu phòng: {room.room_type.name}<br/>
                                                        Tổng số chỗ: {this.props.seats_count}<br/>
                                                        Số chỗ còn trống: {this.props.available_seats}
                                                    </div>

                                            );
                                        })
                                    }
                                </div>
                            }</div>
                    }</Modal.Body>
            </Modal>


        );
    }
}

export default RoomModal;