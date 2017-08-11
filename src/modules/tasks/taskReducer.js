/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.task, action) {
    switch (action.type) {
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
                    projects: action.projects
                }
            };
        default:
            return state;
    }

}