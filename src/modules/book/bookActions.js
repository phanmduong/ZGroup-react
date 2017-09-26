/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as bookApi from './bookApi';
import {showNotification} from "../../helpers/helper";
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

export function loadTaskListTemplates(page = 1, query = "") {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TASK_LIST_TEMPLATES
        });
        bookApi.loadTaskListTemplates(page, query)
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
                showNotification("Tạo quy trình thành công");
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

export function deleteTaskTemplate(task) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_TASK_TEMPLATE,
            task
        });
        taskApi.deleteTask(task);
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

export function saveMemberTask(task, user) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_SAVE_MEMBER_TASK_TEMPLATE});
        let userId = 0;
        if (user) {
            userId = user.id;
        }
        taskApi.saveMemberTask(userId, task.id)
            .then(() => {
                showNotification("Phân công việc thành công");
                dispatch({
                    type: types.SAVE_MEMBER_TASK_TEMPLATE_SUCCESS,
                    user,
                    task
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