import * as types from '../../constants/actionTypes';
import * as supplierApis from './supplierApis';
import * as helper from '../../helpers/helper';

export function loadSuppliers( page , limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUPPLIER
        });
        supplierApis.loadSuppliersApi(limit, page ,query )
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_SUPPLIER_SUCCESS,
                    suppliersList : res.data.suppliers,
                    total_pages : res.data.paginator.total_pages,
                    total_count : res.data.paginator.total_count,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_SUPPLIER_ERROR,
                });
            });

    };
}
export function updateAddSupplierFormData(supplier){
    return function (dispatch) {
        dispatch({
            type : types.UPDATE_ADD_SUPPLIER_FORM_DATA,
            supplier : supplier,
        });
    };
}

export function addSupplier(supplier ,  closeAddModal  ) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ADD_SUPPLIER});
        supplierApis.addSupplierApi(supplier)
            .then((res) => {
                if (res.data.status) {
                    closeAddModal();
                    helper.showTypeNotification('Đã thêm ' + supplier.name, 'success');
                    dispatch({
                        type: types.ADD_SUPPLIER_SUCCESS,
                        supplier: supplier,
                    });
                }
                else {
                    helper.sweetAlertError("Thiếu thông tin");
                    dispatch({
                        type: types.ADD_SUPPLIER_ERROR,
                        message : res.data.message,
                    });
                }
            })
            .catch(() => {
                    helper.sweetAlertError('Thêm thất bại ');
                    dispatch({
                        type: types.ADD_SUPPLIER_ERROR
                    });
                }
            );
    };
}

