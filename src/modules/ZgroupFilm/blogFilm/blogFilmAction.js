import * as types from '.././filmActionTypes';

export function showAddEditBlogFilmModal() {
    return({
       type: types.TOGGLE_ADD_EDIT_BLOG_FILM_MODAL
    });
}