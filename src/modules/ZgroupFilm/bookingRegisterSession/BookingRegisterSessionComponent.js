import React from 'react';
import FormInputSelect from '../../../components/common/FormInputSelect';
import FormInputDate from '../../../components/common/FormInputDate';
import PropTypes from 'prop-types';
import BookingGrid from "./BookingGrid";
import * as filmAction from "../filmAction";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Loading from "../../../components/common/Loading";
import moment from "moment";


class BookingRegisterSessionComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            select_day: {name: ''},
            select_film:{id:-1},
            roomId: '',
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.updateFormData2 = this.updateFormData2.bind(this);
    }

    updateFormData(event) {
        const field = event.target.name;
        let select_day = {...this.state.select_day};
        select_day[field] = event.target.value;
        this.setState({select_day: select_day, roomId:''});
        this.props.filmAction.loadAllFilms('', this.state.select_day.name);
        this.props.filmAction.loadAllSessions(1,'','','','',-1);

    }
    updateFormData2(event) {
        const field = event.target.name;
        let select_film = {...this.state.select_film};
        select_film[field] = event.target.value;
        this.setState({select_film:select_film, roomId:''});
        this.props.filmAction.loadAllSessions(1,'','','',this.state.select_day.name, select_film.id);
    }

    changeRoom(value) {
        this.setState({roomId: value});
    }

    render() {
        return (
            <div className="form-group">
                <form method="#" action="#">
                    <div className="row">
                        <div className="col-md-6">
                            <FormInputDate
                                name="name"
                                minDate={moment().format('YYYY-MM-DD')}
                                id="select_day"
                                label="Ngày chiếu"
                                value={this.state.select_day.name}
                                updateFormData={this.updateFormData}
                            />

                        </div>
                        <div className="col-md-6">
                            <FormInputSelect
                                label="Tên phim"
                                updateFormData={this.updateFormData2}
                                name="id"
                                id="select_film"
                                data={[{id:-1,name:''}].concat(this.props.allFilms)}
                                value={this.state.select_film.id}
                                required={true}
                            />
                        </div>

                    </div>
                    <ul className="nav nav-pills nav-pills-rose">
                        {this.props.allSessions.map((room, index) => {
                            if (this.state.roomId === room.id) {
                                return (
                                    <li className="active">
                                        <a
                                            href={"#" + index}
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            onClick={() =>
                                                this.changeRoom(room.id)
                                            }
                                        >
                                            {" "}
                                            {room.start_time} Phòng {room.room_id}{" "}
                                        </a>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="">
                                        <a
                                            href={"#" + index}
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            onClick={() =>
                                                this.changeRoom(room.id)
                                            }
                                        >
                                            {" "}
                                            {room.start_time} Phòng {room.room_id}{" "}
                                        </a>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <hr/>
                    {
                        this.props.isLoading ? <Loading/> :
                            <BookingGrid
                                room_id={this.state.roomId}/>
                    }


                </form>
            </div>
        );
    }
}

BookingRegisterSessionComponent.propTypes = {
    children: PropTypes.element,
    allFilms: PropTypes.array.isRequired,
    allSessions: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        allFilms: state.film.allFilms,
        allSessions: state.film.allSessions,
        isLoading: state.film.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRegisterSessionComponent);