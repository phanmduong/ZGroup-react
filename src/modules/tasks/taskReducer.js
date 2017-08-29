/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function taskReducer(state = initialState.task, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_CARD_DETAIL:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    isLoading: true
                }
            };
        case types.LOAD_CARD_DETAIL_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    isLoading: false,
                    card: {
                        ...state.cardDetail.card,
                        ...action.card
                    }
                }
            };
        case types.UPLOAD_ATTACHMENT_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        files: [...state.cardDetail.card.files, action.file]
                    }
                },
                uploadAttachment: {
                    ...state.uploadAttachment,
                    files: state.uploadAttachment
                        .files.filter(fileWrapper => fileWrapper.index !== Number(action.file.index))
                }
            };

        case types.UPDATE_UPLOAD_ATTACHMENT_PROGRESS:
            return {
                ...state,
                uploadAttachment: {
                    ...state.uploadAttachment,
                    files: state.uploadAttachment.files.map((fileWrapper) => {
                        if (fileWrapper.index === action.fileWrapper.index) {
                            return {
                                ...fileWrapper,
                                progress: action.progress
                            };
                        }
                        return fileWrapper;
                    })
                }
            };
        case types.BEGIN_UPLOAD_ATTACHMENT:
            return {
                ...state,
                uploadAttachment: {
                    ...state.uploadAttachment,
                    files: [
                        ...state.uploadAttachment.files,
                        {
                            index: action.fileWrapper.index,
                            progress: 0
                        }
                    ]
                }
            };

        case types.ASSIGN_MEMBER_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        members: action.member.added ?
                            state.cardDetail.card.members
                                .filter((m) => m.id !== action.member.id) :
                            [
                                ...state.cardDetail.card.members,
                                {...action.member, added: !action.member.added}
                            ]
                    }
                },
                addMember: {
                    ...state.addMember,
                    members: state.addMember.members.map((member) => {
                        if (member.id === action.member.id) {
                            return {
                                ...member,
                                added: !member.added
                            };
                        }
                        return member;
                    })
                }
            };
        case types.DELETE_TASK_LIST_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists.filter(t => t.id !== action.taskList.id)
                    }
                }
            };
        case types.CHANGE_SEARCH_MEMBERS_VALUE:
            return {
                ...state,
                addMember: {
                    ...state.addMember,
                    search: action.search
                }
            };
        case types.LOAD_MEMBERS_SUCCESS:
            return {
                ...state,
                addMember: {
                    ...state.addMember,
                    isLoading: false,
                    members: action.members
                }
            };
        case types.BEGIN_LOAD_MEMBERS:
            return {
                ...state,
                addMember: {
                    ...state.addMember,
                    isLoading: true
                }
            };
        case types.TOGGLE_TASK_STATUS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists.map((taskList) => {
                            if (taskList.id === action.task.task_list_id) {
                                return {
                                    ...taskList,
                                    tasks: taskList.tasks.map((task => {
                                        if (task.id === action.task.id) {
                                            return {
                                                ...task,
                                                status: !task.status
                                            };
                                        }
                                        return task;
                                    }))
                                };
                            } else {
                                return taskList;
                            }
                        })
                    }
                }
            };
        case types.DELETE_TASK_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists.map((taskList) => {
                            if (taskList.id === action.task.task_list_id) {
                                return {
                                    ...taskList,
                                    tasks: taskList.tasks.filter((task => task.id !== action.task.id))
                                };
                            } else {
                                return taskList;
                            }
                        })
                    }
                }
            };
        case types.BEGIN_CREATE_TASK:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists.map((taskList) => {
                            if (taskList.id === action.taskListId) {
                                return {
                                    ...taskList,
                                    isSavingTask: true
                                };
                            } else {
                                return taskList;
                            }
                        })
                    }
                }
            };
        case types.CREATE_TASK_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists.map((taskList) => {
                            if (taskList.id === action.taskListId) {
                                return {
                                    ...taskList,
                                    isSavingTask: false,
                                    tasks: [...taskList.tasks, action.task]
                                };
                            } else {
                                return taskList;
                            }
                        })
                    }
                }
            };

        case types.CREATE_TASK_LIST_SUCCESS:
            return {
                ...state,
                createTaskList: {
                    ...state.createTaskList,
                    isSavingTaskList: false,
                    taskList: {}
                },
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: [...state.cardDetail.card.taskLists, {...action.taskList, tasks: []}]
                    }
                }
            };
        case types.BEGIN_CREATE_TASK_LIST:
            return {
                ...state,
                createTaskList: {
                    ...state.createTaskList,
                    isSavingTaskList: true
                }
            };
        case types.UPDATE_CREATE_TASK_LIST_FORM_DATA:
            return {
                ...state,
                createTaskList: {
                    ...state.createTaskList,
                    taskList: action.taskList
                }
            };
        case types.SAVE_CARD_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    isSavingCard: false,
                    card: action.card
                }
            };
        case types.BEGIN_SAVE_CARD:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    isSavingCard: true
                }
            };
        case types.OPEN_CLOSE_CARD_DETAIL_MODAL:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: action.card,
                    showModal: action.showModal
                }
            };
        case types.MOVE_CARD_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: action.boards
                }
            };
        case types.UPDATE_CREATE_CARD_FORM_DATA:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    card: action.card
                }
            };
        case types.BEGIN_CREATE_CARD:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isSaving: true,
                    card: {}
                }
            };
        case types.CREATE_CARD_SUCCESS:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isSaving: false,
                    showModal: false
                },
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: [
                                    action.card,
                                    ...board.cards.map(c => {
                                        return {...c, order: c.order + 1};
                                    })]
                            };
                        }
                        return board;
                    })
                }
            };
        case types.CHANGE_STATUS_CREATE_CARD_MODAL:
            if (action.showModal) {
                return {
                    ...state,
                    createCard: {
                        ...state.createCard,
                        showModal: action.showModal,
                        board: action.board
                    }
                };
            } else {
                return {
                    ...state,
                    createCard: {
                        ...state.createCard,
                        showModal: action.showModal
                    }
                };
            }


        case types.LOAD_BOARDS_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    isLoadingBoards: false,
                    boards: action.boards
                }
            };
        case types.BEGIN_LOAD_BOARDS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    isLoadingBoards: true
                }
            };

        case types.CREATE_BOARD_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: action.editBoard ?
                        state.boardList.boards.map(b => {
                            if (b.id === action.board.id) {
                                return action.board;
                            } else {
                                return b;
                            }
                        }) :
                        [...state.boardList.boards, action.board]
                },
                createBoard: {
                    ...state.createBoard,
                    board: {},
                    isSaving: false,
                    showModal: false
                }
            };

        case types.BEGIN_EDIT_BOARD:
            return {
                ...state,
                createBoard: {
                    ...state.createBoard,
                    showModal: true,
                    board: action.board
                }
            };
        case types.BEGIN_CREATE_BOARD:
            return {
                ...state,
                createBoard: {
                    ...state.createBoard,
                    isSaving: true
                }
            };
        case types.UPDATE_CREATE_BOARD_FORM_DATA:
            return {
                ...state,
                createBoard: {
                    ...state.createBoard,
                    board: action.board
                }
            };
        case types.CHANGE_STATUS_CREATE_BOARD_MODAL:
            if (action.showModal) {
                return {
                    ...state,
                    createBoard: {
                        ...state.createBoard,
                        showModal: action.showModal
                    }
                };
            } else {
                return {
                    ...state,
                    createBoard: {
                        ...state.createBoard,
                        showModal: action.showModal,
                        board: {}
                    }
                };
            }

        case types.CHANGE_PROJECT_STATUS:
            return {
                ...state,
                project: {
                    ...state.project,
                    projects: state.project.projects.map(p => {
                        if (p.id === action.project.id) {
                            return {...p, status: action.status};
                        }
                        return p;
                    })
                }
            };
        case types.DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                project: {
                    ...state.project,
                    projects: state.project.projects.filter(p => p.id !== action.project.id)
                }
            };
        case types.BEGIN_LOAD_PROJECT:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    isLoadingProject: true
                }
            };
        case types.LOAD_PROJECT_SUCCESS:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    isLoadingProject: false,
                    project: action.project
                }
            };
        case types.BEGIN_CREATE_PROJECT:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    isSavingProject: true
                }
            };
        case types.CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    project: {},
                    isSavingProject: false
                }
            };
        case types.RESET_CREATE_PROJECT_DATA:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    project: {}
                }
            };
        case types.UPDATE_PROJECT_FORM_DATA:
            return {
                ...state,
                createProject: {
                    ...state.createProject,
                    project: action.project
                }
            };
        case types.BEGIN_LOAD_PROJECTS:
            return {
                ...state,
                project: {
                    ...state.project,
                    isLoadingProjects: true
                }
            };
        case types.LOAD_PROJECTS_SUCCESS:
            return {
                ...state,
                project: {
                    ...state.project,
                    isLoadingProjects: false,
                    projects: action.projects,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        default:
            return state;
    }

}