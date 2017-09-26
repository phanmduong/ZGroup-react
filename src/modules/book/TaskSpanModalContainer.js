import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as bookActions from "./bookActions";

class TaskSpanModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.bookActions.closeTaskSpanModal();
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
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

TaskSpanModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    task: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.book.taskSpan.showModal,
        task: state.book.taskSpan.task
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bookActions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSpanModalContainer);