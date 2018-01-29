import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import {toggleCreateSeatModal} from "./seatActions";

// Import actions here!!

class CreateSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.actions.toggleCreateSeatModal(false);
    }

    render() {
        return (
            <Modal show={this.props.showCreateSeatModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm ghế</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal>
        );
    }
}

CreateSeatModalContainer.propTypes = {
    showCreateSeatModal: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showCreateSeatModal: state.seat.showCreateSeatModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({toggleCreateSeatModal}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSeatModalContainer);