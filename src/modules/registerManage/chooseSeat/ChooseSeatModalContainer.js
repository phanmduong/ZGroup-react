import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as chooseSeatActions from "./chooseSeatActions";
import PropTypes from "prop-types";

import { Modal } from "react-bootstrap";
// import Loading from "../../../components/common/Loading";

class ChooseSeatModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount() {}

    handleClose() {
        this.props.chooseSeatActions.toggleShowChooseSeatModal(false);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>test</Modal.Body>
            </Modal>
        );
    }
}

ChooseSeatModalContainer.propTypes = {
    chooseSeatActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        from: state.chooseSeat.from,
        to: state.chooseSeat.to,
        showModal: state.chooseSeat.showModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        chooseSeatActions: bindActionCreators(chooseSeatActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    ChooseSeatModalContainer,
);
