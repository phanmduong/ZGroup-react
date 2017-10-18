/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as taskApi from "./taskApi";
import {showErrorNotification, showNotification} from '../../helpers/helper';
import {browserHistory} from 'react-router';

/*eslint no-console: 0 */
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


export function loadProjects(page = 1, query = null, isArchive = false) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PROJECTS
        });
        if (isArchive) {
            taskApi.loadArchiveProjects(page, query)
                .then((res) => {
                    dispatch({
                        type: types.LOAD_PROJECTS_SUCCESS,
                        projects: res.data.projects,
                        currentPage: res.data.paginator.current_page,
                        totalPages: res.data.paginator.total_pages
                    });
                });
        } else {
            taskApi.loadProjects(page, query)
                .then((res) => {
                    dispatch({
                        type: types.LOAD_PROJECTS_SUCCESS,
                        projects: res.data.projects,
                        currentPage: res.data.paginator.current_page,
                        totalPages: res.data.paginator.total_pages
                    });
                });
        }

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

export function archiveProject(project) {
    return function (dispatch) {
        dispatch({
            type: types.ARCHIVE_PROJECT,
            project
        });
        taskApi.toggleArchiveProject(project);
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
    let editBoard = false;
    if (board.id) {
        editBoard = true;
    }
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_BOARD
        });
        taskApi.createBoard(board)
            .then(res => {
                showNotification(res.data.message);
                dispatch({
                    type: types.CREATE_BOARD_SUCCESS,
                    board: res.data.board,
                    editBoard
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
                    projectId: projectId,
                    type: types.LOAD_BOARDS_SUCCESS,
                    boards: res.data.boards,
                    cardLabels: res.data.cardLabels,
                    members: res.data.members,
                    canDragCard: res.data.canDragCard,
                    canDragBoard: res.data.canDragBoard
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

export function moveCard(sourceBoardId, targetBoardId, cardId, siblingOrder = -1) {
    console.log(siblingOrder);
    return function (dispatch, getState) {
        const state = getState();
        const boards = state.task.boardList.boards;
        const sourceBoard = boards.filter((b) => b.id === Number(sourceBoardId))[0];
        const targetBoard = boards.filter((b) => b.id === Number(targetBoardId))[0];

        const card = {
            ...sourceBoard.cards.filter(c => c.id === Number(cardId))[0],
            board_id: Number(targetBoardId)
        };

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

            // console.log("index: " + index);

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

export function moveBoard(sourceId, targetId, boardId, siblingOrder) {
    return function (dispatch, getState) {
        let order = 0;
        const state = getState();
        const board = state.task.boardList.boards.filter(b => b.id === boardId)[0];
        const boards = state.task.boardList.boards.filter(b => b.id !== boardId);


        let newBoards = [];
        if (siblingOrder === -1) {
            const temp = [...boards, board];
            temp.forEach((b) => {
                newBoards = [...newBoards, {...b, order}];
                order += 1;
            });
        } else {
            const index = boards.findIndex((b) => {
                return b.order === siblingOrder;
            });

            const part1 = boards.slice(0, index);
            const part2 = boards.slice(index);

            const temp = [...part1, board, ...part2];

            temp.forEach((c) => {
                newBoards = [...newBoards, {...c, order}];
                order += 1;
            });
        }

        taskApi.updateBoards(newBoards)
            .then(() => {
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });

        dispatch({
            type: types.MOVE_CARD_SUCCESS,
            boards: newBoards
        });
    };
}

export function openCardDetailModal(card) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_CLOSE_CARD_DETAIL_MODAL,
            showModal: true,
            card
        });
    };
}

export function closeCardDetailModal() {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_CLOSE_CARD_DETAIL_MODAL,
            showModal: false,
            card: {}
        });
    };
}

