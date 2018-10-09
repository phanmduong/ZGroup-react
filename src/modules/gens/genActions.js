import * as types from '../../constants/actionTypes';
import * as gensApi from './gensApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadGensData(page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA
        });
        gensApi.loadGens(page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_SUCCESS,
                    gens: res.data.gens,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    totalCount: res.data.paginator.total_count,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GENS_ERROR
            });
        });
    };
}

export function getSalarySales(gen_id, callback) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SALES_SALARY
        });
        gensApi.loadSalesSalary(gen_id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SALES_SALARY_SUCCESS,
                });
                callback(res.data.data.salesSalary);
            }).catch(() => {
            dispatch({
                type: types.LOAD_SALES_SALARY_ERROR
            });
        });
    };
}

export function updateGenFormData(gen) {
    return {
        type: types.UPDATE_GEN_FROM,
        gen: gen
    };
}

export function addGen(gen) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_GEN,
        });
        gensApi.addGen(gen)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Tạo khóa học thành công");
                    dispatch({
                        type: types.ADD_GEN_SUCCESS,
                        gen: res.data.data.gen,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.ADD_GEN_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Tạo khóa học thất bại');
                dispatch({
                    type: types.ADD_GEN_ERROR
                });
            });
    };
}

export function editGen(gen, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_GEN,
        });
        gensApi.editGen(gen)
            .then((res) => {
                if (res.data.status === 1) {
                    closeModal();
                    helper.showNotification("Cập nhật khóa học thành công");
                    dispatch({
                        type: types.EDIT_GEN_SUCCESS,
                        gen: gen,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.EDIT_GEN_ERROR
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Cập nhật khóa học thất bại');
                dispatch({
                    type: types.EDIT_GEN_ERROR
                });
            });
    };
}

export function deleteGen(genId) {
    return function (dispatch) {
        helper.showTypeNotification('Đang xóa lịch học', 'info');
        dispatch({
            type: types.BEGIN_DELETE_GEN,
        });
        gensApi.deleteGen(genId)
            .then(() => {
                helper.showNotification("Xóa lịch học thành công");
                dispatch({
                    type: types.DELETE_GEN_SUCCESS,
                    genId: genId,
                });
            })
            .catch(() => {
                helper.showNotification("Xóa lịch học thất bại");
                dispatch({
                    type: types.DELETE_GEN_ERROR
                });
            });
    };
}

export function changeStatus(genId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_STATUS_GEN,
            genId: genId,
        });
        gensApi.changeStatus(genId)
            .then(() => {
                dispatch({
                    type: types.CHANGE_STATUS_GEN_SUCCESS,
                });
            })
            .catch(() => {
                helper.showNotification("Thay đổi khóa tuyển sinh thất bại");
                dispatch({
                    type: types.CHANGE_STATUS_GEN_ERROR
                });
            });
    };
}

export function changeTeachStatus(genId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_TEACH_STATUS_GEN,
            genId: genId,
        });
        gensApi.changeTeachStatus(genId)
            .then(() => {
                dispatch({
                    type: types.CHANGE_TEACH_STATUS_GEN_SUCCESS,
                });
            })
            .catch(() => {
                helper.showNotification("Thay đổi khóa hiện tại thất bại");
                dispatch({
                    type: types.CHANGE_TEACH_STATUS_GEN_ERROR
                });
            });
    };
}




