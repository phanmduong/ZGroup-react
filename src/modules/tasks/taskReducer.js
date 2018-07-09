/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import {updateCardTitle} from "./taskApi";

export default function taskReducer(state = initialState.task, action) {
    switch (action.type) {
        case types.UPDATE_CARD_DATA:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: action.card
                },
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        //if (action.card.board_id === board.id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.good_id === action.card.good_id) {
                                        const title = action.card.title;
                                        const res = {...card, title};
                                        updateCardTitle(res);
                                        return res;
                                    }
                                    return card;
                                })
                            };
                        //}
                        //return board;
                    })
                }
            };
        case types.UPDATE_CARD_POINT:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: action.card
                },
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (action.card.board_id === board.id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.id === action.card.id) {
                                        return action.card;
                                    }
                                    return card;
                                })
                            };
                        }
                        return board;
                    })
                }
            };
        case types.SAVE_CHILD_GOOD_FAIL:
            return {
                ...state,
                addChildGood: {
                    ...state.addChildGood,
                    isSaving: false
                }
            };

        case types.BEGIN_SAVE_CHILD_GOOD:
            return {
                ...state,
                addChildGood: {
                    ...state.addChildGood,
                    isSaving: true
                }
            };
        case types.SAVE_CHILD_GOOD_SUCCESS:
            return {
                ...state,
                addChildGood: {
                    ...state.addChildGood,
                    isSaving: false,
                    showModal: false
                }
            };

        case types.UPDATE_TASK_ID_CHILD_MODAL:
            return {
                ...state,
                addChildGood: {
                    ...state.addChildGood,
                    taskId: action.taskId
                }
            };

        case types.UPDATE_ADD_CHILD_GOOD_FORM:
            return {
                ...state,
                addChildGood: {
                    ...state.addChildGood,
                    good: action.good
                }
            };

        case types.SHOW_ADD_CHILD_GOOD_MODAL:
            return {
                ...state,
                addChildGood: {
                    ...state.addChildGood,
                    showModal: action.showModal,
                    good: (action.showModal && action.good) ? action.good : {}
                }
            };

        case types.BEGIN_LOAD_GOOD_PROPERTIES_FILLED:
            return {
                ...state,
                askGoodProperties: {
                    ...state.askGoodProperties,
                    isLoading: true
                }
            };
        case types.LOAD_GOOD_PROPERTIES_FILLED_SUCCESS:
            return {
                ...state,
                askGoodProperties: {
                    ...state.askGoodProperties,
                    isLoading: false,
                    goodProperties: action.goodProperties
                }
            };
        case types.SUBMIT_GOOD_PROPERTIES_SUCCESS:
            return {
                ...state,
                askGoodProperties: {
                    ...state.askGoodProperties,
                    isSaving: false,
                    showModal: false,
                    goodPropertiesOutput: {},
                    goodProperties: []
                }
            };
        case types.BEGIN_SUBMIT_GOOD_PROPERTIES:
            return {
                ...state,
                askGoodProperties: {
                    ...state.askGoodProperties,
                    isSaving: true
                }
            };
        case types.UPDATE_GOOD_PROPERTIES_OUTPUT:
            return {
                ...state,
                askGoodProperties: {
                    ...state.askGoodProperties,
                    goodPropertiesOutput: action.goodPropertiesOutput
                }
            };
        case types.CLOSE_ASK_GOOD_PROPERTY_MODAL:
            return {
                ...state,
                askGoodProperties: {
                    ...state.askGoodProperties,
                    showModal: false,
                    goodPropertiesOutput: {},
                    goodProperties: []
                }
            };
        case types.OPEN_ASK_GOOD_PROPERTY_MODAL:
            return {
                ...state,
                askGoodProperties: {
                    ...state.askGoodProperties,
                    showModal: true,
                    goodPropertiesOutput: action.goodPropertiesOutput,
                    goodProperties: action.goodProperties,
                    task: action.task
                }
            };
        case types.BEGIN_LOAD_GOOD_PROPERTY_ITEMS:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isLoading: true
                }
            };

        case types.LOAD_GOOD_PROPERTY_ITEMS_SUCCESS:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isLoading: false,
                    goodPropertyItems: action.goodPropertyItems
                }
            };

        case types.BEGIN_LOAD_POLL_TASK_LIST_TEMPLATES:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isLoadingTaskListTemplate: true
                }
            };
        case types.LOAD_POLL_TASK_LIST_TEMPLATES_SUCCESS:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isLoadingTaskListTemplate: false,
                    taskListTemplates: action.taskListTemplates
                }
            };
        case types.BEGIN_LOAD_ARCHIVE_BOARDS:
            return {
                ...state,
                archiveBoard: {
                    ...state.archiveBoard,
                    isLoading: true
                }
            };
        case types.LOAD_ARCHIVE_BOARDS_SUCCESS:
            return {
                ...state,
                archiveBoard: {
                    ...state.archiveBoard,
                    isLoading: false,
                    boards: action.boards
                }
            };
        case types.SHOW_ARCHIVE_BOARDS_MODAL:
            return {
                ...state,
                archiveBoard: {
                    ...state.archiveBoard,
                    showModal: action.showModal
                }
            };
        case types.UNARCHIVE_BOARD_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: [...state.boardList.boards, action.board]
                },
                archiveBoard: {
                    ...state.archiveBoard,
                    boards: state.archiveBoard.boards.filter(board => board.id != action.board.id)
                }
            };
        case types.ARCHIVE_BOARD_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.filter(board => board.id != action.board.id)
                }
            };
        case types.SAVE_TASK_TITLE_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists ? state.cardDetail.card.taskLists.map((taskList) => {
                            return {
                                ...taskList,
                                tasks: taskList.tasks.map((task) => {
                                    if (task.id == action.task.id) {
                                        return {
                                            ...task,
                                            ...action.task
                                        };
                                    }
                                    return task;
                                })
                            };
                        }) : []
                    }
                }
            };
        case types.BEGIN_LOAD_PROJECT_PERSONAL_SETTING:
            return {
                ...state,
                personalSetting: {
                    ...state.personalSetting,
                    isLoading: true
                }
            };
        case types.LOAD_PROJECT_PERSONAL_SETTING_SUCCESS:
            return {
                ...state,
                personalSetting: {
                    ...state.personalSetting,
                    isLoading: false,
                    setting: {
                        ...action.setting,
                        display: action.setting.display || "full"
                    }
                }
            };
        case types.BEGIN_SUBMIT_PROJECT_PERSONAL_SETTING:
            return {
                ...state,
                personalSetting: {
                    ...state.personalSetting,
                    isSaving: true
                }
            };

        case types.SUBMIT_PROJECT_PERSONAL_SETTING_SUCCESS:
            return {
                ...state,
                personalSetting: {
                    ...state.personalSetting,
                    isSaving: false,
                    showModal: false
                },
                boardList: {
                    ...state.boardList,
                    setting: action.setting
                }
            };
        case types.UPDATE_PROJECT_PERSONAL_SETTING:
            return {
                ...state,
                personalSetting: {
                    ...state.personalSetting,
                    setting: action.setting
                }
            };
        case types.OPEN_CLOSE_PROJECT_MODAL_PERSONAL_SETTING:
            return {
                ...state,
                personalSetting: {
                    ...state.personalSetting,
                    showModal: action.showModal
                }
            };
        case types.BEGIN_LOAD_TASK_LIST_TEMPLATES:
            return {
                ...state,
                createTaskList: {
                    ...state.createTaskList,
                    isLoading: true
                }
            };
        case types.LOAD_TASK_LIST_TEMPLATES_SUCCESS:
            return {
                ...state,
                createTaskList: {
                    ...state.createTaskList,
                    taskLists: action.taskLists,
                    isLoading: false
                }
            };
        case types.UPDATE_TASK_DEADLINE:
            return {
                ...state,
                taskDeadline: {
                    ...state.taskDeadline,
                    task: {
                        ...state.taskDeadline.task,
                        deadline: action.deadline
                    }
                }
            };
        case types.BEGIN_SAVE_TASK_DEADLINE:
            return {
                ...state,
                taskDeadline: {
                    ...state.taskDeadline,
                    isSaving: true
                }
            };
        case types.SAVE_TASK_DEADLINE_SUCCESS:
            return {
                ...state,
                taskDeadline: {
                    ...state.taskDeadline,
                    isSaving: false
                },
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists.map((taskList) => {
                            if (taskList.id === Number(action.task.task_list_id)) {
                                return {
                                    ...taskList,
                                    tasks: taskList.tasks.map((task) => {
                                        if (task.id === action.task.id) {
                                            return {...action.task};
                                        }
                                        return task;
                                    })
                                };
                            }
                            return taskList;
                        })
                    }
                }

            };

        case types.OPEN_TASK_DEADLINE_MODAL:
            return {
                ...state,
                taskDeadline: {
                    ...state.taskDeadline,
                    showModal: true,
                    task: action.task
                }
            };
        case types.CLOSE_TASK_DEADLINE_MODAL:
            return {
                ...state,
                taskDeadline: {
                    ...state.taskDeadline,
                    showModal: false,
                    task: {}
                }
            };
        case types.BEGIN_SAVE_MEMBER_TASK_TEMPLATE:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    isSaving: true
                }
            };
        case types.SAVE_MEMBER_TASK_TEMPLATE_SUCCESS:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    isSaving: false
                }
            };
        case types.BEGIN_SAVE_MEMBER_TASK:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    isSaving: true
                }
            };
        case types.SAVE_MEMBER_TASK_SUCCESS:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    isSaving: false,
                    showModal: false
                },
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        taskLists: state.cardDetail.card.taskLists.map((taskList) => {
                            if (action.task.task_list_id === taskList.id) {
                                return {
                                    ...taskList,
                                    tasks: taskList.tasks.map((task) => {
                                        if (task.id === action.task.id) {
                                            return {
                                                ...task,
                                                members: action.members
                                            };
                                        }
                                        return task;
                                    })
                                };
                            }
                            return taskList;
                        })
                    }
                }
            };
        case types.UPDATE_ASSIGN_MEMBER_TO_TASK_FORM:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    selectedMembers: action.members
                }
            };
        case types.LOAD_AVAILABLE_MEMBERS_SUCCESS:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    isLoading: false,
                    members: action.members
                }
            };
        case types.BEGIN_LOAD_AVAILABLE_MEMBERS:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    isLoading: true
                }
            };
        case types.OPEN_ADD_MEMBER_TO_TASK_MODAL:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    showModal: true,
                    task: action.task,
                    selectedMembers: action.task.members ? action.task.members.map((member) => {
                        return {
                            ...member,
                            value: member.id,
                            label: member.name
                        };
                    }) : []
                }
            };
        case types.CLOSE_ADD_MEMBER_TO_TASK_MODAL:
            return {
                ...state,
                addMemberToTask: {
                    ...state.addMemberToTask,
                    showModal: false,
                    task: {}
                }
            };
        case types.OPEN_ARCHIVE_CARD_MODAL:
            return {
                ...state,
                archiveCard: {
                    ...state.archiveCard,
                    showModal: true
                }
            };
        case types.CLOSE_ARCHIVE_CARD_MODAL:
            return {
                ...state,
                archiveCard: {
                    ...state.archiveCard,
                    showModal: false
                }
            };
        case types.BEGIN_LOAD_PROJECT_DETAIL:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    isLoading: true
                }
            };
        case types.LOAD_PROJECT_DETAIL_SUCCESS:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    isLoading: false,
                    project: action.project
                }
            };
        case types.UPDATE_CARD_COMMENT_INPUT_VALUE:
            return {
                ...state,
                commentCard: {
                    ...state.commentCard,
                    value: action.value
                }
            };

        case types.DELETE_CARD_COMMENT_ATTACHMENT:
            return {
                ...state,
                commentCard: {
                    ...state.commentCard,
                    attachments: state.commentCard.attachments.filter(attachment => attachment.id !== action.file.id)
                }
            };

        case types.ARCHIVE_PROJECT:
            return {
                ...state,
                project: {
                    ...state.project,
                    projects: state.project.projects.filter(p => p.id !== action.project.id)
                }
            };
        case types.DELETE_CARD_COMMENT:
            return {
                ...state,
                comment: {
                    ...state.comment,
                    comments: state.comment.comments.filter(c => c.id !== action.comment.id)
                }
            };
        case types.BEGIN_LOAD_ARCHIVE_CARDS:
            return {
                ...state,
                archiveCard: {
                    ...state.archiveCard,
                    isLoading: true,
                    cards: action.page === 1 ? [] : state.archiveCard.cards
                }
            };
        case types.LOAD_ARCHIVE_CARDS_SUCCESS:
            return {
                ...state,
                archiveCard: {
                    ...state.archiveCard,
                    isLoading: false,
                    isEmpty: action.cards.length === 0,
                    cards: [...state.archiveCard.cards, ...action.cards]
                }
            };
        case types.ARCHIVE_CARD:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        //if (board.id === action.card.board_id) {
                            const cards = board.cards.filter((card) => {
                                return card.good_id ? 
                                card.good_id !== action.card.good_id 
                                : card.id !== action.card.id ;
                            });
                            return {
                                ...board,
                                cards
                            };
                        //}
                        //return board;
                    })
                }
            };

        case types.UNARCHIVE_CARD:
            if(!action.isManufacture)        
            return {
                ...state,
                archiveCard: {
                    ...state.archiveCard,
                    cards: state.archiveCard.cards.filter(card => 
                        card.good_id ? 
                        card.good_id !== action.card.good_id
                        : card.id !== action.card.id 
                    )
                },
                boardList: {
                    ...state.boardList,
                    boards:  state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            const cards = [...board.cards, {...action.card, status: "open"}]
                            .sort((a, b) => {
                                return parseFloat(a.order) - parseFloat(b.order);
                            });
                            return {
                                ...board,
                                cards
                            };
                        }
                        return board;
                    }) 
                },
            };
            else
            {
                return {
                    ...state,
                    archiveCard: {
                        ...state.archiveCard,
                        cards: state.archiveCard.cards.filter(card => 
                            card.good_id ? 
                            card.good_id !== action.card.good_id
                            : card.id !== action.card.id 
                        )
                    },
                    // boardList: !action.isManufacture ? {
                    //     ...state.boardList,
                    //     boards:  state.boardList.boards.map((board) => {
                    //         if (board.id === action.card.board_id) {
                    //             const cards = [...board.cards, {...action.card, status: "open"}]
                    //             .sort((a, b) => {
                    //                 return parseFloat(a.order) - parseFloat(b.order);
                    //             });
                    //             return {
                    //                 ...board,
                    //                 cards
                    //             };
                    //         }
                    //         return board;
                    //     }) 
                    // }: state.boardList,
                };
            }
        case types.CHANGE_ROLE_PROJECT_MEMBER:
            return {
                ...state,
                addMember: {
                    ...state.addMember,
                    members: state.addMember.members.map((member) => {
                        if (member.id === action.member.id) {
                            return {
                                ...member,
                                is_admin: !member.is_admin
                            };
                        }
                        return member;
                    })
                },
                projectDetail: {
                    ...state.projectDetail,
                    project: {
                        ...state.projectDetail.project,
                        members: state.projectDetail.project.members.map((member) => {
                            if (member.id === action.member.id) {
                                return {
                                    ...member,
                                    is_admin: !member.is_admin
                                };
                            }
                            return member;
                        })

                    }
                },
                project: {
                    ...state.project,
                    projects: state.project.projects.map((project) => {
                        if (project.id === action.project.id) {
                            return {
                                ...project,
                                members: project.members.map((member) => {
                                    if (member.id === action.member.id) {
                                        return {
                                            ...member,
                                            is_admin: !member.is_admin
                                        };
                                    }
                                    return member;
                                })
                            };
                        }
                        return project;
                    })
                }
            };
        case types.SUBMIT_PROJECT_SUCCESS:
            return {
                ...state,
                project: {
                    ...state.project,
                    projects: state.project.projects.map((project) => {
                        if (project.id === action.project.id) {
                            return {
                                ...project,
                                ...action.project
                            };
                        }
                        return project;
                    })
                },
                projectDetail: {
                    ...state.projectDetail,
                    isSaving: false,
                    showModal: false
                },
                boardList: {
                    ...state.boardList,
                    boards: action.project.start_board
                        ? state.boardList.boards.map((board) => {
                            if (board.id == action.project.start_board.id) {
                                return {
                                    ...board,
                                    is_start: action.project.start_board.is_start
                                };
                            }
                            return {
                                ...board,
                                is_start: false
                            };
                        })
                        : state.boardList.boards
                }
            };
        case types.BEGIN_SUBMIT_PROJECT:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    isSaving: true
                }
            };
        case types.UPDATE_PROJECT_DATA:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    project: action.project
                }
            };
        case types.CLOSE_PROJECT_DETAIL_MODAL:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    showModal: false,
                    project: {}
                }
            };
        case types.OPEN_PROJECT_DETAIL_MODAL:
            return {
                ...state,
                projectDetail: {
                    ...state.projectDetail,
                    showModal: true,
                    projectId: action.projectId
                }
            };
        case types.CLEAR_MEMBERS:
            return {
                ...state,
                addMember: {
                    ...state.addMember,
                    members: []
                }
            };
        case types.BEGIN_UPDATE_CARD_DEADLINE:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    isSavingDeadline: true
                }
            };

        case types.UPDATE_CARD_DEADLINE_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.id === action.card.id) {
                                        return {
                                            ...card,
                                            deadline_elapse: action.deadline_elapse,
                                            deadline: action.deadline
                                        };
                                    }
                                    return card;
                                })
                            };
                        }
                        return board;
                    })
                },
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        deadline: action.deadline,
                        deadline_elapse: action.deadline_elapse
                    },
                    isSavingDeadline: false
                }
            };

        case types.DELETE_CARD_LABEL_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        return {
                            ...board,
                            cards: board.cards.map((card) => {
                                return {
                                    ...card,
                                    cardLabels: card.cardLabels.filter((label => label.id !== action.cardLabel.id))
                                };
                            })
                        };
                    })
                },
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        cardLabels: state.cardDetail.card.cardLabels.filter((label) => label.id !== action.cardLabel.id)
                    }
                }
            };
        case types.ASSIGN_CARD_LABEL_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.id === action.card.id) {
                                        return {
                                            ...card,
                                            cardLabels: action.labelAdded ?
                                                card.cardLabels.filter((label) => label.id !== action.cardLabel.id)
                                                : [...card.cardLabels, action.cardLabel]
                                        };
                                    }
                                    return card;
                                })
                            };
                        }
                        return board;
                    })
                },
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        cardLabels:
                            action.labelAdded ?
                                state.cardDetail.card.cardLabels.filter((label) => label.id !== action.cardLabel.id)
                                : [...state.cardDetail.card.cardLabels, action.cardLabel]
                    }
                }
            };
        case types.UPDATE_CARD_IN_BOARD_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.id === action.card.id) {
                                        return action.card;
                                    }
                                    return card;
                                })
                            };
                        }
                        return board;
                    })
                }
            };
        case types.DELETE_ATTACHMENT_SUCCESS:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    card: {
                        ...state.cardDetail.card,
                        files: state.cardDetail.card.files.filter((f) => f.id !== action.file.id)
                    }
                }
            };

        case types.BEGIN_LOAD_CARD_DETAIL:
            return {
                ...state,
                cardDetail: {
                    ...state.cardDetail,
                    isLoading: true
                }
            };
        case types.CREATE_CARD_COMMENT_SUCCESS:
            return {
                ...state,
                commentCard: {
                    ...state.commentCard,
                    value: "",
                    attachments: []
                },
                comment: {
                    ...state.comment,
                    comments: state.comment
                        .comments.filter(c => c.id === action.comment.id).length > 0 ?
                        state.comment.comments :
                        [
                            ...state.comment.comments,
                            action.comment
                        ]
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
                },
                comment: {
                    ...state.comment,
                    comments: action.card.comments
                }
            };
        case types.UPLOAD_ATTACHMENT_SUCCESS:
            return {
                ...state,
                commentCard: {
                    ...state.commentCard,
                    attachments: action.addToComment ?
                        [...state.commentCard.attachments, action.file] :
                        state.commentCard.attachments
                },
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
                            name: action.fileWrapper.name,
                            index: action.fileWrapper.index,
                            progress: 0
                        }
                    ]
                }
            };

        case types.ASSIGN_PROJECT_MEMBER_SUCCESS:
            return {
                ...state,
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
                },
                projectDetail: {
                    ...state.projectDetail,
                    project: {
                        ...state.projectDetail.project,
                        members: action.member.added
                            ? state.projectDetail.project.members.filter(m => m.id !== action.member.id)
                            : [...state.projectDetail.project.members, {
                                ...action.member,
                                added: !action.member.added
                            }]
                    }
                },
                project: {
                    ...state.project,
                    projects: state.project.projects.map((project) => {
                        if (project.id === action.project.id) {
                            if (action.member.added) {
                                return {
                                    ...project,
                                    members: project.members.filter(m => m.id !== action.member.id)
                                };
                            } else {
                                return {
                                    ...project,
                                    members: [...project.members, {
                                        ...action.member,
                                        added: !action.member.added
                                    }]
                                };
                            }
                        }
                        return project;
                    })
                }
            };

        case types.ASSIGN_MEMBER_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.id === action.card.id) {
                                        if (action.member.added) {
                                            return {
                                                ...card,
                                                members: card.members.filter(m => m.id !== action.member.id)
                                            };
                                        } else {
                                            return {
                                                ...card,
                                                members: [
                                                    ...card.members,
                                                    {
                                                        ...action.member,
                                                        added: !action.member.added
                                                    }
                                                ]
                                            };
                                        }

                                    }
                                    return card;
                                })
                            };
                        }
                        return board;
                    })
                },
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
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.id === action.card.id) {
                                        return {
                                            ...card,
                                            completed: !action.task.status && card.is_end,
                                            tasks: card.tasks ? card.tasks.map((task) => {
                                                if (task.id === action.task.id) {
                                                    return {
                                                        ...task,
                                                        status: !task.status
                                                    };
                                                }
                                                return task;
                                            }) : []
                                        };
                                    }
                                    return card;
                                })
                            };
                        }
                        return board;
                    })
                },
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
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    return {
                                        ...card,
                                        tasks: 
                                        card.tasks ? card.tasks.filter((task) => task.id !== action.task.id) : []
                                        
                                    };
                                })
                            };
                        }
                        return board;
                    })
                },
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
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: board.cards.map((card) => {
                                    if (card.id === action.card.id) {
                                        return {
                                            ...card,
                                            tasks: [...card.tasks, action.task]
                                        };
                                    }
                                    return card;
                                })
                            };
                        }
                        return board;
                    })
                },
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
                        taskLists: [...state.cardDetail.card.taskLists, {
                            ...action.taskList,
                            tasks: action.taskList.tasks ? action.taskList.tasks : []
                        }],
                        members: action.card ? action.card.members : state.cardDetail.card.members

                    }
                },
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        return {
                            ...board,
                            cards: board.cards.map((card) => {
                                if (card.id === Number(action.taskList.card_id)) {
                                    if (action.card) {
                                        return {
                                            ...card,
                                            ...action.card
                                        };
                                    } else {
                                        return card;
                                    }
                                }
                                return card;
                            })
                        };
                    })
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
                    isSaving: true
                }
            };
        case types.CLOSE_BOOK_CREATE_CARD_MODAL:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isSaving: false,
                    showModal: false,
                    card: {}
                }
            };

        case types.CREATE_CARD_SUCCESS:
            return {
                ...state,
                createCard: {
                    ...state.createCard,
                    isSaving: false,
                    showModal: false,
                    card: {}
                },
                boardList: {
                    ...state.boardList,
                    boards: state.boardList.boards.map((board) => {
                        if (board.id === action.card.board_id) {
                            return {
                                ...board,
                                cards: [
                                    {
                                        ...action.card,
                                        status: "open"
                                    },
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

        case types.CHANGE_PROJECT_SETTING:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    canDragBoard: action.project.canDragBoard,
                    canDragCard: action.project.canDragCard
                },
                project: {
                    ...state.project,
                    projects: state.project.projects.map((project) => {
                        if (project.id === action.project.id) {
                            return action.project;
                        }
                        return project;
                    })
                },
                projectDetail: {
                    ...state.projectDetail,
                    project: action.project
                }
            };
        case types.LOAD_BOARDS_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    isLoadingBoards: false,
                    isLoadingBoardsDetail: true,
                    boards: action.boards,
                    setting: action.setting,
                    projectId: action.projectId,
                    members: action.members,
                    canDragBoard: action.canDragBoard,
                    canDragCard: action.canDragCard
                }
            };
        case types.LOAD_BOARD_DETAIL_SUCCESS:
            return {
                ...state,
                boardList: {
                    ...state.boardList,
                    isLoadingBoards: false,
                    isLoadingBoardsDetail: false,
                    boards: action.boards,
                    setting: action.setting,
                    projectId: action.projectId,
                    members: action.members,
                    canDragBoard: action.canDragBoard,
                    canDragCard: action.canDragCard
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