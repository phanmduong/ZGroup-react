/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as taskApi from "./taskApi";

// import _ from 'lodash';

export function loadProjects(page = 1, query = "") {
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


