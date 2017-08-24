import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function rolesReducer(state = initialState.blog, action) {

    switch (action.type) {
        case types.UPDATE_FORM_POST:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            title: action.post.title,
                            description: action.post.description,
                            tags: action.post.tags,
                            category: action.post.category,
                            content: action.post.content,
                            imageUrl: action.post.imageUrl,
                        }
                    }
                }
            };
        case types.BEGIN_UPLOAD_IMAGE_BLOG:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isUpdatingImage: true,
                            updateImageError: false,
                        }
                    }
                }
            };
        case types.UPLOAD_IMAGE_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isUpdatingImage: false,
                            updateImageError: false,
                            imageUrl: action.imageUrl
                        }
                    }
                }
            };
        case types.UPLOAD_IMAGE_BLOG_FAILED:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isUpdatingImage: false,
                            updateImageError: true,
                        }
                    }
                }
            };
        case types.BEGIN_SAVE_POST_BLOG:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isSaving: true,
                            saveError: false,
                        }
                    }
                }
            };
        case types.SAVE_POST_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isSaving: false,
                            saveError: false,
                            id: action.postId,
                        }
                    }
                }
            };
        case types.SAVE_POST_BLOG_FAILED:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isSaving: false,
                            saveError: true,
                        }
                    }
                }
            };
        case types.BEGIN_LOAD_CATEGORIES:
            return {
                ...state,
                ...{
                    categories: {
                        ...state.categories,
                        ...{
                            isLoading: true,
                            error: false,
                        }
                    }
                }
            };
        case types.LOAD_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...{
                    categories: {
                        ...state.categories,
                        ...{
                            isLoading: false,
                            error: false,
                            categories: action.categories
                        }
                    }
                }
            };
        case types.LOAD_CATEGORIES_ERROR:
            return {
                ...state,
                ...{
                    categories: {
                        ...state.categories,
                        ...{
                            isLoading: false,
                            error: true,
                        }
                    }
                }
            };
        case types.BEGIN_CREATE_CATEGORY:
            return {
                ...state,
                ...{
                    category: {
                        ...state.category,
                        ...{
                            isCreating: true,
                            error: false,
                        }
                    }
                }
            };
        case types.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                ...{
                    category: {
                        ...state.category,
                        ...{
                            isCreating: false,
                            error: false,
                        }
                    }
                }
            };
        case types.CREATE_CATEGORY_FAILED:
            return {
                ...state,
                ...{
                    category: {
                        ...state.category,
                        ...{
                            isCreating: false,
                            error: true,
                        }
                    }
                }
            };
        case types.UPDATE_FORM_CREATE_CATEGORY:
            return {
                ...state,
                ...{
                    category: {
                        ...state.category,
                        name: action.category.name
                    }
                }
            };
        case types.BEGIN_PRE_SAVE_POST_BLOG:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isPreSaving: true,
                            preSaveError: false,
                        }
                    }
                }
            };
        case types.PRE_SAVE_POST_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isPreSaving: false,
                            preSaveError: false,
                            id: action.postId,
                        }
                    }
                }
            };
        case types.PRE_SAVE_POST_BLOG_FAILED:
            return {
                ...state,
                ...{
                    post: {
                        ...state.post,
                        ...{
                            isPreSaving: false,
                            preSaveError: true,
                        }
                    }
                }
            };
        default:
            return state;
    }
}
