import initialState from "../../../reducers/initialState";
import * as types from '.././filmActionTypes';

export default function filmReducer(state = initialState.blogFilm, action) {
    switch (action.type) {
        case types.TOGGLE_ADD_EDIT_BLOG_FILM_MODAL:
            return {
                ...state,
                addEditBlogFilmModal: !state.addEditBlogFilmModal,
            };
        default:
            return state;
    }
}