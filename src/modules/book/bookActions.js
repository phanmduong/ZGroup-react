/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as bookApi from './bookApi';
import {showNotification} from "../../helpers/helper";

// import _ from 'lodash';
/*eslint no-console: 0 */

export function loadTaskListTemplates(page = 1) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TASK_LIST_TEMPLATES
        });
        bookApi.loadTaskListTemplates(page)
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
