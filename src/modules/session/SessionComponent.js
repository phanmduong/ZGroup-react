import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as sessionAction from "./sessionAction";
import {confirm} from "../../helpers/helper";


class SessionComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.delSession = this.delSession.bind(this);
    }
    delSession(session){
        confirm("error", "Xóa xuất chiếu", "Bạn có chắc muốn xóa xuất chiếu này", () => {
            this.props.sessionAction.deleteSession(session);
        });
    }
    render() {

        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Tên film</th>
                        <th>Phòng</th>
                        <th>Ngày chiếu</th>
                        <th>Giờ chiếu</th>
                        <th>Chất lượng film</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.sessions && this.props.sessions.map((session, index) => {
                        let a =this.props.allFilms.filter((film)=>(film.id == session.film_id))[0];
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {a  && a.name}
                                </td>
                                <td>
                                    Phòng {session.room_id}
                                </td>
                                <td>
                                    {session.start_date}
                                </td>
                                <td>
                                    {session.start_time}
                                </td>
                                <td>
                                    {session.film_quality}
                                </td>
                                <td>

                                    <div className="btn-group-action">
                                        <div style={{display: "inline-block"}}>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Sửa"
                                               onClick={() => {
                                                   this.props.sessionAction.toggleSessionModal();
                                                   this.props.sessionAction.handleSessionModal(session);
                                               }}>
                                                <i className="material-icons">edit</i>
                                            </a>
                                        </div>

                                        <div style={{display: "inline-block"}}>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Sửa"
                                               onClick={() =>this.delSession(session)}>
                                                <i className="material-icons">delete</i>
                                            </a>
                                        </div>
                                    </div>
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
    sessionAction: PropTypes.object.isRequired,
    allFilms: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        allFilms: state.session.allFilms,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sessionAction: bindActionCreators(sessionAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent);