import * as types from '../../constants/actionTypes';
import * as categoriesAPI from './categoriesAPI';
import * as helper from '../../helpers/helper';

export  function editCategory(id , name) {
    return function (dispatch) {
        helper.showTypeNotification("Đang cập nhật" , "success");
        dispatch({
            type : types.BEGIN_EDIT_CATEGORY,
        });
        categoriesAPI.editCategoryAPI(id , name)
            .then((res) => {
            if(res.data.data.status)
            {
                helper.showTypeNotification('Cập nhật thành công','danger');
                dispatch({
                    type : types.EDIT_CATEGORY_SUCCESS,
                    id : id,
                    name: name,
                });
            }

            })
            .catch(() => {
            helper.sweetAlertError();
            dispatch({
                type : types.EDIT_CATEGORY_ERROR,
            });
            });
    };
}

export function deleteCategory(id) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ", "success");
        dispatch({
            type: types.BEGIN_DELETE_CATEGORY,
        });
        categoriesAPI.deleteCategoryAPI(id)
            .then((res) => {
                    helper.showTypeNotification(" Đã xóa ", "danger");
                    dispatch({
                        type: types.DELETE_CATEGORY_SUCCESS,
                        id: id,
                    });
            })
            .catch(() => {
                helper.sweetAlertError('Xóa thất bại ');
                dispatch({
                    type: types.DELETE_CATEGORY_ERROR,
                });
            });
    };
}

export function addCategory(name, parent_id, close) {
    return function (dispatch) {
        helper.showTypeNotification("Đang thêm", "success");
        dispatch({type: types.BEGIN_ADD_CATEGORY});
        categoriesAPI.addCategoryAPI(name, parent_id)
            .then((res) => {
                close();
                helper.showTypeNotification('Đã thêm ' + name, 'danger');
                dispatch({
                    type: types.LOADED_ADD_CATEGORY_SUCCESS,
                    category: res.data.data.goodCategory
                });

            })
            .catch(() => dispatch({
                type: types.LOADED_ADD_CATEGORY_ERROR
            }));
    };
}

export function loadCategories() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_CATEGORIES_DATA});
        categoriesAPI.loadCategoriesDataAPI()
            .then((res) => {
                    dispatch({
                            type: types.LOADED_CATEGORIES_DATA_SUCCESS,
                            categoriesList: res.data.data[0].good_categories,
                        }
                    );
                }
            )
            .catch(() => {
                dispatch({type: types.LOADED_CATEGORIES_DATA_ERROR});
            });
    };
}


export function openAddCategoryModalContainer(parent_id, name, isEdit) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ADD_CATEGORY_MODAL_CONTAINER,
            parent_id: parent_id,
            name: name,
            isEdit: isEdit,
        });
    };
}

export function closeAddCategoryModalContainer() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_ADD_CATEGORY_MODAL_CONTAINER
        });
    };
}