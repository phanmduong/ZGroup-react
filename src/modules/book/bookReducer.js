/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function bookReducer(state = initialState.book, action) {
    switch (action.type) {
        case types.UPDATE_ADD_TASK_LIST_FORM_DATA:
            return {
                ...state,
                taskLists: {
                    ...state.taskLists,
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