/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';

import * as PropTypes from "prop-types";
import CreateBoardModalContainer from "../tasks/board/CreateBoardModalContainer";
import CreateCardModalContainer from "../tasks/card/CreateCardModalContainer";
import CardDetailModalContainer from "../tasks/card/CardDetailModalContainer";
import Loading from "../../components/common/Loading";
import CardFilterContainer from "../tasks/board/filter/CardFilterContainer";
import BoardList from "../tasks/board/BoardList";
import * as taskActions from '../tasks/taskActions';
import * as bookActions from './bookActions';
import {intersect} from "../../helpers/helper";


class FashionBoardListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openCreateBoardModal = this.openCreateBoardModal.bind(this);
        this.addCard = this.addCard.bind(this);
        this.editBoard = this.editBoard.bind(this);
        this.moveCard = this.moveCard.bind(this);
    }

    componentWillMount() {
        this.props.bookActions.loadFashionBoards();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.boards.length === 0 && nextProps.boards.length > 0) {
            const cardId = this.props.location.query.card_id;
            let card = null;
            let board = null;
            nextProps.boards.forEach((b) => {
                b.cards.forEach((c) => {
                    if (c.id === Number(cardId)) {
                        card = c;
                        board = b;
                    }
                });
            });
            if (card) {
                this.props.taskActions.openCardDetailModal({
                    ...card,
                    board
                });
            }
        }
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
        const isAdmin = this.props.user.role === 2 || this.props.members.filter(member => member.is_admin && member.id === this.props.user.id).length > 0;
        return (
            <div>
                <CreateBoardModalContainer projectId={this.props.projectId}/>
                <CreateCardModalContainer/>
                <CardDetailModalContainer/>
                {this.props.isLoadingBoards ? <Loading/> : (
                    <div>
                        <CardFilterContainer
                            isAdmin={isAdmin}
                            projectId={Number(this.props.projectId)}/>
                        <BoardList
                            canDragBoard={isAdmin || this.props.canDragBoard}
                            canDragCard={isAdmin || this.props.canDragCard}
                            archiveCard={this.props.taskActions.archiveCard}
                            updateCardInBoard={this.props.taskActions.updateCardInBoard}
                            openCardDetailModal={this.props.taskActions.openCardDetailModal}
                            moveBoard={this.props.taskActions.moveBoard}
                            changeOrderCard={this.props.taskActions.changeOrderCard}
                            moveCard={this.moveCard}
                            addCard={this.addCard}
                            editBoard={this.editBoard}
                            openCreateBoardModal={this.openCreateBoardModal}
                            boards={this.props.boards}/>
                    </div>
                )}
            </div>
        );
    }
}

FashionBoardListContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    bookActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    members: PropTypes.array.isRequired,
    boards: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    isLoadingBoards: PropTypes.bool.isRequired,
    canDragBoard: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired
    ]),
    canDragCard: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired
    ])
};

function mapStateToProps(state) {
    const {selectedCardLabels, selectedMembers} = state.cardFilter;
    const boards = state.task.boardList.boards.map((board) => {

        const cards = board.cards.map((card) => {
            let hasCardLabel = selectedCardLabels.length > 0;
            let hasMember = selectedMembers.length > 0;

            if (!hasCardLabel && !hasMember) {
                // no filter
                return card;
            } else if (!hasCardLabel && hasMember || hasCardLabel && !hasMember) {
                // filter by CardLabel or Member
                // filter by cardLabel

                if (selectedCardLabels.length > 0 && intersect(selectedCardLabels, card.cardLabels).length > 0) {
                    return card;
                }

                // filter by members
                if (selectedMembers.length > 0 && intersect(selectedMembers, card.members).length > 0) {
                    return card;
                }
            } else {
                // filter by both CardLabel and Member
                if (intersect(selectedCardLabels, card.cardLabels).length > 0
                    && intersect(selectedMembers, card.members).length > 0) {
                    return card;
                }
            }
            return null;

        }).filter(c => c !== null);
        return {
            ...board,
            cards
        };
    });

    return {
        projectId: state.task.boardList.projectId,
        isLoadingBoards: state.task.boardList.isLoadingBoards,
        canDragBoard: state.task.boardList.canDragBoard,
        canDragCard: state.task.boardList.canDragCard,
        members: state.task.boardList.members,
        boards,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch),
        bookActions: bindActionCreators(bookActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FashionBoardListContainer);