import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import {Modal, Button} from "react-bootstrap";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";
import * as helper from "../../../helpers/helper";

class ChooseSeatHistoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            limit: 8
        };
        this.handleClose = this.handleClose.bind(this);
        this.loadChooseSeatHistory = this.loadChooseSeatHistory.bind(this);
    }

    componentWillMount() {
        this.loadChooseSeatHistory(1);
    }

    handleClose() {
        this.props.chooseSeatActions.toggleChooseSeatHistoryModal(false);
    }

    loadChooseSeatHistory(page) {
        this.setState({page});
        this.props.chooseSeatActions.loadChooseSeatHistory(page, this.state.limit);
    }


    render() {
        const currentPage = this.state.page;
        const {showChooseSeatHistoryModal} = this.props;
        return (
            <Modal show={showChooseSeatHistoryModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Lịch sử đặt chỗ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoadingChooseSeatHistory ? <Loading/> :
                            <div className="table-responsive">
                                <table className="table table-hover" style={{fontSize: 14}}>
                                    {this.props.historyChooseSeat && this.props.historyChooseSeat.length !== 0 ?
                                        <thead>
                                        <tr className="text-rose" role="row">
                                            <th>Tên ghế</th>
                                            <th>Bắt đầu</th>
                                            <th>Kết thúc</th>
                                            <th>Nhân viên đặt</th>
                                        </tr>
                                        </thead>
                                        : null
                                    }

                                    <tbody>
                                    {this.props.historyChooseSeat && this.props.historyChooseSeat.map((seat, index) => {
                                        return (
                                            <tr role="row" key={index}>
                                                <td>
                                                    <div style={{
                                                         height : 30, width : 30,textAlign : 'center' ,
                                                        lineHeight : "30px", fontWeight : "bold",
                                                        borderRadius : 30,fontFamily : "monospace",
                                                        color : "white",
                                                        backgroundColor: seat.seat ? seat.seat.color : "",
                                                        fontSize: 12,
                                                    }}>
                                                        {seat.seat && seat.seat.name}
                                                    </div>
                                                </td>
                                                <td>{helper.parseTime(seat.start_time)}</td>
                                                <td>{helper.parseTime(seat.end_time)}</td>
                                                <td>{seat.staff && seat.staff.name}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>

                                </table>
                                <div className="float-right">
                                    <div
                                        style={{textAlign: "right"}}
                                    >
                                        <Pagination
                                            currentPage={currentPage} totalPages={this.props.totalHistoryPages}
                                            loadDataPage={this.loadChooseSeatHistory}
                                        />
                                    </div>
                                </div>
                            </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ChooseSeatHistoryModalContainer.propTypes = {
    showChooseSeatHistoryModal: PropTypes.bool.isRequired,
    chooseSeatActions: PropTypes.object.isRequired,
    historyChooseSeat: PropTypes.array.isRequired,
    totalHistoryPages: PropTypes.number.isRequired,
    isLoadingChooseSeatHistory: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const {showChooseSeatHistoryModal, historyChooseSeat, isLoadingChooseSeatHistory, totalHistoryPages} = state.chooseSeat;
    return {
        showChooseSeatHistoryModal,
        isLoadingChooseSeatHistory,
        historyChooseSeat,
        totalHistoryPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSeatActions: bindActionCreators(chooseSeatActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ChooseSeatHistoryModalContainer,
);
