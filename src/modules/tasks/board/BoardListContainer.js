/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';

import * as taskActions from '../taskActions';
import * as PropTypes from "prop-types";
import CreateBoardModalContainer from "./CreateBoardModalContainer";
import Loading from "../../../components/common/Loading";
import BoardList from "./BoardList";
import CreateCardModalContainer from "../card/CreateCardModalContainer";

class BoardListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openCreateBoardModal = this.openCreateBoardModal.bind(this);
        this.addCard = this.addCard.bind(this);
        this.editBoard = this.editBoard.bind(this);
        this.moveCard = this.moveCard.bind(this);
    }

    componentWillMount() {
        this.props.taskActions.loadBoards(this.props.params.projectId);
    }

    moveCard(sourceBoardId, targetBoardId, cardId, siblingOrder) {
        this.props.taskActions.moveCard(sourceBoardId, targetBoardId, cardId, siblingOrder);
    }


    openCreateBoardModal() {
        this.props.taskActions.changeStatusCreateBoardModal(true);
    }

    addCard(board) {
        this.props.taskActions.changeStatusCreateCardModal(true, board);
    }

    editBoard(board) {
        this.props.taskActions.editBoard(board);
    }

    render() {
        return (
            <div style={{overflow: "hidden"}}>
                <CreateBoardModalContainer projectId={this.props.params.projectId}/>
                <CreateCardModalContainer/>
                {this.props.isLoadingBoards ? <Loading/> : (
                    <BoardList
                        changeOrderCard={this.props.taskActions.changeOrderCard}
                        moveCard={this.moveCard}
                        addCard={this.addCard}
                        editBoard={this.editBoard}
                        openCreateBoardModal={this.openCreateBoardModal}
                        boards={this.props.boards}/>
                )}
            </div>
        );
    }
}

BoardListContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    boards: PropTypes.array.isRequired,
    isLoadingBoards: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoadingBoards: state.task.boardList.isLoadingBoards,
        boards: state.task.boardList.boards
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardListContainer);