import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as filmAction from "../filmAction";
import {confirm} from "../../../helpers/helper";
import {FULLTIME_FORMAT, TIME_FORMAT_H_M} from "../../../constants/constants";
import moment from "moment/moment";
import TooltipButton from '../../../components/common/TooltipButton';

class SessionComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delSession = this.delSession.bind(this);
    }

    delSession(session) {
        confirm("error", "Xóa xuất chiếu", "Bạn có chắc muốn xóa xuất chiếu này", () => {
            this.props.filmAction.deleteSession(session);
        });
    }

    render() {

        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Tên phim</th>
                        <th>Phòng</th>
                        <th>Ngày chiếu</th>
                        <th>Giờ chiếu</th>
                        <th>FQ</th>
                        <th>&emsp;Giá vé</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.sessions && this.props.sessions.map((session, index) => {
                        let a = this.props.allFilms.filter((film) => (film.id == session.film_id))[0];
                        let b = this.props.rooms.filter((room) => (room.id === session.room_id))[0];
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="film-name">
                                    <TooltipButton text={(a && a.name) || ''} placement="top">
                                        <span onClick={() => {
                                            this.props.filmAction.showAddEditFilmModalAtSession();
                                            this.props.filmAction.handleFilmModal(a);
                                        }}>
                                            {a && (a.name.length >= 15 ? a.name.slice(0, 14).concat("...") : a.name)}
                                        </span>
                                    </TooltipButton>
                                </td>
                                <td>
                                    {b && b.base_name} - {b && b.name}
                                </td>
                                <td>
                                    {session.start_date}
                                </td>
                                <td>
                                    {moment(session.start_time, FULLTIME_FORMAT).format(TIME_FORMAT_H_M)}
                                </td>
                                <td>
                                    {session.film_quality}
                                </td>
                                <td style={{display: 'flex'}}>
                                    {
                                        session.seats && session.seats.map((seat, index) => {
                                            return (
                                                <div key={index}>
                                                    <TooltipButton text={seat.type} placement="top">
                                                        <button style={{
                                                            backgroundColor: seat.color,
                                                            color: "white",
                                                            marginRight: "10px",
                                                            //marginTop: "12px",
                                                            border: "none",
                                                            borderRadius: "20px",
                                                            display: "flex",
                                                            width: 40,
                                                            height: 40,
                                                        }}>
                                                            <b style={{margin:"auto"}}>{seat.price/1000}</b>
                                                        </button>
                                                    </TooltipButton>
                                                </div>
                                            );
                                        })
                                    }


                                </td>
                                <td>
                                    {
                                        moment(session.start_date, "YYYY-MM-DD").add(1, 'days').fromNow()[0] !== "i" ? "" :

                                            <div className="btn-group-action">
                                                <TooltipButton text="Sửa" placement="top"
                                                               style={{display: "inline-block"}}>
                                                    <a style={{color: "#878787"}}
                                                       onClick={() => {
                                                           this.props.filmAction.toggleSessionModal();
                                                           this.props.filmAction.handleSessionModal(session);
                                                       }}>
                                                        <i className="material-icons">edit</i>
                                                    </a>
                                                </TooltipButton>
                                                <TooltipButton text="Xóa" placement="top"
                                                               style={{display: "inline-block"}}>
                                                    <a style={{color: "#878787"}}
                                                       onClick={() => this.delSession(session)}>
                                                        <i className="material-icons">delete</i>
                                                    </a>
                                                </TooltipButton>
                                            </div>
                                    }
                                </td>
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </table>
            </div>
        );

    }
}

SessionComponent.propTypes = {
    sessions: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
    allFilms: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        allFilms: state.film.allFilms,
        rooms: state.film.rooms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent);