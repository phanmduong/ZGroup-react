/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function bookReducer(state = initialState.book, action) {
    switch (action.type) {
        case types.BEGIN_SAVE_TASK_LIST_TEMPLATE_SETTING:
            return {
                ...state,
                taskListTemplateModal: {
                    ...state.taskListTemplateModal,
                    showModal: false
                },
                taskListDetail: {
                    ...state.taskListDetail,
                    isLoading: true
                }
            };

        case types.HANDLE_TASK_LIST_TEMPLATE_SETTING_CHECKBOX_CHANGE:
            return {
                ...state,
                taskListTemplateModal: {
                    ...state.taskListTemplateModal,
                    boards: state.taskListTemplateModal.boards.map((board) => {
                        if (board.id === action.board.id) {
                            return action.board;
                        }
                        return board;
                    })
                }
            };
        case types.BEGIN_LOAD_TASK_LIST_TEMPLATE_SETTING:
            return {
                ...state,
                taskListTemplateModal: {
                    ...state.taskListTemplateModal,
                    isLoading: true
                }
            };
        case types.LOAD_TASK_LIST_TEMPLATE_SETTING_SUCCESS:
            return {
                ...state,
                taskListTemplateModal: {
                    ...state.taskListTemplateModal,
                    isLoading: false,
                    boards: action.boards
                }
            };
        case types.SHOW_TASK_LIST_TEMPLATE_SETTING_MODAL:
            return {
                ...state,
                taskListTemplateModal: {
                    ...state.taskListTemplateModal,
                    showModal: action.showModal
                }
            };

        case types.SAVE_TASK_TITLE_SUCCESS:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: state.taskListDetail.taskList.tasks && state.taskListDetail.taskList.tasks.map((task) => {
                            if (task.id == action.task.id) {
                                return {
                                    ...task,
                                    ...action.task
                                };
                            }
                            return task;
                        })
                    },
                    isSavingTask: false
                }
            };

        case types.CHANGE_TASK_ORDER:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: action.tasks
                    }
                }
            };
        case types.ADD_PROPERTY_ITEM_TO_TASK_SUCCESS:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: state.taskListDetail.taskList.tasks.map((task) => {
                            if (task.id === Number(action.task.id)) {
                                return action.task;

                            }
                            return task;
                        })
                    }
                }
            };
        case types.DELETE_TASK_LIST_TEMPLATE:
            return {
                ...state,
                taskLists: {
                    ...state.taskLists,
                    taskLists: state.taskLists.taskLists.filter(taskList => taskList.id !== action.taskList.id)
                }
            };
        case types.BEGIN_LOAD_TASK_LIST_TEMPLATE:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    isLoading: true
                }
            };
        case types.LOAD_TASK_LIST_TEMPLATE_SUCCESS:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    isLoading: false,
                    taskList: action.taskList
                }
            };
        case types.SAVE_MEMBER_TASK_TEMPLATE_SUCCESS:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: state.taskListDetail.taskList.tasks.map((task) => {
                            if (task.id === action.task.id) {
                                return {
                                    ...task,
                                    members: action.members
                                };
                            }
                            return task;
                        })
                    }
                }
            };
        case types.SAVE_TASK_SPAN_SUCCESS:
            return {
                ...state,
                taskSpan: {
                    ...state.taskSpan,
                    isSaving: false,
                    showModal: false,
                    task: {span: 0}
                },
                taskListDetail: {
                    ...state.taskListDetail,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: state.taskListDetail.taskList.tasks.map((task) => {
                            if (task.id === action.task.id) {
                                return {
                                    ...task,
                                    ...action.task
                                };
                            }
                            return task;
                        })
                    }
                }
            };
        case types.BEGIN_SAVE_TASK_SPAN:
            return {
                ...state,
                taskSpan: {
                    ...state.taskSpan,
                    isSaving: true
                }
            };
        case types.UPDATE_TASK_SPAN_FORM:
            return {
                ...state,
                taskSpan: {
                    ...state.taskSpan,
                    task: action.task
                }
            };
        case types.OPEN_TASK_SPAN_MODAL:
            return {
                ...state,
                taskSpan: {
                    ...state.taskSpan,
                    showModal: true,
                    task: action.task
                }
            };
        case types.CLOSE_TASK_SPAN_MODAL:
            return {
                ...state,
                taskSpan: {
                    ...state.taskSpan,
                    showModal: false
                }
            };
        case types.BEGIN_SAVE_TASK_TEMPLATE:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    isSaving: true
                }
            };
        case types.DELETE_TASK_TEMPLATE:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: state.taskListDetail.taskList.tasks.filter(task => task.id !== action.task.id)
                    }
                }
            };
        case types.SAVE_TASK_TEMPLATE_SUCCESS:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    isSaving: false,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: [...state.taskListDetail.taskList.tasks, action.task]
                    }
                }
            };
        case types.TOGGLE_TASK_TEMPLATE_STATUS:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    taskList: {
                        ...state.taskListDetail.taskList,
                        tasks: state.taskListDetail.taskList.tasks.map((task) => {
                            if (task.id === action.task.id) {
                                return {
                                    ...task,
                                    status: !task.status
                                };
                            }
                            return task;
                        })
                    }
                }
            };
        case types.OPEN_TASK_LIST_DETAIL_MODAL:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    showModal: true,
                    taskList: action.taskList
                }
            };
        case types.CLOSE_TASK_LIST_DETAIL_MODAL:
            return {
                ...state,
                taskListDetail: {
                    ...state.taskListDetail,
                    showModal: false
                }
            };
        case types.BEGIN_SAVE_TASK_LIST_TEMPLATE:
            return {
                ...state,
                addTaskList: {
                    ...state.addTaskList,
                    isSaving: true
                }
            };
        case types.SAVE_TASK_LIST_TEMPLATE_SUCCESS:
            return {
                ...state,
                addTaskList: {
                    ...state.addTaskList,
                    isSaving: false,
                    showModal: false,
                    taskList: {}
                },
                taskLists: {
                    ...state.taskLists,
                    taskLists: [...state.taskLists.taskLists, action.taskList]
                }
            };
        case types.UPDATE_ADD_TASK_LIST_FORM_DATA:
            return {
                ...state,
                addTaskList: {
                    ...state.addTaskList,
                    taskList: action.taskList
                }
            };
        case types.BEGIN_LOAD_TASK_LIST_TEMPLATES:
            return {
                ...state,
                taskLists: {
                    ...state.taskLists,
                    isLoading: true
                }
            };
        case types.LOAD_TASK_LIST_TEMPLATES_SUCCESS:
            return {
                ...state,
                taskLists: {
                    ...state.taskLists,
                    isLoading: false,
                    taskLists: action.taskLists,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.OPEN_ADD_TASK_LIST_TEMPLATE_MODAL:
            return {
                ...state,
                addTaskList: {
                    ...state.addTaskList,
                    showModal: true
                }
            };
        case types.CLOSE_ADD_TASK_LIST_TEMPLATE_MODAL:
            return {
                ...state,
                addTaskList: {
                    ...state.addTaskList,
                    showModal: false
                }
            };
        default:
            return state;
    }

}