export function saveCard(card) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_CARD,
            isSavingCard: true
        });

        return new Promise((resolve) => {
            taskApi.updateCard(card).then(() => {
                dispatch({
                    type: types.SAVE_CARD_SUCCESS,
                    card
                });
                resolve("success");
            });
        });

    };
}

export function updateCreateTaskListFormData(taskList) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_CREATE_TASK_LIST_FORM_DATA,
            taskList
        });
    };
}

export function saveTaskListTemplate(taskListId, cardId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_TASK_LIST
        });

        return new Promise((resolve) => {
            taskApi.createTaskListFromTemplate(taskListId, cardId).then((res) => {
                resolve();
                dispatch({
                    type: types.CREATE_TASK_LIST_SUCCESS,
                    taskList: res.data.data,
                    card: res.data.data.card,
                    projectMembers: res.data.data.project_members
                });
            });
        });
    };
}

export function saveTaskList(taskList) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_TASK_LIST
        });

        return new Promise((resolve) => {
            taskApi.createTaskList(taskList).then((res) => {
                resolve();
                dispatch({
                    type: types.CREATE_TASK_LIST_SUCCESS,
                    taskList: res.data.data
                });
            });
        });
    };
}

export function createTask(task, card) {
    return function (dispatch) {
        dispatch({
            taskListId: task.task_list_id,
            type: types.BEGIN_CREATE_TASK
        });
        taskApi
            .createTask(task)
            .then((res) => {
                dispatch({
                    type: types.CREATE_TASK_SUCCESS,
                    task: res.data.task,
                    taskListId: task.task_list_id,
                    card
                });
            });

    };
}

export function deleteTask(task, card) {
    return function (dispatch) {
        dispatch({
            card,
            task,
            type: types.DELETE_TASK_SUCCESS
        });
        taskApi.deleteTask(task);
    };
}

export function toggleTaskStatus(task, card) {
    return function (dispatch) {
        dispatch({
            card,
            task,
            type: types.TOGGLE_TASK_STATUS
        });
        taskApi.toggleTaskStatus(task);
    };
}

export function loadMembers(query, cardId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_MEMBERS
        });
        taskApi.loadMembers(query, cardId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_MEMBERS_SUCCESS,
                    members: res.data.members
                });
            });
    };
}

export function loadProjectMembers(query, cardId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_MEMBERS
        });
        taskApi.loadProjectMembers(query, cardId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_MEMBERS_SUCCESS,
                    members: res.data.members
                });
            });
    };
}

export function clearMembers() {
    return function (dispatch) {
        dispatch({
            type: types.CLEAR_MEMBERS
        });
    };
}


export function deleteTaskList(taskList) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_TASK_LIST_SUCCESS,
            taskList
        });
        taskApi.deleteTaskList(taskList);
    };
}

export function assignMember(card, member) {
    return function (dispatch) {
        dispatch({
            type: types.ASSIGN_MEMBER_SUCCESS,
            card,
            member
        });
        taskApi.toggleAssignMember(card, member);
    };
}

export function assignProjectMember(project, member) {
    return function (dispatch) {
        dispatch({
            type: types.ASSIGN_PROJECT_MEMBER_SUCCESS,
            project,
            member
        });
        taskApi.toggleAssignProjectMember(project, member);
    };
}

export function changeProjectMemberRole(project, member) {
    return function (dispatch) {
        dispatch({
            type: types.CHANGE_ROLE_PROJECT_MEMBER,
            project,
            member
        });
        taskApi.changeProjectMemberRole(project.id, member.id, member.is_admin ? 0 : 1);
    };
}

export function uploadAttachment(card, fileWrapper, addToComment = false) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const file = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên  tập tin đính kèm thành công");
            dispatch({
                type: types.UPLOAD_ATTACHMENT_SUCCESS,
                file,
                addToComment
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_UPLOAD_ATTACHMENT_PROGRESS,
                progress: percentComplete,
                fileWrapper
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_ATTACHMENT,
            fileWrapper
        });

        taskApi.uploadFile(card, fileWrapper.index, fileWrapper.file,
            completeHandler, progressHandler, error);
    };
}


