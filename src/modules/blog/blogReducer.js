import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let tmpposts;
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
        case types.RESET_FORM_POST_BLOG:
            return {
                ...state,
                ...{
                    post: {
                        ...initialState.blog.post,
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
        case types.BEGIN_LOAD_POSTS_BLOG:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_POSTS_BLOG_SUCCESS:
            tmpposts = prefixDataPost(action.posts);
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    posts: tmpposts,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                }
            };
        case types.LOAD_POSTS_BLOG_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.DELETE_POST_BLOG_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.postId)
            };
        case types.BEGIN_LOAD_POST_BLOG:
            return {
                ...state,
                ...{
                    isLoadingPost: true,
                    errorPost: false,
                }
            };
        case types.LOAD_POST_BLOG_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingPost: false,
                    errorPost: false,
                    post: {
                        ...state.post,
                        ...action.post
                    }
                }
            };
        case types.LOAD_POST_BLOG_ERROR:
            return {
                ...state,
                ...{
                    isLoadingPost: false,
                    errorPost: true,
                }
            };


        case types.CHANGE_STATUS_IN_BLOG:
            tmpposts = changeStatus(state.posts, action.id, action.status);
            return {
                ...state,
                posts: tmpposts,
            };


        case types.BEGIN_LOAD_CATEGORIES_IN_BLOG:
            return {
                ...state,
                isLoadingCategories: true,
            };
        case types.LOAD_CATEGORIES_IN_BLOG_SUCCESS:
            return {
                ...state,
                isLoadingCategories: false,
                categoriesList: action.categoriesList,
            };
        case types.LOAD_CATEGORIES_IN_BLOG_ERROR:
            return {
                ...state,
                isLoadingCategories: false,
            };
        default:
            return state;
    }
}

function changeStatus(posts, id, status) {
    tmpposts = [];
    tmpposts = posts.map((post) => {
        if (post.id === id) {
            return {...post, status: 1 - status};
        }
        else {
            return post;
        }
    });
    return tmpposts;
}

function prefixDataPost(posts) {
    tmpposts = [];
    tmpposts = posts.map((post) => {
        let tmpAva = post.author.avatar_url.split('');
        let tmpImg = post.image_url.split('');
        let tmpTit = post.title.split('');
        if (!(tmpImg.slice(0, 4) === ['h', 't', 't', 'p'])) {
            tmpImg.unshift("http://");
        }
        if (!(tmpAva.slice(0, 4) === ['h', 't', 't', 'p'])) {
            tmpAva.unshift("http://");
        }
        if (tmpTit.length > 30) {
            tmpTit = tmpTit.slice(0, 30);
        }
        return {
            ...post,
            author: {...post.author, avatar_url: tmpAva.join("")},
            image_url: tmpImg.join(""),
            title: tmpTit.join(""),
        };

    });
    return tmpposts;
}


