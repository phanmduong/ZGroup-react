import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as taskActions from '../tasks/taskActions';
import CardForm from "../tasks/card/CardForm";

class BookCreateCardModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    close() {
        this.props.taskActions.changeStatusCreateCardModal(false);
    }

    submit() {
        this.props.taskActions.createCard({...this.props.card, board_id: this.props.board.id});
    }

    updateFormData(event) {
        const value = event.target.value;
        let card = {...this.props.card};
        const field = event.target.name;
        card[field] = value;
        this.props.taskActions.updateCreateCardFormData(card);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Đề cử</Modal.Title>
                    <div className="modal-small-text">Bảng {this.props.board.title}</div>
                </Modal.Header>
                <Modal.Body>
                    <CardForm
                        card={this.props.card}
                        submit={this.submit}
                        isSaving={this.props.isSaving}
                        updateFormData={this.updateFormData}/>
                </Modal.Body>
            </Modal>
        );
    }
}

BookCreateCardModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.createCard.showModal,
        isSaving: state.task.createCard.isSaving,
        card: state.task.createCard.card,
        board: state.task.createCard.board
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookCreateCardModalContainer);