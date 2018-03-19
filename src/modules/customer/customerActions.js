import * as types from '../../constants/actionTypes';
import * as customerApis from './customerApis';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';


export function loadCustomers( page , limit, query,status) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER
        });
        customerApis.loadCustomersApi(page , limit, query , status)
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
        dispatch(loadTotalAndDebtMoney()); // Tại sao phải cần API để load riêng tổng ??

    };
}

export function loadInfoCustomer(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_INFO_CUSTOMER});
        customerApis.loadInfoCustomersApi(id)
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_INFO_CUSTOMER_SUCCESS,
                    customer : res.data.data.customer
                });
            })
            .catch(() => {
                dispatch ({type : types.LOADED_INFO_CUSTOMER_ERROR,});
            });
    };
}



export function loadOrdersCustomer( id , page , limit) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ORDERS_CUSTOMER
        });
        customerApis.loadOrdersCustomerApi(id , page, limit)
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_ORDERS_CUSTOMER_SUCCESS,
                    ordersList : res.data.orders,
                    total_pages : res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_ORDERS_CUSTOMER_ERROR,
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
                        customer: res.data.data.user,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message);
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

export function editCustomer(customer ) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_CUSTOMER});
        customerApis.editCustomerApi(customer)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification('Đã chỉnh sửa '+ customer.name, 'success');
                    dispatch({
                        type: types.EDIT_CUSTOMER_SUCCESS,
                        customer: res.data.data.user,
                    });
                    browserHistory.push('/good/goods/customer');
                }
                else {
                    helper.sweetAlertError(res.data.message);
                    dispatch({
                        type: types.EDIT_CUSTOMER_ERROR,
                        message: res.data.message,
                    });
                }
            })
            .catch(() => {
                    dispatch({
                        type: types.EDIT_CUSTOMER_ERROR
                    });
                }
            );
    };
}

export function loadGroupCustomer(page, limit, query, stringId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GROUP_CUSTOMER_IN_CUSTOMER
        });
        customerApis.loadGroupCustomerApi(page, limit, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_GROUP_CUSTOMER_SUCCESS_IN_CUSTOMER,
                    groupsInOverlay: res.data.customer_groups,
                    totalGroupCustomerPages: res.data.paginator.total_pages,
                });
                stringId.map((id) => {
                    dispatch(assignCustomerFormData(id));
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_GROUP_CUSTOMER_ERROR_IN_CUSTOMER,
                });
            });
    };
}

export function assignCustomerFormData(id) {
    return function (dispatch) {
        dispatch({
            type: types.ASSIGN_CUSTOMER_FORM_DATA,
            id: id,
        });
    };
}

export function removeCustomerFormData(group) {
    return function (dispatch) {
        dispatch({
            type: types.REMOVE_CUSTOMER_FORM_DATA,
            group: group,
        });
    };
}


