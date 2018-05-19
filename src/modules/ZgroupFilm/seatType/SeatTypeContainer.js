import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';
import TooltipButton from "../../../components/common/TooltipButton";
import EditSeatTypeModal from "./EditSeatTypeModal";




class SeatTypeContainer extends React.Component {
    componentWillMount() {
        this.props.filmAction.loadAllRooms();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>Loại ghế</strong></h4>
                            <br/>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-rose">
                                    <tr className="text-rose">
                                        <th>STT</th>
                                        <th>Màu ghế</th>
                                        <th>Ý nghĩa</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>&ensp;1</td>
                                        <td>
                                            &emsp;
                                            <button style={{backgroundColor:"red",color:"white",
                                                padding: "10px 11px", border:"none", borderRadius:"20px"}}>
                                                <b>A1</b>
                                            </button>

                                        </td>
                                        <td>Ghế vip</td>
                                        <td>
                                            <div className="btn-group-action">
                                                <TooltipButton
                                                    placement="top"
                                                    text="Sửa">
                                                    <a style={{color: "#878787"}}
                                                    >
                                                        <i className="material-icons">edit</i>
                                                    </a>
                                                </TooltipButton>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>&ensp;2</td>
                                        <td>
                                            &emsp;
                                            <button style={{backgroundColor:"yellow",color:"white",
                                                padding: "10px 11px", border:"none", borderRadius:"20px"}}>
                                                <b>A1</b>
                                            </button>

                                        </td>
                                        <td>Ghế thường</td>
                                        <td>
                                            <div className="btn-group-action">
                                                <TooltipButton
                                                    placement="top"
                                                    text="Sửa">
                                                    <a style={{color: "#878787"}}
                                                    >
                                                        <i className="material-icons">edit</i>
                                                    </a>
                                                </TooltipButton>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <EditSeatTypeModal/>
            </div>
        );
    }
}

SeatTypeContainer.propTypes = {
    filmAction: PropTypes.object.isRequired,
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatTypeContainer);