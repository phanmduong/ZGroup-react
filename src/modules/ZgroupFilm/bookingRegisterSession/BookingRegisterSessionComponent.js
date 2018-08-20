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
import * as helper from "../../../helpers/helper";


class BookingRegisterSessionComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            select_day: "",
            select_film: "",
            roomId: '',
        };
        this.changeRoom = this.changeRoom.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.updateFormData2 = this.updateFormData2.bind(this);
    }

    componentWillMount() {
        this.props.filmAction.loadShowingSession();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingShowingSession !== this.props.isLoadingShowingSession && !nextProps.isLoadingShowingSession) {
            let a = nextProps.showingSession[0];
            this.setState({
                select_day: {name: a.start_date},
                select_film: {id: a.film_id,},
                roomId: a.id,
            });
            this.props.filmAction.loadAllFilms('', a.start_date);
            this.props.filmAction.loadAllSessions(1, '', '', '', a.start_date, a.film_id);
            this.props.filmAction.loadSeatBySessionId(a.id);
            this.props.filmAction.handleSeatTypes(a.seats);
            this.props.filmAction.handleBookingModal({
                ...this.props.handleBookingModal,
                session_id: a.id
            });
        }
        //isLoadingAllSessions
        if (nextProps.isLoadingAllSessions !== this.props.isLoadingAllSessions && !nextProps.isLoadingAllSessions) {
            if(!helper.isEmptyInput(nextProps.allSessions)){
                let a = nextProps.allSessions.reverse()[0];
                this.setState({
                    roomId: a.id,
                });
                this.props.filmAction.loadSeatBySessionId(a.id);
                this.props.filmAction.handleSeatTypes(a.seats);
                this.props.filmAction.handleBookingModal({
                    ...this.props.handleBookingModal,
                    session_id: a.id
                });
            }

        }

    }

    updateFormData(event) {
        const field = event.target.name;
        let select_day = {...this.state.select_day};
        let select_film = {...this.state.select_film, id: -1};
        select_day[field] = event.target.value;
        this.setState({
            select_day: select_day,
            roomId: '',
            select_film: select_film
        });
        this.props.filmAction.loadAllFilms('', this.state.select_day.name);
        this.props.filmAction.loadAllSessions(1, '', '', '', '', -1);
        this.props.filmAction.clearSeatBySessionId();

    }

    updateFormData2(event) {
        const field = event.target.name;
        let select_film = {...this.state.select_film};
        select_film[field] = event.target.value;
        this.setState({
            select_film: select_film,
            roomId: ''
        });
        this.props.filmAction.loadAllSessions(1, '', '', '', this.state.select_day.name, select_film.id);
        this.props.filmAction.clearSeatBySessionId();
    }

    changeRoom(value) {
        let ass = this.props.allSessions.filter((ss) => ss.id === value)[0].seats;
        this.setState({roomId: value});
        this.props.filmAction.loadSeatBySessionId(value);
        this.props.filmAction.handleSeatTypes(ass);
        this.props.filmAction.handleBookingModal({
            ...this.props.handleBookingModal,
            session_id: value
        });
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
                                label="Chọn Ngày Chiếu"
                                value={this.state.select_day.name}
                                updateFormData={this.updateFormData}
                            />

                        </div>
                        <div className="col-md-6">
                            <FormInputSelect
                                label="Chọn Tên Phim"
                                updateFormData={this.updateFormData2}
                                name="id"
                                id="select_film"
                                data={[{id: -1, name: ''}].concat(this.props.allFilms)}
                                value={this.state.select_film.id}
                                required={true}
                            />
                        </div>

                    </div>
                    <ul className="nav nav-pills nav-pills-rose">
                        {this.props.allSessions.map((room, index) => {
                            if (this.state.roomId === room.id) {
                                return (
                                    <li className="active" key={index}>
                                        <a
                                            href={"#" + index}
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            onClick={() =>
                                                this.changeRoom(room.id)
                                            }
                                        >
                                            {" "}
                                            {room.start_time.slice(0,5)} - {room.room_name}{" "}
                                        </a>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className="" key={index}>
                                        <a
                                            href={"#" + index}
                                            data-toggle="tab"
                                            aria-expanded="true"
                                            onClick={() =>
                                                this.changeRoom(room.id)
                                            }
                                        >
                                            {" "}
                                            {room.start_time.slice(0,5)} - {room.room_name}{" "}
                                        </a>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <hr/>
                    {
                        this.props.isLoading || this.props.isLoadingAllSessions || this.props.isLoadingSeatBySessionId ?
                            <Loading/> :
                            <BookingGrid/>
                    }


                </form>
            </div>
        );
    }
}

BookingRegisterSessionComponent.propTypes = {
    children: PropTypes.element,
    allFilms: PropTypes.array.isRequired,
    showingSession: PropTypes.array.isRequired,
    allSessions: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
    handleBookingModal: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingAllSessions: PropTypes.bool.isRequired,
    isLoadingSeatBySessionId: PropTypes.bool.isRequired,
    isLoadingShowingSession: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        allFilms: state.film.allFilms,
        allSessions: state.film.allSessions,
        isLoading: state.film.isLoading,
        isLoadingAllSessions: state.film.isLoadingAllSessions,
        width: state.film.width,
        height: state.film.height,
        isLoadingSeatBySessionId: state.film.isLoadingSeatBySessionId,
        handleBookingModal: state.film.handleBookingModal,
        showingSession: state.film.showingSession,
        isLoadingShowingSession: state.film.isLoadingShowingSession,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRegisterSessionComponent);