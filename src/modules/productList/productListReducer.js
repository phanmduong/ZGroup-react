import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function productListReducer(state = initialState.productList, action) {
    switch (action.type) {
        case types.LOAD_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount,
                isLoading: false
            };
        case types.DISPLAY_INFORMATION_PRODUCTS_LIST:
            return {
                ...state,
                productsTotal: action.productsTotal,
                productsQuantity: action.productsQuantity,
                isLoading: false,
                modalInProduct: {
                    ...state.modalInProduct,
                    sameProductModal: false
                }
            };
        case types.TOGGLE_PRICE_MODAL:
            return {
                ...state,
                modalInProduct: {
                    ...state.modalInProduct,
                    priceModal: !state.modalInProduct.priceModal
                }
            };
        case types.TOGGLE_SAME_PRODUCT_MODAL:
            return {
                ...state,
                modalInProduct: {
                    ...state.modalInProduct,
                    sameProductModal: !state.modalInProduct.sameProductModal
                },
                productEditing: {
                    ...state.productEditing,
                    index: action.index,
                }
            };
        case types.BEGIN_LOAD_PRODUCTS:
            return {
                ...state,
                isLoading: true
            };
        case types.HANDLE_PRICE_PRODUCT_LIST:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    productPrice: action.product
                }
            };
        case types.HANDLE_PRODUCT:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    productPresent: action.product
                }
            };
        case types.HANDLE_AVATAR_PRODUCT_LIST:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    productAvatar: action.product
                }
            };
        case types.UPDATING_PRODUCT_LIST_MODAL:
            return {
                ...state,
                modalInProduct: {
                    ...state.modalInProduct,
                    isModalUpdating: action.updating
                }
            };
        case types.UPDATED_PRODUCT_LIST_MODAL:
            return {
                ...state,
                modalInProduct: {
                    ...state.modalInProduct,
                    modalUpdated: action.modalUpdated
                }
            };
        case types.TOGGLE_WARE_HOUSE_MODAL:
            return {
                ...state,
                modalInProduct: {
                    ...state.modalInProduct,
                    wareHouseModal: !state.modalInProduct.wareHouseModal
                }
            };
        case types.TOGGLE_AVATAR_MODAL:
            return {
                ...state,
                modalInProduct: {
                    ...state.modalInProduct,
                    avatarModal: !state.modalInProduct.avatarModal
                }
            };
        case types.UPLOAD_PRODUCT_AVATAR_COMPLETE:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    productAvatar: {
                        ...state.productEditing.productAvatar,
                        avatar_url: action.avatar_url
                    },
                    isUploadingAvatar: false
                }
            };
        case types.BEGIN_UPLOAD_PRODUCT_AVATAR:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    isUploadingAvatar: true
                }
            };
        case types.UPDATE_PRODUCT_AVATAR_PROGRESS:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    percent: action.percent
                }
            };
        case types.GET_CATEGORIES_PRODUCTS_LIST:
            return {
                ...state,
                categories: action.categories
            };
        case types.GET_MANUFACTURES_PRODUCTS_LIST:
            return {
                ...state,
                manufactures: action.manufactures
            };
        case types.HANDLE_CATEGORY:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    good_category_id: action.good_category_id
                }
            };
        case types.HANDLE_MANUFACTURE:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    manufacture_id: action.manufacture_id
                }
            };
        case types.HANDLE_STATUS:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    status: action.status
                }
            };
        case types.OPEN_WAREHOUSE_TAB_PRODUCT_LIST:
            return {
                ...state,
                showWareHouse: true
            };
        case types.OPEN_HISTORY_TAB_PRODUCT_LIST:
            return {
                ...state,
                showWareHouse: false
            };
        case types.DELETE_CHILDREN_PRODUCT_LIST: {
            let products = [...state.products];
            let children = state.productEditing.productPresent.children.filter(child => child.id !== action.product.id);
            products[action.index] = {
                ...state.products[action.index],
                children: children
            };
            return {
                ...state,
                products: products,
                productEditing: {
                    ...state.productEditing,
                    productPresent: {
                        ...state.productEditing.productPresent,
                        children: children
                    }
                }
            };
        }
        case types.SHUT_DOWN_SAME_PRODUCT_MODAL:
            return {
                ...state,
                modalInProduct: {
                    ...state.modalInProduct,
                    sameProductModal: false
                }
            };
        case types.HANDLE_WAREHOUSE_PRODUCT:
            return {
                ...state,
                productEditing: {
                    ...state.productEditing,
                    productWarehouse: action.product
                }
            };
        default:
            return state;
    }
}
