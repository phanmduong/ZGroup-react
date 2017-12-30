/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function goodReducer(state = initialState.good, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BARCODES:
            return {
                ...state,
                barcode: {
                    ...state.barcode,
                    barcodeList: {
                        ...state.barcode.barcodeList,
                        isLoading: true
                    }
                }
            };
        case types.LOAD_BARCODES_SUCCESS:
            return {
                ...state,
                barcode: {
                    ...state.barcode,
                    barcodeList: {
                        ...state.barcode.barcodeList,
                        barcodes: action.barcodes,
                        currentPage: action.currentPage,
                        totalPages: action.totalPages,
                        isLoading: false
                    }
                }
            };
        case types.UPDATE_BARCODE_FORM_DATA:
            return {
                ...state,
                barcode: {
                    ...state.barcode,
                    createBarcode: {
                        ...state.barcode.createBarcode,
                        barcode: action.barcode
                    }
                }
            };
        case types.CREATE_BARCODE_SUCCESS:
            return {
                ...state,
                barcode: {
                    ...state.barcode,
                    createBarcode: {
                        ...state.barcode.createBarcode,
                        isSaving: false,
                        barcode: {},
                        showModal: false
                    },
                    barcodeList: {
                        ...state.barcode.barcodeList,
                        barcodes: [...state.barcode.barcodeList.barcodes, action.barcode]
                    }
                }
            };
        case types.BEGIN_CREATE_BARCODE:
            return {
                ...state,
                barcode: {
                    ...state.barcode,
                    createBarcode: {
                        ...state.barcode.createBarcode,
                        isSaving: true
                    }
                }
            };

        case types.SHOW_CREATE_BARCODE_MODAL:
            return {
                ...state,
                barcode: {
                    ...state.barcode,
                    createBarcode: {
                        ...state.barcode.createBarcode,
                        showModal: action.showModal
                    }
                }
            };

        case types.BEGIN_ADD_PROPERTY_ITEM_TO_TASK:
            return {
                ...state,
                attachPropertyItem: {
                    ...state.attachPropertyItem,
                    isSaving: true
                }
            };
        case types.ADD_PROPERTY_ITEM_TO_TASK_SUCCESS:
            return {
                ...state,
                attachPropertyItem: {
                    ...state.attachPropertyItem,
                    isSaving: false,
                    showModal: false,
                    goodPropertyItems: []
                }
            };
        case types.BEGIN_LOAD_ALL_GOOD_PROPERTY_ITEMS:
            return {
                ...state,
                attachPropertyItem: {
                    ...state.attachPropertyItem,
                    isLoading: true
                }
            };
        case types.LOAD_ALL_GOOD_PROPERTY_ITEMS_SUCCESS:
            return {
                ...state,
                attachPropertyItem: {
                    ...state.attachPropertyItem,
                    isLoading: false,
                    goodPropertyItems: action.good_property_items,
                    boards: action.boards,
                    selectedBoards: action.selectedBoards
                }
            };
        case types.OPEN_ADD_GOOD_PROPERTY_ITEM_MODAL:
            return {
                ...state,
                attachPropertyItem: {
                    ...state.attachPropertyItem,
                    showModal: true,
                    task: action.task
                }
            };
        case types.CLOSE_ADD_GOOD_PROPERTY_ITEM_MODAL:
            return {
                ...state,
                attachPropertyItem: {
                    ...state.attachPropertyItem,
                    showModal: false,
                    task: {}
                }
            };

        case types.BEGIN_LOAD_GOOD_PROPERTY_ITEM:
            return {
                ...state,
                createProperty: {
                    ...state.createProperty,
                    isLoading: true
                }
            };
        case types.LOAD_GOOD_PROPERTY_ITEM_SUCCESS:
            return {
                ...state,
                createProperty: {
                    ...state.createProperty,
                    property: action.property,
                    isLoading: false
                }
            };
        case types.BEGIN_SAVE_GOOD_PROPERTY:
            return {
                ...state,
                createProperty: {
                    ...state.createProperty,
                    isSaving: true
                }
            };

        case types.RESET_CREATE_GOOD_PROPERTY_FORM:
            return {
                ...state,
                createProperty: {
                    ...state.createProperty,
                    isSaving: false,
                    property: {}
                }
            };

        case types.CREATE_GOOD_PROPERTY_ERROR:
            return {
                ...state,
                createProperty: {
                    ...state.createProperty,
                    isSaving: false
                }
            };

        case types.SAVE_GOOD_PROPERTY_SUCCESS:
            return {
                ...state,
                createProperty: {
                    ...state.createProperty,
                    isSaving: false,
                    property: {}
                }
            };
        case types.UPDATE_GOOD_PROPERTY_FORM:
            return {
                ...state,
                createProperty: {
                    ...state.createProperty,
                    property: action.property
                }
            };
        case types.DELETE_GOOD_PROPERTY_ITEM:
            return {
                ...state,
                propertyItem: {
                    ...state.propertyItem,
                    propertyItems: state.propertyItem.propertyItems.filter(item => item.id !== action.id)
                }
            };

        case types.LOAD_GOOD_PROPERTY_ITEMS_SUCCESS:
            return {
                ...state,
                propertyItem: {
                    ...state.propertyItem,
                    isLoading: false,
                    propertyItems: action.propertyItems
                }
            };
        case types.BEGIN_LOAD_GOOD_PROPERTY_ITEMS:
            return {
                ...state,
                propertyItem: {
                    ...state.propertyItem,
                    isLoading: true
                }
            };
        case types.ADD_GOOD_URL_SUCCESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    good: {
                        ...state.createGood.good,
                        files: [...state.createGood.good.files, action.file]
                    }
                }
            };
        case types.UPLOAD_GOOD_FILES_SUCCESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    good: {
                        ...state.createGood.good,
                        files: [...state.createGood.good.files, action.file]
                    },
                    files: state.createGood
                        .files.filter(fileWrapper => fileWrapper.index !== Number(action.file.index))
                }
            };
        case types.UPDATE_UPLOAD_GOOD_FILES_PROGRESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    files: state.createGood.files.map((fileWrapper) => {
                        if (fileWrapper.index === action.fileWrapper.index) {
                            return {
                                ...fileWrapper,
                                progress: action.progress
                            };
                        }
                        return fileWrapper;
                    })
                }
            };
        case types.BEGIN_UPLOAD_GOOD_FILES:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    files: [
                        ...state.createGood.files,
                        {
                            name: action.fileWrapper.name,
                            index: action.fileWrapper.index,
                            progress: 0
                        }
                    ]
                }
            };
        case types.LOAD_GOOD_DETAIL_SUCCESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isLoading: false,
                    good: action.good
                }
            };
        case types.BEGIN_LOAD_GOOD_DETAIL:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isLoading: true
                }
            };
        case types.SAVE_GOOD_SUCCESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isSaving: false,
                    good: {
                        properties: [],
                        files: []
                    }
                }
            };
        case types.BEGIN_SAVE_GOOD:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isSaving: true
                }
            };
        case types.UPLOAD_COVER_SUCCESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingCover: false,
                    good: {
                        ...state.createGood.good,
                        cover_url: action.coverUrl
                    }
                }
            };
        case types.UPDATE_UPLOAD_COVER_PROGRESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    percentCover: action.percentCover
                }
            };
        case types.BEGIN_UPLOAD_COVER:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingCover: true
                }
            };

        case types.UPDATE_GOOD_AVATAR_PROGRESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    percent: action.percent
                }
            };
        case types.UPLOAD_GOOD_AVATAR_COMPLETE:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingAvatar: false,
                    good: {
                        ...state.createGood.good,
                        avatar_url: action.avatar_url
                    }
                }
            };
        case types.BEGIN_UPLOAD_GOOD_AVATAR:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingAvatar: true
                }
            };
        case types.BEGIN_LOAD_GOODS:
            return {
                ...state,
                goodList: {
                    ...state.goodList,
                    isLoading: true
                }
            };
        case types.UPDATE_GOOD_FORM_DATA:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    good: {...action.good}
                }
            };
        case types.LOAD_GOODS_SUCCESS:
            return {
                ...state,
                goodList: {
                    ...state.goodList,
                    isLoading: false,
                    goods: action.goods,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.DELETE_GOOD_SUCCESS:
            return {
                ...state,
                goodList: {
                    ...state.goodList,
                    goods: state.goodList.goods.filter((good) => good.id !== action.goodId),
                }
            };
        default:
            return state;
    }

}