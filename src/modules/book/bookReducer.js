/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function bookReducer(state = initialState.book, action) {
    switch (action.type) {
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
                    showModal: false
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