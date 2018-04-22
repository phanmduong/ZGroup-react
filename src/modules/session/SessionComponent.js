import React from "react";
import PropTypes from 'prop-types';
//import {Link} from "react-router";
import {connect} from "react-redux";
//import {bindActionCreators} from 'redux';





class SessionComponent extends React.Component {
    render() {
                    return (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead className="text-rose">
                                <tr className="text-rose">
                                    <th>film_id</th>
                                    <th>room_id</th>
                                    <th>start_date</th>
                                    <th>start_time</th>
                                    <th>film_quality</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>

                                    {this.props.sessions && this.props.sessions.map((session, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {session.film_id}
                                                </td>
                                                <td>
                                                    {session.room_id}
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
                                                        <a style={{color: "#878787"}}
                                                           data-toggle="tooltip" title=""
                                                           type="button" rel="tooltip"
                                                           data-original-title="Sửa"
                                                           //onClick={() => this.props.showAddEditCurrencyModal(currency)}
                                                        ><i
                                                            className="material-icons">edit</i>
                                                        </a>
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
};
function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps() {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionComponent);