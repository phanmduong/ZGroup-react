import * as types from '../../constants/actionTypes';
import * as groupCustomerApis from './groupCustomerApis';
import * as helper from '../../helpers/helper';


export function loadCustomers(page, limit, query, stringId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER_IN_GROUP_CUSTOMER
        });
        groupCustomerApis.loadCustomersApi(limit, page, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_CUSTOMER_SUCCESS_IN_GROUP_CUSTOMER,
                    customersList: res.data.customers,
                    total_pages: res.data.paginator.total_pages,
                    total_count: res.data.paginator.total_count,
                });
                stringId.map((id) => {
                    dispatch(assignGroupCustomerFormData(id));
                }); // loc luon những người có trong stringId
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_CUSTOMER_ERROR_IN_GROUP_CUSTOMER,
                });
            });
    };
}

export function loadGroupCustomer(page, limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GROUP_CUSTOMER
        });
        groupCustomerApis.loadGroupCustomerApi(page, limit, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_GROUP_CUSTOMER_SUCCESS,
                    groupCustomersList: res.data.customer_groups,
                    total_pages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_GROUP_CUSTOMER_ERROR,
                });
            });
    };
}

export function updateGroupCustomerFormData(groupCustomerForm) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_GROUP_CUSTOMER_FORM_DATA,
            groupCustomerForm: groupCustomerForm,
        });
    };
}


export function addGroupCustomer(groupCustomer) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_GROUP_CUSTOMER,
        });
        groupCustomerApis.addGroupCustomerApi(groupCustomer)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.ADD_GROUP_CUSTOMER_SUCCESS,
                        groupCustomer : res.data.data.customer_group, // nên lấy từ api
                    });
                    helper.showTypeNotification('Đã thêm nhóm ' + groupCustomer.name, 'success');
                }
                else {
                    dispatch({
                        type: types.ADD_GROUP_CUSTOMER_ERROR,
                    });
                    helper.sweetAlertError(res.data.data.message);
                }
            });
    };
}
export function editGroupCustomer(groupCustomer) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_GROUP_CUSTOMER,});
        groupCustomerApis.editGroupCustomerApi(groupCustomer)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification('Đã chỉnh sửa nhóm ' + groupCustomer.name, 'success');
                    dispatch({
                        type: types.EDIT_GROUP_CUSTOMER_SUCCESS,
                        groupCustomer : res.data.data.customer_group, // nên lấy từ api
                    });
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({type: types.EDIT_GROUP_CUSTOMER_ERROR,});
                }
            });
    };
}


export function assignGroupCustomerFormData(id) {
    return function (dispatch) {
        dispatch({
            type: types.ASSIGN_GROUP_CUSTOMER_FORM_DATA,
            id: id,
        });
    };
}

export function removeGroupCustomerFormData(customer) {
    return function (dispatch) {
        dispatch({
            type: types.REMOVE_GROUP_CUSTOMER_FORM_DATA,
            customer: customer,
        });
    };
}