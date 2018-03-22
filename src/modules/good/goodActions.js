/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as goodApi from './goodApi';
import {uploadFile} from '../file/fileApi';
import {showErrorNotification, showNotification, showTypeNotification} from "../../helpers/helper";
import {browserHistory} from 'react-router';

// import _ from 'lodash';
/*eslint no-console: 0 */
export function loadGoods(type = null, page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOODS
        });
        goodApi.loadGoods(type, page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOODS_SUCCESS,
                    goods: res.data.goods,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            });

    };
}

export function updateGoodFormData(good) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_GOOD_FORM_DATA,
            good
        });
    };
}


export function uploadAvatar(file) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_GOOD_AVATAR_COMPLETE,
                avatar_url: data.url
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_GOOD_AVATAR_PROGRESS,
                percent: percentComplete
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_GOOD_AVATAR
        });

        goodApi.uploadAvatar(file,
            completeHandler, progressHandler, error);
    };
}

export function uploadCover(file) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên ảnh nền thành công");
            dispatch({
                type: types.UPLOAD_COVER_SUCCESS,
                coverUrl: data.url
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_UPLOAD_COVER_PROGRESS,
                percentCover: percentComplete
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_COVER
        });

        goodApi.uploadAvatar(file,
            completeHandler, progressHandler, error);
    };
}

export function addUrlSuccess(file) {
    return function (dispatch) {
        dispatch({
            type: types.ADD_GOOD_URL_SUCCESS,
            file
        });
    };
}


export function saveGood(good) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_GOOD
        });

        goodApi.saveGood(good)
            .then(() => {
                browserHistory.goBack();
                showNotification("Thêm sản phẩm thành công");
                dispatch({
                    type: types.SAVE_GOOD_SUCCESS
                });
            });
    };
}


export function loadGood(goodId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOOD_DETAIL
        });

        goodApi.loadGood(goodId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOOD_DETAIL_SUCCESS,
                    good: res.data.data.good
                });
            });
    };
}

export function deleteGood(goodId) {
    return function (dispatch) {
        showTypeNotification("Đang xóa", "info");
        dispatch({
            type: types.BEGIN_DELETE_GOOD
        });

        goodApi.deleteGood(goodId)
            .then((res) => {
                if (res.data.status === 1) {
                    showTypeNotification("Xóa thành công");
                    dispatch({
                        type: types.DELETE_GOOD_SUCCESS,
                        goodId
                    });
                } else {
                    showErrorNotification("Xóa thất bại. Thử lại");
                }
            }).catch(() => {
            showErrorNotification("Xóa thất bại. Thử lại");
        });
    };
}

export function uploadFiles(fileWrapper) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const file = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên tập tin đính kèm thành công");
            dispatch({
                type: types.UPLOAD_GOOD_FILES_SUCCESS,
                file
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_UPLOAD_GOOD_FILES_PROGRESS,
                progress: percentComplete,
                fileWrapper
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_GOOD_FILES,
            fileWrapper
        });

        uploadFile(fileWrapper.index, fileWrapper.file,
            completeHandler, progressHandler, error);
    };
}

export function loadGoodPropertyItems(page = 1, query = "", type = "") {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOOD_PROPERTY_ITEMS
        });
        goodApi.loadGoodPropertyItems(page, query, type)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOOD_PROPERTY_ITEMS_SUCCESS,
                    propertyItems: res.data.good_property_items
                });
            });
    };
}

export function deletePropertyItem(id) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_GOOD_PROPERTY_ITEM,
            id
        });
        goodApi.deletePropertyItem(id);
    };
}

export function updateGoodPropertyFormData(property) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_GOOD_PROPERTY_FORM,
            property
        });
    };
}

export function saveGoodProperty(property, type) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_GOOD_PROPERTY,
        });
        goodApi.saveGoodProperty(property)
            .then((res) => {
                if (res.data.status == 0) {
                    showErrorNotification(res.data.message);
                    dispatch({
                        type: types.CREATE_GOOD_PROPERTY_ERROR
                    });
                } else {
                    showNotification("Tạo thuộc tính cho sách thành công");
                    browserHistory.push(`/manufacture/good/${type}/properties`);
                    dispatch({
                        type: types.SAVE_GOOD_PROPERTY_SUCCESS
                    });
                }

            });

    };
}

export function loadGoodPropertyItem(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOOD_PROPERTY_ITEM
        });

        goodApi.loadGoodPropertyItem(id)
            .then((res) => {
                const result = res.data.data.good_property_item;
                dispatch({
                    type: types.LOAD_GOOD_PROPERTY_ITEM_SUCCESS,
                    property: {
                        ...result,
                        prevalue: result.prevalue
                            ? result.prevalue.split(",").map((v) => {
                                return {value: v, label: v};
                            })
                            : [],
                        preunit: result.preunit ?
                            result.preunit.split(",").map((v) => {
                                return {value: v, label: v};
                            })
                            : []
                    }
                });
            });
    };
}


export function openAddPropertyItemModal(task) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ADD_GOOD_PROPERTY_ITEM_MODAL,
            task
        });
    };
}

export function closeAddPropertyItemModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_ADD_GOOD_PROPERTY_ITEM_MODAL
        });
    };
}

export function loadAllGoodPropertyItems(type, taskId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_GOOD_PROPERTY_ITEMS
        });
        return new Promise((resolve) => {

            goodApi.loadAllGoodPropertyItems(type, taskId)
                .then((res) => {
                    resolve(res.data.data.selected_boards);
                    dispatch({
                        type: types.LOAD_ALL_GOOD_PROPERTY_ITEMS_SUCCESS,
                        good_property_items: res.data.data.good_property_items,
                        boards: res.data.data.boards,
                        selectedBoards: res.data.data.selected_boards
                    });
                });

        });

    };
}

export function addPropertyItemsToTask(selectedBoards, goodPropertyItems, task, currentBoard, targetBoard) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_PROPERTY_ITEM_TO_TASK
        });
        goodApi.addPropertyItemsToTask(selectedBoards, goodPropertyItems, task.id, currentBoard, targetBoard)
            .then((res) => {
                dispatch({
                    type: types.ADD_PROPERTY_ITEM_TO_TASK_SUCCESS,
                    task: res.data.data.task,
                    currentBoard,
                    targetBoard
                });
            });
    };
}


export function resetGoodPropertyForm() {
    return function (dispatch) {
        dispatch({
            type: types.RESET_CREATE_GOOD_PROPERTY_FORM
        });
    };
}

export function loadGoodPropertiesFilled(cardId, goodProperties) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOOD_PROPERTIES_FILLED
        });
        goodApi.loadGoodPropertiesFilled(cardId, goodProperties)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOOD_PROPERTIES_FILLED_SUCCESS,
                    goodProperties: res.data.data.good_properties
                });
            });
    };
}

