import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

class ChooseSeatHistoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { showChooseSeatHistoryModal } = this.props;
        return (
            <Modal show={showChooseSeatHistoryModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đặt chỗ</Modal.Title>
                </Modal.Header>
                <Modal.Body />
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ChooseSeatHistoryModalContainer.propTypes = {
    showChooseSeatHistoryModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const { showChooseSeatHistoryModal } = state.chooseSeat;
    return {
        showChooseSeatHistoryModal,
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
