import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";

// Import actions here!!

class CardListModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closeCardsModal = this.closeCardsModal.bind(this);
    }

    closeCardsModal() {
        // this.props.dashboardItActions.toggleShowCardsModal(false);
    }

    render() {
        return (
            <Modal show={this.props.showCardsModal} onHide={this.closeCardsModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

CardListModalContainer.propTypes = {
    showCardsModal: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        showCardsModal: state.dashboard.it.showCardsModal,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardListModalContainer);