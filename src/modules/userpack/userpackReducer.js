import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let tmpUserpacks ;
export default function userpackReducer(state = initialState.userpacks, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_USERPACKS:
            return {
                ...state,
                isLoadingUserpacks: true,
            };
        case types.LOADED_USERPACKS_SUCCESS:
            return {
                ...state,
                isLoadingUserpacks: false,
                ListUserpacks: action.ListUserpacks,
                totalPagesPacks: action.totalPagesPacks,
            };
        case types.LOADED_USERPACKS_ERROR:
            return {
                ...state,
                isLoadingUserpacks: false,
            };
        case types.BEGIN_UPLOAD_IMAGE_USERPACK:
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isUpdatingImage: true,
                    updateImageError: false,
                }
            };
        case types.UPLOAD_IMAGE_USERPACK_SUCCESS :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isUpdatingImage: false,
                    updateImageError: false,
                    avatar_url: action.avatar_url,
                }
            };
        case  types.UPLOAD_IMAGE_USERPACK_FAILED:
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isUpdatingImage: false,
                    updateImageError: true,
                }
            };
        case types.UPDATE_FORM_USERPACK :
            return {
                ...state,
                userpack: action.data,
            };
        case types.BEGIN_ADD_USERPACK :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isSavingAddUserpack: true,
                },
            };
        case types.ADDED_USERPACK_SUCCESS :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isSavingAddUserpack: false,
                },
            };
        case types.ADDED_USERPACK_ERROR :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isSavingAddUserpack: false,
                },
            };

            case types.CHANGE_STATUS_IN_USERPACK :
                tmpUserpacks = changeStatus(state.ListUserpacks, action.id, action.status);
                return {
                    ...state,
                    ListUserpacks: tmpUserpacks,
                };
        default:
            return state;
    }
}

function changeStatus(ListUserpacks, id, status) {
    tmpUserpacks = [];
    tmpUserpacks = ListUserpacks.map((pack) => {
        if (pack.id === id) {
            return {...pack, status: 1 - status};
        }
        else {
            return pack;
        }
    });
    return tmpUserpacks;
}
