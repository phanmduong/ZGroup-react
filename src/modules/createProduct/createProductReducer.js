import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function createProductReducer(state = initialState.createProduct, action) {
    switch (action.type) {
        case types.GET_MANUFACTURES_CREATE_PRODUCT:
            return {
                ...state,
                manufactures: action.manufactures,
                manufacturesFilter: action.manufacturesFilter,
                manufacturesRender: action.manufacturesRender,
                isLoadingManufacture: false,
                totalPagesManufactures: action.totalPagesManufactures,
                currentPageManufactures: action.currentPageManufactures,
                totalCountManufactures: action.totalCountManufactures,
            };
        case types.BEGIN_GET_MANUFACTURES_CREATE_PRODUCT:
            return {
                ...state,
                isLoadingManufacture: true
            };
        case types.GET_CATEGORIES_CREATE_PRODUCT:
            return {
                ...state,
                categories: action.categories
            };
        case types.UPLOAD_AVATAR_COMPLETE_CREATE_PRODUCT:
            return {
                ...state,
                productWorking: {
                    ...state.productWorking,
                    avatar_url: action.avatar_url
                },
                isUploadingAvatar: false
            };
        case types.UPDATE_AVATAR_PROGRESS_CREATE_PRODUCT:
            return {
                ...state,
                percent: action.percent
            };
        case types.BEGIN_UPLOAD_AVATAR_CREATE_PRODUCT:
            return {
                ...state,
                isUploadingAvatar: true
            };
        case types.BEGIN_UPLOAD_IMAGE_CREATE_PRODUCT:
            return {
                ...state,
                percent: 0,
                isUploadingImage: true
            };
        case types.UPDATE_IMAGE_PROGRESS_CREATE_PRODUCT:
            return {
                ...state,
                percent: action.percent
            };
        case types.UPLOAD_IMAGE_COMPLETE_CREATE_PRODUCT: {
            if (action.length + action.first_length === state.productWorking.images_url.length + 1) {
                return {
                    ...state,
                    isUploadingImage: false,
                    productWorking: {
                        ...state.productWorking,
                        images_url: [...state.productWorking.images_url, action.image]
                    },
                };
            } else {
                return {
                    ...state,
                    productWorking: {
                        ...state.productWorking,
                        images_url: [...state.productWorking.images_url, action.image]
                    },
                    isUploadingImage: true
                };
            }
        }
        case types.UPLOAD_CHILD_IMAGE_COMPLETE_MODAL: {
            let children = [...state.productWorking.children];
            let child_images_url = children[action.index].child_images_url ?
                [...JSON.parse(children[action.index].child_images_url), action.image] : [action.image];
            children[action.index] = {
                ...children[action.index],
                child_images_url: JSON.stringify(child_images_url)
            };
            //cần check xem child_images_url có null hay không
            let length = state.productWorking.children[action.index].child_images_url
                ? JSON.parse(state.productWorking.children[action.index].child_images_url).length + 1 : 1;
            if (action.length + action.first_length === length) {
                return {
                    ...state,
                    isUploadingImage: false,
                    productWorking: {
                        ...state.productWorking,
                        children: children
                    },
                };
            } else {
                return {
                    ...state,
                    productWorking: {
                        ...state.productWorking,
                        children: children
                    },
                    isUploadingImage: true
                };
            }
        }
        case types.END_UPLOAD_IMAGE_CREATE_PRODUCT:
            return {
                ...state,
                isUploadingImage: false
            };
        case types.HANDLE_PRODUCT_CREATE:
            return {
                ...state,
                productWorking: action.product
            };
        case types.ADD_PROPERTIES_CREATE:
            return {
                ...state,
                productWorking: {
                    ...state.productWorking,
                    goods_count: 0,
                    property_list: [...state.productWorking.property_list, action.property],
                    children: []
                }
            };
        case types.HANDLE_PROPERTIES_CREATE: {
            return {
                ...state,
                productWorking: {
                    ...state.productWorking,
                    property_list: action.property_list
                }
            };
        }
        case types.HANDLE_CHILDREN_CREATE_PRODUCT:
            return {
                ...state,
                productWorking: {
                    ...state.productWorking,
                    children: action.children
                }
            };
        case types.HANDLE_GOOD_COUNT_CREATE:
            return {
                ...state,
                productWorking: {
                    ...state.productWorking,
                    goods_count: action.count
                }
            };
        case types.SELECT_GOOD_COUNT_CHECK:
            return {
                ...state,
                goods_count_check: !state.goods_count_check
            };
        case types.DELETE_IMAGE_CREATE_PRODUCT:
            return {
                ...state,
                productWorking: {
                    ...state.productWorking,
                    images_url: state.productWorking.images_url.filter(image => image !== action.image)
                }
            };
        case types.BEGIN_LOAD_PRODUCT_DETAIL:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_PRODUCT_DETAIL_SUCCESS: {
            let product = {};
            if (action.product.images_url) {
                product = {...action.product, images_url: JSON.parse(action.product.images_url)};
            } else {
                product = {...action.product, images_url: []};
            }
            return {
                ...state,
                productWorking: product,
                isLoading: false
            };
        }
        case types.GET_PROPERTIES_CREATE_PRODUCT:
            return {
                ...state,
                properties_list: action.properties_list,
                properties_list_filter: action.properties_list_filter,
                properties_list_render: action.properties_list_render,
                totalPagesProperties: action.totalPagesProperties,
                currentPageProperties: action.currentPageProperties,
                totalCountProperties: action.totalCountProperties
            };
        case types.TOGGLE_ADD_CHILD_IMAGES_MODAL:
            return {
                ...state,
                childImagesModal: !state.childImagesModal,
                child_index: action.index
            };
        case types.SHUT_DOWN_ADD_CHILD_IMAGES_MODAL:
            return {
                ...state,
                childImagesModal: false
            };
        case types.TOGGLE_PROPERTIES_MANAGE_MODAL:
            return {
                ...state,
                propertiesManageModal: !state.propertiesManageModal
            };
        case types.HANDLE_PROPERTIES_MANAGE:
            return {
                ...state,
                properties_list: action.properties_list
            };
        case types.TOGGLE_MANUFACTURES_MANAGE_MODAL:
            return {
                ...state,
                manufacturesManageModal: !state.manufacturesManageModal
            };
        case types.GET_WAREHOUSES_CREATE_PRODUCT:
            return {
                ...state,
                warehousesList: action.warehousesList
            };
        default:
            return state;
    }
}
