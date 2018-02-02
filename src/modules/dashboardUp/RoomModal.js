import React from "react";
import {Modal} from "react-bootstrap";
import TooltipButton from '../../components/common/TooltipButton';
import Loading from '../../components/common/Loading';
import FormInputDateTime from "../../components/common/FormInputDateTime";
import {DATETIME_VN_FORMAT} from "../../constants/constants";
import moment from "moment";
import PropTypes from 'prop-types';
import RoomGrid from '../bases/room/RoomGrid';


class RoomModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            from: moment().format(DATETIME_VN_FORMAT),
            to: moment().format(DATETIME_VN_FORMAT),
            roomId: this.props.rooms[0].id,
        };
        this.onFromDateInputChange = this.onFromDateInputChange.bind(this);
        this.onToDateInputChange = this.onToDateInputChange.bind(this);
        this.changeRoom = this.changeRoom.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onPointClick = this.onPointClick.bind(this);
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

    onClick() {

    }

    onDrag() {

    }

    onPointClick() {

    }

    render() {
        console.log(this.props.isLoadingSeats);
        const percent = (count, total) =>  total === 0 ? 0 : count * 100 / total;
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton>
                    Sơ đồ chỗ ngồi
                </Modal.Header>

                <Modal.Body>
                    {
                        <div>
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
                            <ul className="nav nav-pills nav-pills-rose">

                                {
                                    this.props.rooms.map((room, index) => {
                                        if (this.state.roomId === room.id) {
                                            return (
                                                <li className="active">
                                                    <a href={'#' + index} data-toggle="tab"
                                                       aria-expanded="true"
                                                       onClick={() => this.changeRoom(room.id)}
                                                    > {room.name} </a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li className="">
                                                    <a href={'#' + index} data-toggle="tab"
                                                       aria-expanded="true"
                                                       onClick={() => this.changeRoom(room.id)}
                                                    > {room.name} </a>
                                                </li>
                                            );
                                        }                                
                                    })
                                }
                            </ul>
                            <br/>
                            {this.props.isLoadingSeats ? <Loading/> :
                                <div className="tab-content">          
                                    <TooltipButton placement="top"
                                               text={Math.round(percent(this.props.available_seats, this.props.seats_count)) + '%'}>
                                        <div className="progress progress-line-rose">
                                            <div className="progress-bar" role="progressbar"
                                                 style={{width: percent(this.props.available_seats, this.props.seats_count) + '%'}}/>
                                        </div>
                                    </TooltipButton>                        
                                    {
                                        this.props.isLoadingSeats ? <Loading/>
                                        : (
                                            <RoomGrid
                                                onClick={this.onClick}
                                                onDrag={this.onDrag}
                                                onPointClick={this.onPointClick}
                                                data={this.props.seats}
                                                domain={this.props.domain} 
                                            />                                            
                                        )
                                    }
                                    
                                </div>
                            }</div>
                    }</Modal.Body>
            </Modal>


        );
    }
}

RoomModal.propTypes = {
    loadSeats: PropTypes.object.isRequired,
    seats_count: PropTypes.number.isRequired,
    available_seats: PropTypes.number.isRequired,
    isLoadingSeats: PropTypes.bool.isRequired,
    rooms: PropTypes.array.isRequired,
    seats: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    domain: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired 
};

export default RoomModal;