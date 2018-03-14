import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";
import { Modal, Button, ListGroup, ListGroupItem } from "react-bootstrap";

class ChooseSeatHistoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.chooseSeatActions.toggleChooseSeatHistoryModal(false);
    }

    render() {
        const { showChooseSeatHistoryModal } = this.props;
        return (
            <Modal show={showChooseSeatHistoryModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Lịch sử đặt chỗ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroupItem>Item 1</ListGroupItem>
                        <ListGroupItem>Item 2</ListGroupItem>
                        <ListGroupItem>...</ListGroupItem>
                    </ListGroup>
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
