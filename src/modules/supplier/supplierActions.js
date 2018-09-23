import * as types from '../../constants/actionTypes';
import * as supplierApis from './supplierApis';
import * as helper from '../../helpers/helper';

export function loadSuppliers(page, limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUPPLIER
        });
        supplierApis.loadSuppliersApi(limit, page, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_SUPPLIER_SUCCESS,
                    suppliersList: res.data.suppliers,
                    total_pages: res.data.paginator.total_pages,
                    total_count: res.data.paginator.total_count,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_SUPPLIER_ERROR,
                });
            });

    };
}

export function updateAddSupplierFormData(supplier) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_ADD_SUPPLIER_FORM_DATA,
            supplier: supplier,
        });
    };
}

export function addSupplier(supplier, closeAddModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ADD_SUPPLIER});
        supplierApis.addSupplierApi(supplier)
            .then((res) => {
                if (res.data.status) {
                    closeAddModal();
                    helper.showTypeNotification('Đã thêm '+ supplier.name, 'success');
                    dispatch({
                        type: types.ADD_SUPPLIER_SUCCESS,
                        supplier: res.data.data.supplier,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message);
                    dispatch({
                        type: types.ADD_SUPPLIER_ERROR,
                        message: res.data.message,
                    });
                }
            })
            .catch(() => {
                    dispatch({
                        type: types.ADD_SUPPLIER_ERROR
                    });
                }
            );
    };
}

export function editSupplier(supplier , closeAddModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_SUPPLIER});
        supplierApis.editSupplierApi(supplier)
            .then((res) => {
                if (res.data.status) {
                    closeAddModal();
                    helper.showTypeNotification('Đã chỉnh sửa '+ supplier.name, 'success');
                    dispatch({
                        type: types.EDIT_SUPPLIER_SUCCESS,
                        supplier: supplier,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message);
                    dispatch({
                        type: types.EDIT_SUPPLIER_ERROR,
                        message: res.data.message,
                    });
                }
            })
            .catch(() => {
                    dispatch({
                        type: types.EDIT_SUPPLIER_ERROR
                    });
                }
            );
    };
}

export function deleteSupplier(id) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ", "info");
        supplierApis.deleteSupplierApi(id)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification(" Đã xóa ", "success");
                    dispatch({
                        type: types.DELETE_SUPPLIER_SUCCESS,
                        id: id,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message.message);
                }
            })
            .catch(() => {});
    };
}

