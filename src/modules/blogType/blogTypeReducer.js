
import initialState from '../../reducers/initialState';
import * as types from './blogTypeActionTypes';

export default function labelManageReducer(state = initialState.blogType, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BLOG_TYPE:
            return{
                ...state,
                isLoading:true,
            };
        case types.BEGIN_SAVE_BLOG_TYPE:
            return{
                ...state,
                isUpdatingEditModal:true,
                isSaving:true,
            };
        case types.TOGGLE_ADD_EDIT_BLOG_TYPE_MODAL:
            return{
                ...state,
                addEditBlogTypeModal: !state.addEditBlogTypeModal
            };
        case types.LOAD_ALL_BLOG_TYPE_SUCCESS:
            return{
                ...state,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount,
                totalPages: action.totalPages,
                blogTypes: action.blogTypes,
                isLoading:false,
            };
        case types.HANDLE_BLOG_TYPE_MODAL:
            return{
                ...state,
                blogTypeModal: action.blogType,
            };
        case types.SAVE_BLOG_TYPE_SUCCESS:
            return{
                ...state,
                isUpdatingEditModal:false,
                addEditBlogTypeModal: false,
                isSaving:false,
                blogTypes: [action.blogType,...state.blogTypes]
            };
        case types.EDIT_BLOG_TYPE_SUCCESS:{
            let blogs = state.blogTypes.map((blog) => {
                if (blog.id === action.blogType.id)
                    return {
                        ...blog,
                        name: action.blogType.name,
                    };
                return blog;
            });
            return {
                ...state,
                isUpdatingEditModal:false,
                addEditBlogTypeModal: false,
                blogTypes: blogs,
                isUpdatingEditModal:false,
            };
        }
        case types.DELETE_BLOG_TYPE_SUCCESS:
            return {
                ...state,
                blogTypes: state.blogTypes.filter(blogType => blogType.id !== action.blogType.id)
            };
        case types.BEGIN_EDIT_BLOG_TYPE:
            return{
                ...state,
                isUpdatingEditModal:true,
            };

        default:
            return state;
    }
}