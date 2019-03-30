/**
 * Created by phanmduong on 4/6/17.
 */
/**
 * Edited by TienTaiNguyen on 2/1/18.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.baseList, action) {
    switch (action.type) {
        case types.RESET_CREATE_BASE_DATA:
            return Object.assign({}, state, {
                createBase: {
                    ...state.createBase,
                    base: {
                        name: "",
                        address: ""
                    }
                }
            });
        case types.DELETE_BASE_SUCCESS:
            return Object.assign({}, state, {
                bases: state.bases.filter(b => b.id !== action.base.id)
            });

        case types.BEGIN_LOAD_BASE:
            return Object.assign({}, state, {
                createBase: {
                    ...state.createBase,
                    isLoadingBase: true
                }
            });
        case types.LOAD_BASE_SUCCESS:
            return Object.assign({}, state, {
                createBase: {
                    ...state.createBase,
                    base: {
                        ...action.base,
                        images: action.base.images_url ? action.base.images_url.trim().split(",") : [],
                    }
                    ,
                    isLoadingBase: false
                }
            })
                ;

        case types.BEGIN_LOAD_BASES:
            return Object.assign({}, state, {
                isLoadingBases: true
            });
        case types.LOAD_BASES_SUCCESS:
            return Object.assign({}, state, {
                isLoadingBases: false,
                bases: action.bases,
                currentPage: action.currentPage,
                totalPages: action.totalPages
            });
        case types.SET_DEFAULT_BASE:
            return Object.assign({}, state, {
                bases: state.bases.map(base => {
                    if (base.id === action.baseId) {
                        return Object.assign({}, base, {center: 1});
                    } else {
                        return Object.assign({}, base, {center: 0});
                    }
                })
            });
        case types.UPDATE_BASE_FORM_DATA:
            return {
                ...state,
                createBase: {...state.createBase, base: action.base}
            };
        case types.BEGIN_CREATE_BASE:
            return {
                ...state,
                createBase: {...state.createBase, isSavingBase: true}
            };
        case types.BEGIN_CREATE_BASE_MODAL:
            return {
                ...state,
                isSavingBase: true
            };
        case types.CREATE_BASE_SUCCESS_MODAL:
            return {
                ...state,
                isSavingBase: false,
                showEditBaseModal: false
            };
        case types.CREATE_BASE_SUCCESS:
            return {
                ...state,
                createBase: {
                    ...state.createBase, isSavingBase: false,
                    base: {
                        name: "",
                        address: ""
                    }
                }
            };
        case types.BEGIN_LOAD_ALL_PROVINCES_BASE:
            return {
                ...state,
                isLoadingProvinces: true,
            };
        case types.LOAD_ALL_PROVINCES_SUCCESS:
            return {
                ...state,
                isLoadingProvinces: false,
                provinces: action.provinces
            };
        case types.UPDATE_BASE_AVATAR_PROGRESS:
            return {
                ...state,
                createBase: {
                    ...state.createBase,
                    percent: action.percent
                }
            };
        case types.UPLOAD_BASE_AVATAR_COMPLETE:
            return {
                ...state,
                createBase: {
                    ...state.createBase,
                    isUploadingAvatar: false,
                    base: {
                        ...state.createBase.base,
                        avatar_url: action.avatar_url
                    }
                }
            };
        case types.BEGIN_UPLOAD_BASE_AVATAR:
            return {
                ...state,
                createBase: {
                    ...state.createBase,
                    isUploadingAvatar: true
                }
            };
        case types.UPDATE_BASE_IMAGE_PROGRESS:
            return {
                ...state,
                createBase: {
                    ...state.createBase,
                    percentImage: action.percent
                }
            };
        case types.UPLOAD_BASE_IMAGE_COMPLETE:
            return {
                ...state,
                createBase: {
                    ...state.createBase,
                    isUploadingImage: false,
                    base: {
                        ...state.createBase.base,
                        images: [action.image_url, ...state.createBase.base.images]
                    }
                }
            };
        case types.BEGIN_UPLOAD_BASE_IMAGE:
            return {
                ...state,
                createBase: {
                    ...state.createBase,
                    isUploadingImage: true
                }
            };
        case types.TOGGLE_BASE_EDIT_MODAL:
            return {
                ...state,
                showEditBaseModal: !state.showEditBaseModal
            };
        case types.HANDLE_BASE_EDIT_MODAL:
            return {
                ...state,
                base: action.base
            };
        case types.UPLOAD_BASE_AVATAR_COMPLETE_MODAL:
            return {
                ...state,
                isUploadingAvatar: false,
                base: {
                    ...state.base,
                    avatar_url: action.avatar_url
                }
            };
        case types.UPDATE_BASE_AVATAR_PROGRESS_MODAL:
            return {
                ...state,
                ['percent_' + action.type_image]: action.percent
            };
        case types.BEGIN_UPLOAD_BASE_AVATAR_MODAL:
            return {
                ...state,
                isUploadingAvatar: true
            };
        case types.BEGIN_UPLOAD_IMAGE_ROOM:
            return {
                ...state,
                ['percent_' + action.type_image]: 0,
                ['isUploadingImage_' + action.type_image]: true
            };
        case types.UPLOAD_IMAGE_COMPLETE_BASE_MODAL: {
            let images_url = [];
            let type = action.type_image;
            if (state.base[type]) images_url = JSON.parse(state.base[type]);
            if (action.length + action.first_length === images_url.length + 1) {
                return {
                    ...state,
                    ['isUploadingImage_' + type]: false,
                    base: {
                        ...state.base,
                        [type]: JSON.stringify([...images_url, action.image])
                    },
                };
            } else {
                return {
                    ...state,
                    base: {
                        ...state.base,
                        [type]: JSON.stringify([...images_url, action.image])
                    },
                    ['isUploadingImage_' + type]: true
                };
            }
        }
        case types.DELETE_IMAGE_BASE_MODAL: {
            let type = action.type_image;
            let images_url = JSON.parse(state.base[type]);
            return {
                ...state,
                base: {
                    ...state.base,
                    [type]: JSON.stringify(images_url.filter(image => image !== action.image))
                }
            };
        }
        case types.HANDLE_DISTRICTS_BASE_LIST:
            return {
                ...state,
                districts: action.districts
            };
        default:
            return state;
    }

}