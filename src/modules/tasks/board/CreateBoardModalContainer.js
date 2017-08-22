import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as taskActions from '../taskActions';
import BoardForm from "./BoardForm";

class CreateBoardModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    close() {
        this.props.taskActions.changeStatusCreateBoardModal(false);
    }

    submit() {
        this.props.taskActions.createBoard({...this.props.board, project_id: this.props.projectId});
    }

    updateFormData(event) {
        const value = event.target.value;
        let board = {...this.props.board};
        const field = event.target.name;
        board[field] = value;
        this.props.taskActions.updateCreateBoardFormData(board);
    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.board.id ? "Sửa bảng" : "Tạo bảng mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BoardForm
                        board={this.props.board}
                        submit={this.submit}
                        isSaving={this.props.isSaving}
                        updateFormData={this.updateFormData}/>
                </Modal.Body>
            </Modal>
        );
    }
}

CreateBoardModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    projectId: PropTypes.string.isRequired,
    isSaving: PropTypes.bool.isRequired,
    board: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.task.createBoard.showModal,
        isSaving: state.task.createBoard.isSaving,
        board: state.task.createBoard.board
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoardModalContainer);