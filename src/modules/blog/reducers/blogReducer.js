/**
 * Created by Kiyoshitaro on 15/04/2018.
 */
import types from "../constants/actionTypes";

let blogInitState = {
    isLoadingPosts: false,
    isLoadingPost: false,
    isLoadingCategories: false,
    isOpenLanguageModal: false,
    isOpenCategoryModal: false,
    isOpenPostModal: false,
    posts: [],
    totalPages: 0,
    categories: [],
    postId: 0,
    post: {
        title: "",
        description: "",
        content: "",
        imageUrl: "",
        tags: "",
        categories: [],
        isUpdatingImage: false,
        slug: "",
        meta_title: "",
        keyword: "",
        meta_description: "",
        language: "",
        kind: "",
    },
    language: {
        name: "",
        encoding: "",
    },
    category: {
        name: "",
    },
    isCreatingLanguage: false,
    isCreatingCategory: false,
    allBlogKinds: [
        { value: "", label: "Tất cả" },
        { value: "blog", label: "Blog" },
        { value: "post", label: "Post" },
        { value: "promotion", label: "Ưu đãi" },
        { value: "resource", label: "Tài nguyên" },
        { value: "tutorial", label: "Hướng dẫn" },
    ],
};
export default function blogReducer(state = blogInitState, action) {
    switch (action.type) {
        // case types.RESET_FORM_POST_BLOG:
        //     return {
        //         ...state,
        //         ...{
        //             post: {
        //                 ...initialState.blog.post,
        //             },
        //         },
        //     };

        case types.LOADED_POSTS_ERROR:
            return {
                ...state,
                isLoadingPosts: false,
            };
        case types.LOADED_POSTS_SUCCESS:
            return {
                ...state,
                isLoadingPosts: false,
                posts: prefixDataPost(action.posts),
                totalPages: action.totalPages,
            };
        case types.BEGIN_LOAD_POSTS:
            return {
                ...state,
                isLoadingPosts: true,
            };

        case types.BEGIN_LOAD_CATEGORIES:
            return {
                ...state,
                isLoadingCategories: true,
            };
        case types.LOADED_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoadingCategories: false,
                categories: action.categories,
            };
        case types.LOADED_CATEGORIES_ERROR:
            return {
                ...state,
                isLoadingCategories: false,
            };

        case types.CHANGE_STATUS:
            return {
                ...state,
                posts: changeStatus(state.posts, action.id, action.status),
            };

        case types.OPEN_POST_MODAL:
            return {
                ...state,
                isOpenPostModal: true,
                postId: action.postId,
            };
        case types.CLOSE_POST_MODAL:
            return {
                ...state,
                isOpenPostModal: false,
                post: {
                    ...state.post,
                    title: "",
                    description: "",
                    content: "",
                    imageUrl: "",
                    tags: "",
                    categories: [],
                    isUpdatingImage: false,
                    slug: "",
                    meta_title: "",
                    keyword: "",
                    meta_description: "",
                    language_id: "",
                },
            };

        case types.BEGIN_LOAD_POST:
            return {
                ...state,
                isLoadingPost: true,
            };
        case types.LOAD_POST_SUCCESS:
            return {
                ...state,
                isLoadingPost: false,
                post: addSelectValue(action.post),
            };
        case types.LOAD_POST_ERROR:
            return {
                ...state,
                isLoadingPost: false,
            };

        case types.DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId),
            };

        case types.LOADED_LANGUAGES_SUCCESS:
            return {
                ...state,
                isLoadingLanguages: false,
                languages: action.languages,
            };

        case types.LOADED_LANGUAGES_ERROR:
            return {
                ...state,
                isLoadingLanguages: false,
            };
        case types.BEGIN_LOAD_LANGUAGES:
            return {
                ...state,
                isLoadingLanguages: true,
            };

        case types.BEGIN_UPLOAD_IMAGE:
            return {
                ...state,
                post: {
                    ...state.post,
                    isUpdatingImage: true,
                    updateImageError: false,
                },
            };
        case types.UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    isUpdatingImage: false,
                    updateImageError: false,
                    imageUrl: action.imageUrl,
                },
            };
        case types.UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                post: {
                    ...state.post,
                    isUpdatingImage: false,
                    updateImageError: true,
                },
            };

        case types.UPDATE_FORM_POST:
            return {
                ...state,
                post: action.post,
            };

        case types.BEGIN_SAVE_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    isSaving: true,
                    saveError: false,
                },
            };
        case types.SAVE_POST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    isSaving: false,
                    saveError: false,
                    id: action.postId,
                },
            };
        case types.SAVE_POST_ERROR:
            return {
                ...state,
                post: {
                    ...state.post,
                    isSaving: false,
                    saveError: true,
                },
            };

        case types.BEGIN_PRE_SAVE_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    isPreSaving: true,
                    preSaveError: false,
                },
            };
        case types.PRE_SAVE_POST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    isPreSaving: false,
                    preSaveError: false,
                    id: action.postId,
                },
            };
        case types.PRE_SAVE_POST_ERROR:
            return {
                ...state,
                post: {
                    ...state.post,
                    isPreSaving: false,
                    preSaveError: true,
                },
            };

        case types.CREATE_LANGUAGE_SUCCESS:
            return {
                ...state,
                isCreatingLanguage: false,
                languages: [action.language, ...state.languages],
            };
        case types.BEGIN_CREATE_LANGUAGE:
            return {
                ...state,
                isCreatingLanguage: true,
            };
        case types.CREATE_LANGUAGE_ERROR:
            return {
                ...state,
                isCreatingLanguage: false,
            };

        case types.CLOSE_ADD_LANGUAGE_MODAL:
            return {
                ...state,
                isOpenLanguageModal: false,
            };
        case types.OPEN_ADD_LANGUAGE_MODAL:
            return {
                ...state,
                isOpenLanguageModal: true,
            };

        case types.UPDATE_FORM_CREATE_LANGUAGE:
            return {
                ...state,
                language: {
                    ...state.language,
                    name: action.language.name,
                    encoding: action.language.encoding,
                },
            };

        case types.CLOSE_ADD_CATEGORY_MODAL:
            return {
                ...state,
                isOpenCategoryModal: false,
            };
        case types.OPEN_ADD_CATEGORY_MODAL:
            return {
                ...state,
                isOpenCategoryModal: true,
            };

        case types.BEGIN_CREATE_CATEGORY:
            return {
                ...state,
                isCreatingCategory: true,
            };
        case types.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                isCreatingCategory: false,
                categories: [action.category, ...state.categories],
            };
        case types.CREATE_CATEGORY_ERROR:
            return {
                ...state,
                isCreatingCategory: false,
            };

        case types.UPDATE_FORM_CREATE_CATEGORY:
            return {
                ...state,
                category: {
                    ...state.category,
                    name: action.category.name,
                },
            };

        default:
            return state;
    }
}

function changeStatus(posts, id, status) {
    return posts.map(post => {
        if (post.id === id) {
            return { ...post, status: 1 - status };
        } else {
            return post;
        }
    });
}

function prefixDataPost(posts) {
    return posts.map(post => {
        let tmpAva = post.author.avatar_url;
        let tmpImg = post.image_url;
        let tmpTit = post.title.split("");
        if (tmpAva.slice(0, 4) !== "http") {
            tmpAva = "http://".concat(tmpAva);
        }
        if (tmpImg.slice(0, 4) !== "http") {
            tmpImg = "http://".concat(tmpImg);
        }
        if (tmpTit.length > 40) {
            tmpTit = [...tmpTit.slice(0, 40), " . . ."];
        }
        return {
            ...post,
            author: { ...post.author, avatar_url: tmpAva },
            image_url: tmpImg,
            title: tmpTit.join(""),
        };
    });
}

function addSelectValue(post) {
    return {
        ...post,
        categories: post.categories.map(item => {
            return { value: item.id, label: item.name };
        }),
    };
}