export function addUrlSuccess(file, addToComment = false) {
    return function (dispatch) {
        dispatch({
            type: types.UPLOAD_ATTACHMENT_SUCCESS,
            file,
            addToComment
        });
    };
}


export function loadCardDetail(cardId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CARD_DETAIL
        });
        taskApi.loadCardDetail(cardId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CARD_DETAIL_SUCCESS,
                    card: res.data
                });
            });
    };
}

export function deleteFile(file) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_ATTACHMENT_SUCCESS,
            file
        });
        taskApi.deleteFile(file);
    };
}

export function updateCardInBoard(card) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_CARD_IN_BOARD_SUCCESS,
            card
        });
    };
}

export function assignCardLabel(cardLabel, card, labelAdded) {
    return function (dispatch) {
        dispatch({
            type: types.ASSIGN_CARD_LABEL_SUCCESS,
            cardLabel,
            card,
            labelAdded
        });
        taskApi.assignCardLabel(card.id, cardLabel.id);
    };
}

export function deleteCardLabel(cardLabel) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_CARD_LABEL_SUCCESS,
            cardLabel
        });
    };
}

export function updateCardDeadline(card) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPDATE_CARD_DEADLINE
        });
        taskApi.updateCardDeadline(card)
            .then((res) => {
                showNotification("Sửa hạn chót thành công");
                dispatch({
                    card,
                    type: types.UPDATE_CARD_DEADLINE_SUCCESS,
                    deadline: res.data.data.deadline,
                    deadline_elapse: res.data.data.deadline_elapse
                });
            });

    };
}

export function loadCalendarEvents(userId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CALENDAR_EVENTS
        });
        taskApi.loadCalendarEvents(userId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CALENDAR_EVENTS_SUCCESS,
                    calendarEvents: res.data.data.calendarEvents
                });
            });

    };
}

export function openProjectDetailModal(projectId) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_PROJECT_DETAIL_MODAL,
            projectId
        });
    };
}

export function closeProjectDetailModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_PROJECT_DETAIL_MODAL
        });
    };
}

export function updateProjectData(project) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_PROJECT_DATA,
            project
        });
    };
}

export function submitProject(project) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SUBMIT_PROJECT,
            project
        });
        taskApi.createProject(project)
            .then(() => {
                showNotification("Lưu dự án thành công");
                dispatch({
                    type: types.SUBMIT_PROJECT_SUCCESS,
                    project
                });
            });
    };
}

export function saveCardCommentSuccess(comment) {
    return function (dispatch) {
        dispatch({
            type: types.CREATE_CARD_COMMENT_SUCCESS,
            comment
        });
    };
}

export function archiveCard(card) {
    return function (dispatch) {
        dispatch({
            type: types.ARCHIVE_CARD,
            card
        });
        taskApi.toggleArchive(card);
    };
}

export function unarchiveCard(card) {
    return function (dispatch) {
        dispatch({
            type: types.UNARCHIVE_CARD,
            card
        });
        taskApi.toggleArchive(card);
    };
}

export function loadArchiveCards(projectId, page = 1) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ARCHIVE_CARDS,
            page
        });
        taskApi.loadArchiveCards(projectId, page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ARCHIVE_CARDS_SUCCESS,
                    cards: res.data.cards,
                    page
                });
            });
    };
}

export function deleteCardComment(comment) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_CARD_COMMENT,
            comment
        });
        taskApi.deleteCardComment(comment);
    };
}

export function changeProjectSetting(project) {
    return function (dispatch) {
        dispatch({
            type: types.CHANGE_PROJECT_SETTING,
            project
        });
        taskApi.changeProjectSetting(project);
    };
}

export function updateCommentInputValue(value) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_CARD_COMMENT_INPUT_VALUE,
            value
        });
    };
}

