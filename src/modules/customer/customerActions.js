import * as types from '../../constants/actionTypes';
import * as customerApis from './customerApis';
import * as helper from '../../helpers/helper';

export function loadCustomers( page , limit, query,status) {
    return function (dispatch) {
        console.log('LOAD_BY_STATUS',status);
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER
        });
        customerApis.loadCustomersApi(limit, page ,query , status)
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_CUSTOMER_SUCCESS,
                    customersList : res.data.customers,
                    total_pages : res.data.paginator.total_pages,
                    total_count : res.data.paginator.total_count,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_CUSTOMER_ERROR,
                });
            });

    };
}
export function loadTotalAndDebtMoney() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TOTAL_AND_DEBT_MONEY
        });
        customerApis.loadTotalAndDebtMoneyApi()
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_TOTAL_AND_DEBT_MONEY_SUCCESS,
                    total_moneys : res.data.data.total_moneys,
                    total_debt_moneys : res.data.data.total_debt_moneys,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_TOTAL_AND_DEBT_MONEY_ERROR,
                });
            });
    };
}
export function updateAddCustomerFormData(customer){
    return function (dispatch) {
        dispatch({
            type : types.UPDATE_ADD_CUSTOMER_FORM_DATA,
            customer : customer,
        });
    };
}

export function addCustomer(customer ,  closeAddModal  ) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ADD_CUSTOMER});
        customerApis.addCustomerApi(customer)
            .then((res) => {
                if (res.data.status) {
                    closeAddModal();
                    helper.showTypeNotification('Đã thêm ' + customer.name, 'success');
                    dispatch({
                        type: types.ADD_CUSTOMER_SUCCESS,
                        customer: customer,
                    });
                }
                else {
                    helper.sweetAlertError("Thiếu thông tin");
                    dispatch({
                        type: types.ADD_CUSTOMER_ERROR,
                        message : res.data.message,
                    });
                }
            })
            .catch(() => {
                    helper.sweetAlertError('Thêm thất bại ');
                    dispatch({
                        type: types.ADD_CUSTOMER_ERROR
                    });
                }
            );
    };
}

export function deleteCustomer(id ) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ", "info");
        dispatch({
            type : types.BEGIN_DELETE_CUSTOMER
        });
        customerApis.deleteCustomerApi(id)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification(" Đã xóa ", "success");
                    dispatch({
                        type: types.DELETE_CUSTOMER_SUCCESS,
                        id: id,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message);
                    dispatch({
                        type: types.DELETE_CUSTOMER_ERROR
                    });
                }
            })
            .catch(()=>{
                dispatch({
                    type : types.DELETE_CUSTOMER_ERROR,
                });
            });
    };
}
