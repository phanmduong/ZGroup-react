import * as types from '../../constants/actionTypes';
import * as categoriesAPI from './categoriesAPI';
import * as helper from '../../helpers/helper';


export function deleteCategory(id) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ", "info");
        dispatch({
            type: types.BEGIN_DELETE_CATEGORY,
        });
        categoriesAPI.deleteCategoryAPI(id)
            .then((res) => {
                if (res.data.status === 0) {
                    helper.sweetAlertSuccess(res.data.data.message);
                    dispatch({
                        type: types.DELETE_CATEGORY_SUCCESS,
                        id: id,
                    });
                }
                else helper.sweetAlertError('Xóa thất bại ');
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
        helper.showTypeNotification("Đang cập nhật", "danger");
        dispatch({type: types.BEGIN_ADD_CATEGORY});
        categoriesAPI.addCategoryAPI(name, parent_id)
            .then((res) => {
                close();
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