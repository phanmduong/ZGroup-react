import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import {Modal, Button, ListGroup, ListGroupItem} from "react-bootstrap";
import Loading from "../../../components/common/Loading";
import { parseTime } from "../../../helpers/helper";
import Pagination from "../../../components/common/Pagination";

class ChooseSeatHistoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page : 1,
            limit : 8
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
    loadChooseSeatHistory(page){
        this.setState({page});
        this.props.chooseSeatActions.loadChooseSeatHistory(page,this.state.limit);
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
                    <div>
                    {
                        this.props.isLoadingChooseSeatHistory ? <Loading/> :
                            <ListGroup>
                                {this.props.historyChooseSeat && this.props.historyChooseSeat.map((seat,index) => {
                                    return (
                                        <ListGroupItem key = {index}>
                                            <div className="bootstrap-tagsinput">
                                                        <span className="tag" style={{
                                                            backgroundColor: seat.seat && seat.seat.color,
                                                            fontSize: 12
                                                        }}>{seat.seat && seat.seat.name + '  '}
                                                        </span>
                                                <span>{parseTime(seat.start_time) + " đến " + parseTime(seat.end_time)} </span>
                                            </div>
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                    }
                    <Pagination currentPage={currentPage} totalPages={this.props.totalHistoryPages} loadDataPage={this.loadChooseSeatHistory}/>
                    </div>

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
    const {showChooseSeatHistoryModal, historyChooseSeat, isLoadingChooseSeatHistory,totalHistoryPages} = state.chooseSeat;
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
