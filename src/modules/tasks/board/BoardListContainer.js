/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as taskActions from '../taskActions';
import * as boardActions from '../board/boardActions';
import * as PropTypes from "prop-types";
import CreateBoardModalContainer from "./CreateBoardModalContainer";
import Loading from "../../../components/common/Loading";
import BoardList from "./BoardList";
import CreateCardModalContainer from "../card/CreateCardModalContainer";
import CardDetailModalContainer from "../card/CardDetailModalContainer";
import CardFilterContainer from "./filter/CardFilterContainer";
import {intersect, confirm} from "../../../helpers/helper";

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

    archiveCard = ()=>{
        confirm('warning', 'Lưu trữ thẻ', 'Bạn có chắc muốn lưu trữ thẻ này?', ()=>{
            this.props.taskActions.archiveCard(card);
        });
    }


    render() {
        const isAdmin = this.props.user.role === 2 || this.props.members.filter(member => member.is_admin && member.id === this.props.user.id).length > 0;
        return (
            <div>
                <CreateBoardModalContainer projectId={this.props.params.projectId}/>
                <CreateCardModalContainer/>
                <CardDetailModalContainer isProcess={false}/>
                {this.props.isLoadingBoards ? <Loading/> : (
                    <div>
                        <CardFilterContainer
                            isAdmin={isAdmin}
                            projectId={Number(this.props.params.projectId)}/>
                        <BoardList
                            archiveBoard={this.props.boardActions.archiveBoard}
                            display={this.props.setting.display || "full"}
                            canDragBoard={isAdmin || this.props.canDragBoard}
                            canDragCard={isAdmin || this.props.canDragCard}
                            archiveCard={this.archiveCard}
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

BoardListContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    boardActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    boards: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    isLoadingBoards: PropTypes.bool.isRequired,
    setting: PropTypes.object.isRequired,
    canDragBoard: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired
    ]),
    canDragCard: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.bool.isRequired
    ]),
    params: PropTypes.object.isRequired
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
        projectId: Number(state.task.boardList.projectId),
        isLoadingBoards: state.task.boardList.isLoadingBoards,
        canDragBoard: state.task.boardList.canDragBoard,
        canDragCard: state.task.boardList.canDragCard,
        members: state.task.boardList.members,
        setting: state.task.boardList.setting,
        boards,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch),
        boardActions: bindActionCreators(boardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardListContainer);