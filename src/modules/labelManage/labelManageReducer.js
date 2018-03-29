/**
 * Created by Nguyen Tien Tai on 01/15/18.
 */
import * as types from './labelManageActionTypes';
import initialState from '../../reducers/initialState';

export default function labelManageReducer(state = initialState.labelManage, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_COURSE_CATEGORIES:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_COURSE_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                courseCategories: action.categories
            };
        case types.HANDLE_EDIT_CATEGORY_MODAL:
            return {
                ...state,
                categoryEditing: action.category
            };
        case types.TOGGLE_EDIT_CATEGORY_MODAL:
            return {
                ...state,
                editCategoryModal: !state.editCategoryModal
            };
        case types.BEGIN_SAVE_CATEGORY_MODAL:
            return {
                ...state,
                isSavingCategory: true
            };
        case types.SAVE_CATEGORY_SUCCESS:
            return {
                ...state,
                isSavingCategory: false,
                editCategoryModal: false
            };
        case types.DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                courseCategories: state.courseCategories.filter(category => category.id !== action.category.id)
            };
        default:
            return state;
    }
}



