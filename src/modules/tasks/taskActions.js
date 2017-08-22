/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as taskApi from "./taskApi";
import {showErrorNotification, showNotification} from '../../helpers/helper';
import {browserHistory} from 'react-router';

// import _ from 'lodash';

export function changeProjectStatus(project, status) {
    return function (dispatch) {
        dispatch({
            type: types.CHANGE_PROJECT_STATUS,
            project,
            status
        });
        showNotification("Thay đổi trạng thái dự án thành công");
        taskApi.changeProjectStatus(project, status).catch(error => {
            console.log(error);
        });
    };
}


export function changeStatusCreateBoardModal(showModal) {
    return function (dispatch) {
        dispatch({
            type: types.CHANGE_STATUS_CREATE_BOARD_MODAL,
            showModal
        });
    };
}

export function deleteProject(project) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_PROJECT_SUCCESS,
            project
        });
        showNotification("Xóa dự án thành công");
        taskApi.deleteProject(project).catch(error => {
            console.log(error);
        });
    };
}


export function loadProjects(page = 1, query = null) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PROJECTS
        });
        taskApi.loadProjects(page, query)
            .then((res) => {
                dispatch({
                    type: types.LOAD_PROJECTS_SUCCESS,
                    projects: res.data.projects,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            });
    };
}

export function updateCreateProjectFormData(project) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_PROJECT_FORM_DATA,
            project
        });
    };
}


export function loadProject(projectId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PROJECT
        });
        taskApi.loadProject(projectId)
            .then(res => {
                const project = res.data.data;
                dispatch({
                    type: types.LOAD_PROJECT_SUCCESS,
                    project
                });
            });
    };
}

export function resetProject() {
    return function (dispatch) {
        dispatch({
            type: types.RESET_CREATE_PROJECT_DATA
        });
    };
}

export function createProject(project) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_PROJECT
        });
        taskApi.createProject(project)
            .then(res => {
                const message = res.data.data.message;
                showNotification(message);
                dispatch({
                    type: types.CREATE_PROJECT_SUCCESS
                });
                browserHistory.push('/project/list');
            });
    };
}


export function updateCreateBoardFormData(board) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_CREATE_BOARD_FORM_DATA,
            board
        });
    };
}


export function createBoard(board) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_BOARD
        });
        taskApi.createBoard(board)
            .then(res => {
                showNotification(res.data.message);
                dispatch({
                    type: types.CREATE_BOARD_SUCCESS,
                    board: res.data.board
                });
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });
    };
}

export function editBoard(board) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_BOARD,
            board
        });
    };
}


export function loadBoards(projectId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BOARDS
        });
        taskApi.loadBoards(projectId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_BOARDS_SUCCESS,
                    boards: res.data.boards
                });
            });
    };
}

export function changeStatusCreateCardModal(showModal, board = {}) {
    return function (dispatch) {
        if (showModal) {
            dispatch({
                type: types.CHANGE_STATUS_CREATE_CARD_MODAL,
                showModal,
                board
            });
        } else {
            dispatch({
                type: types.CHANGE_STATUS_CREATE_CARD_MODAL,
                showModal
            });
        }
    };
}


export function updateCreateCardFormData(card) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_CREATE_CARD_FORM_DATA,
            card
        });
    };
}

export function createCard(card) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_CARD
        });
        taskApi.createCard(card)
            .then(res => {
                showNotification("Tạo thẻ mới thành công");
                dispatch({
                    type: types.CREATE_CARD_SUCCESS,
                    card: res.data.card
                });
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });
    };
}

export function changeOrderCard(sourceBoardId, cardId, siblingOrder) {
    return function (dispatch, getState) {
        let order = 0;
        const state = getState();
        const boards = state.task.boardList.boards;
        const sourceBoard = boards.filter((b) => b.id === sourceBoardId)[0];

        const cards = sourceBoard.cards.filter(c => c.id !== cardId);
        const card = sourceBoard.cards.filter(c => c.id === cardId)[0];

        let targetBoardCards = [];


        if (siblingOrder === -1) {
            const temp = [...cards, card];
            temp.forEach((c) => {
                targetBoardCards = [...targetBoardCards, {...c, order}];
                order += 1;
            });
        } else {
            const index = cards.findIndex((c) => {
                return c.order === siblingOrder;
            });

            const part1 = cards.slice(0, index);
            const part2 = cards.slice(index);

            const temp = [...part1, card, ...part2];


            temp.forEach((c) => {
                targetBoardCards = [...targetBoardCards, {...c, order}];
                order += 1;
            });
        }


        const newSourceBoard = {
            ...sourceBoard,
            cards: targetBoardCards
        };

        taskApi.updateCards(newSourceBoard.cards, newSourceBoard.id)
            .then(() => {
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });

        dispatch({
            type: types.MOVE_CARD_SUCCESS,
            boards: state.task.boardList.boards.map((board) => {
                if (board.id === newSourceBoard.id) {
                    return newSourceBoard;
                } else {
                    return board;
                }
            })
        });
    };
}

export function moveCard(sourceBoardId, targetBoardId, cardId, siblingOrder) {
    return function (dispatch, getState) {
        const state = getState();
        const boards = state.task.boardList.boards;
        const sourceBoard = boards.filter((b) => b.id === Number(sourceBoardId))[0];
        const targetBoard = boards.filter((b) => b.id === Number(targetBoardId))[0];
        const card = sourceBoard.cards.filter(c => c.id === Number(cardId))[0];

        console.log(siblingOrder);
        let order = 0;
        let sourceBoardCards = [];
        sourceBoard.cards
            .filter(c => c.id !== card.id)
            .forEach((c) => {
                sourceBoardCards = [...sourceBoardCards, {...c, order}];
                order += 1;
            });
        const newSourceBoard = {
            ...sourceBoard,
            cards: sourceBoardCards
        };


        let targetBoardCards = [];

        if (siblingOrder === -1) {
            order = 0;
            // console.log([...targetBoard.cards, card]);
            [...targetBoard.cards, card]
                .forEach((c) => {
                    targetBoardCards = [...targetBoardCards, {...c, order}];
                    order += 1;
                });
        } else {
            order = 0;

            const cards = targetBoard.cards;

            const index = cards.findIndex((c) => {
                return c.order === siblingOrder;
            });

            console.log("index: " + index);

            const part1 = cards.slice(0, index);
            const part2 = cards.slice(index);
            const temp = [...part1, card, ...part2];
            temp.forEach((c) => {
                targetBoardCards = [...targetBoardCards, {...c, order}];
                order += 1;
            });
        }

        const newTargetBoard = {
            ...targetBoard,
            cards: targetBoardCards
        };


        // console.log(siblingOrder);
        // console.log(newSourceBoard);
        // console.log(newTargetBoard);
        taskApi.updateCards(newTargetBoard.cards, newTargetBoard.id)
            .then(() => {
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });
        taskApi.updateCards(newSourceBoard.cards, newSourceBoard.id)
            .then(() => {
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });

        dispatch({
            type: types.MOVE_CARD_SUCCESS,
            boards: state.task.boardList.boards.map((board) => {
                if (board.id === newSourceBoard.id) {
                    return newSourceBoard;
                } else if (board.id === newTargetBoard.id) {
                    return newTargetBoard;
                } else {
                    return board;
                }
            })
        });
    };
}
