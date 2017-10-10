import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as goodActions from '../good/goodActions';

class AddPropertyItemsToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.goodActions.closeAddPropertyItemModal();
    }

    render() {
        const {showModal} = this.props;
        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thuộc tính cần nhập</Modal.Title>
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

AddPropertyItemsToTaskModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.good.attachPropertyItem.showModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPropertyItemsToTaskModalContainer);