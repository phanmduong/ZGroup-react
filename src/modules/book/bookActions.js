/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as bookApi from './bookApi';
import { showNotification } from "../../helpers/helper";
import * as taskApi from "../tasks/taskApi";

// import _ from 'lodash';
/*eslint no-console: 0 */

export function deleteTaskList(taskList) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_TASK_LIST_TEMPLATE,
            taskList
        });
        taskApi.deleteTaskList(taskList);
    };
}

export function loadTaskListTemplates(page = 1, query = "", type = null) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TASK_LIST_TEMPLATES
        });
        bookApi.loadTaskListTemplates(page, query, type)
            .then((res) => {
                dispatch({
                    type: types.LOAD_TASK_LIST_TEMPLATES_SUCCESS,
                    taskLists: res.data.templates,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            });
    };
}

export function loadAllTaskListTemplates() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TASK_LIST_TEMPLATES
        });
        bookApi.loadAllTaskListTemplates()
            .then((res) => {
                dispatch({
                    type: types.LOAD_TASK_LIST_TEMPLATES_SUCCESS,
                    taskLists: res.data.data.templates
                });
            });
    };
}

export function openAddTaskListTemplateModal() {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ADD_TASK_LIST_TEMPLATE_MODAL
        });
    };
}

export function closeAddTaskListTemplateModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_ADD_TASK_LIST_TEMPLATE_MODAL
        });
    };
}

export function storeTaskListTemplates(taskList) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_TASK_LIST_TEMPLATE
        });
        bookApi.storeTaskListTemplates(taskList)
            .then((res) => {
                if (taskList.id) {
                    showNotification("Sửa quy trình thành công");
                } else {
                    showNotification("Tạo quy trình thành công");
                }

                dispatch({
                    type: types.SAVE_TASK_LIST_TEMPLATE_SUCCESS,
                    taskList: res.data.data.taskList
                });
            });
    };
}


export function updateFormData(taskList) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_ADD_TASK_LIST_FORM_DATA,
            taskList
        });
    };
}


export function toggleTaskStatus(task) {
    return function (dispatch) {
        dispatch({
            task,
            type: types.TOGGLE_TASK_TEMPLATE_STATUS
        });
        taskApi.toggleTaskStatus(task);
    };
}


export function openTaskListDetailModal(taskList) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_TASK_LIST_DETAIL_MODAL,
            taskList
        });
    };
}

export function closeTaskListDetailModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_TASK_LIST_DETAIL_MODAL
        });
    };
}

export function createTask(task) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_TASK_TEMPLATE
        });
        taskApi
            .createTask(task)
            .then((res) => {
                dispatch({
                    type: types.SAVE_TASK_TEMPLATE_SUCCESS,
                    task: res.data.task,
                    taskListId: task.task_list_id
                });
            });
    };
}

export function openTaskSpanModal(task) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_TASK_SPAN_MODAL,
            task
        });
    };
}

export function closeTaskSpanModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_TASK_SPAN_MODAL
        });
    };
}

export function updateTaskSpanForm(task) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_TASK_SPAN_FORM,
            task
        });
    };
}

export function loadBoards(type = "book") {
    return function (dispatch) {
        let project = {};
        dispatch({
            type: types.BEGIN_LOAD_BOARDS
        });
        bookApi.loadBoards(type)
            .then((res) => {
                project = res.data;
                dispatch({
                    projectId: project.id,
                    type: types.LOAD_BOARDS_SUCCESS,
                    boards: project.boards,
                    setting: res.data.setting ? JSON.parse(res.data.setting) : {},
                    cardLabels: project.cardLabels,
                    members: project.members,
                    canDragCard: project.canDragCard,
                    canDragBoard: project.canDragBoard
                });

                let promises = [];
                let secondLoad = [];

                project.boards.forEach((board) => {

                    const prm = new Promise((resolve) => {
                        if (board.id)
                            bookApi.loadBoardDetail(board.id)
                                .then(respone => {
                                    resolve(respone.data);
                                }).catch(err => {
                                    console.log(err);
                                    secondLoad = [...secondLoad, board];
                                });
                    });
                        promises = [...promises, prm];
                });

                let boards = [];
                Promise.all(promises)
                        .then(data => {
                            boards = [...boards, ...data];
                        }).then(() => {
                            if (boards.length == project.boards.length) {
                                dispatch({
                                    projectId: project.id,
                                    type: types.LOAD_BOARD_DETAIL_SUCCESS,
                                    boards: boards,
                                    setting: res.data.setting ? JSON.parse(res.data.setting) : {},
                                    cardLabels: project.cardLabels,
                                    members: project.members,
                                    canDragCard: project.canDragCard,
                                    canDragBoard: project.canDragBoard
                                });
                            }
                        });
                    
                });
    };
}

export function loadFashionBoards() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BOARDS
        });
        bookApi.loadFashionBoards()
            .then((res) => {
                const project = res.data;
                dispatch({
                    projectId: project.id,
                    type: types.LOAD_BOARDS_SUCCESS,
                    boards: project.boards,
                    cardLabels: project.cardLabels,
                    members: project.members,
                    canDragCard: project.canDragCard,
                    canDragBoard: project.canDragBoard
                });
            });
    };
}

export function saveTaskSpan(task) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_TASK_SPAN
        });

        bookApi.saveTaskSpan(task)
            .then((res) => {
                dispatch({
                    type: types.SAVE_TASK_SPAN_SUCCESS,
                    task: res.data.data.task
                });
            });
    };
}

export function saveMemberTask(task, members) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_SAVE_MEMBER_TASK_TEMPLATE });
        const membersStr = JSON.stringify(members);
        taskApi.saveMemberTask(membersStr, task.id)
            .then(() => {
                showNotification("Phân công việc thành công");
                dispatch({
                    type: types.SAVE_MEMBER_TASK_TEMPLATE_SUCCESS,
                    members,
                    task
                });
                dispatch({
                    type: types.CLOSE_ADD_MEMBER_TO_TASK_MODAL
                });
            });
    };
}

export function loadTaskListTemplate(taskListId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TASK_LIST_TEMPLATE
        });
        bookApi
            .loadTaskListTemplate(taskListId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_TASK_LIST_TEMPLATE_SUCCESS,
                    taskList: res.data.data
                });
            });
    };
}

export function showTaskListTemplateSettingModal(showModal) {
    return function (dispatch) {
        dispatch({
            type: types.SHOW_TASK_LIST_TEMPLATE_SETTING_MODAL,
            showModal
        });
    };
}

export function loadTaskListTemplateSetting(taskListTemplateId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TASK_LIST_TEMPLATE_SETTING
        });
        bookApi.loadTaskListTemplateSetting(taskListTemplateId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_TASK_LIST_TEMPLATE_SETTING_SUCCESS,
                    boards: res.data.data.boards
                });
            });
    };
}

export function handleChangeBoxTaskListTemplateSetting(board) {
    return function (dispatch) {
        dispatch({
            type: types.HANDLE_TASK_LIST_TEMPLATE_SETTING_CHECKBOX_CHANGE,
            board
        });
    };
}

export function saveTaskListTemplateSetting(taskListTemplateId, boards) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_TASK_LIST_TEMPLATE_SETTING,
        });

        bookApi.storeTaskListTemplateSetting(taskListTemplateId, boards)
            .then((res) => {
                dispatch({
                    type: types.LOAD_TASK_LIST_TEMPLATE_SUCCESS,
                    taskList: res.data.data.task_list_template
                });
            });


    };
}