/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as taskApi from "./taskApi";
import {showNotification} from '../../helpers/helper';
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
            throw (error);
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
            throw (error);
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



