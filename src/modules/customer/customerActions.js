import * as types from '../../constants/actionTypes';
import * as customerApis from './customerApis';
import * as helper from '../../helpers/helper';

export function loadCustomers( page , limit, query,status) {
    return function (dispatch) {
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
        dispatch(loadTotalAndDebtMoney());

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
                        customer: res.data.data.user,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({
                        type: types.ADD_CUSTOMER_ERROR,
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

