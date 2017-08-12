/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.task, action) {
    switch (action.type) {
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