export function loadProjectDetail(projectId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PROJECT_DETAIL
        });
        taskApi.loadProjectDetail(projectId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_PROJECT_DETAIL_SUCCESS,
                    project: res.data.data
                });
            });
    };
}

export function openArchiveCardModal() {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ARCHIVE_CARD_MODAL
        });
    };
}

export function closeArchiveCardModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_ARCHIVE_CARD_MODAL
        });
    };
}

export function openTaskDeadlineModal(task) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_TASK_DEADLINE_MODAL,
            task
        });
    };
}

export function closeTaskDeadlineModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_TASK_DEADLINE_MODAL
        });
    };
}

export function openAddMemberToTaskModal(task) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ADD_MEMBER_TO_TASK_MODAL,
            task
        });
    };
}

export function closeAddMemberToTaskModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_ADD_MEMBER_TO_TASK_MODAL
        });
    };
}

export function updateAssignMemberToTaskForm(member) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_ASSIGN_MEMBER_TO_TASK_FORM,
            member
        });
    };
}

export function deleteCardCommentAttachment(file) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_CARD_COMMENT_ATTACHMENT,
            file
        });
    };
}

export function saveTaskDeadline(task) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_SAVE_TASK_DEADLINE});
        taskApi.saveTaskDeadline(task)
            .then((res) => {
                showNotification("Sửa hạn chót thành công");
                dispatch({
                    type: types.SAVE_TASK_DEADLINE_SUCCESS,
                    task: res.data.data.task
                });
            });
    };
}

export function updateTaskDeadline(deadline) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_TASK_DEADLINE,
            deadline
        });
    };
}


export function loadAvailableMembers(task) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_AVAILABLE_MEMBERS});
        taskApi.loadAvailableMembers(task.id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_AVAILABLE_MEMBERS_SUCCESS,
                    members: res.data.data.members
                });
            });
    };
}

export function saveMemberTask(task, user, card) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_SAVE_MEMBER_TASK});
        let userId = 0;
        if (user) {
            userId = user.id;
        }
        taskApi.saveMemberTask(userId, task.id)
            .then(() => {
                showNotification("Phân công việc thành công");
                dispatch({
                    type: types.SAVE_MEMBER_TASK_SUCCESS,
                    user,
                    task
                });
                if (user) {
                    const isAdded = card.members.filter(m => m.id === user.id).length > 0;
                    if (!isAdded) {
                        dispatch({
                            type: types.ASSIGN_MEMBER_SUCCESS,
                            card,
                            member: user
                        });
                    }
                }

            });
    };
}

export function loadCardLabelsSuccess(cardLabels) {
    return function (dispatch) {
        dispatch({
            type: types.LOAD_CARD_LABEL_SUCCESS,
            cardLabels
        });
    };
}

export function moveTaskUp(taskList, task) {
    return function (dispatch) {
        const tasks = taskList.tasks;
        const upperTasks = tasks.slice(0, task.order - 1);
        const lowerTasks = tasks.slice(task.order + 1);
        dispatch({
            type: types.CHANGE_TASK_ORDER,
            tasks: [
                ...upperTasks,
                {
                    ...task,
                    order: task.order - 1
                },
                {
                    ...tasks[task.order - 1],
                    order: task.order
                },
                ...lowerTasks
            ]
        });
    };
}

export function moveTaskDown(taskList, task) {
    return function (dispatch) {
        const tasks = taskList.tasks;
        const upperTasks = tasks.slice(0, task.order);
        const lowerTasks = tasks.slice(task.order + 2);
        dispatch({
            type: types.CHANGE_TASK_ORDER,
            tasks: [
                ...upperTasks,
                {
                    ...tasks[task.order + 1],
                    order: task.order
                },
                {
                    ...task,
                    order: task.order + 1
                },
                ...lowerTasks
            ]
        });
    };
}