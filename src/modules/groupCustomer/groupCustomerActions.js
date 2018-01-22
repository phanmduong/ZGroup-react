import * as types from '../../constants/actionTypes';
import * as groupCustomerApis from './groupCustomerApis';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';


export function loadCustomersInOverlay(page, limit, query, stringId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER_IN_GROUP_CUSTOMER
        });
        groupCustomerApis.loadCustomersInOverlayApi(limit, page, query)
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

export function loadCustomersInModal(page, limit, query, idModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER_IN_MODAL_IN_GROUP_CUSTOMER
        });
        groupCustomerApis.loadCustomersInModal(page, limit, query, idModal)
            .then((res) => {
                dispatch({
                    type: types.LOADED_CUSTOMER_IN_MODAL_SUCCESS_IN_GROUP_CUSTOMER,
                    groupCustomerForm: res.data,
                    total_pages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_CUSTOMER_IN_MODAL_ERROR_IN_GROUP_CUSTOMER,
                });
            });
    };
}

export function addCoupon(coupon ,idGroup, close) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ADD_COUPON});
        groupCustomerApis.addCouponApi(coupon, idGroup)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification('Đã thêm ' + coupon.name, 'success');
                    dispatch({
                        type: types.ADD_COUPON_SUCCESS,
                    });
                    dispatch(loadCouponsInModal(idGroup));
                    close();
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({
                        type: types.ADD_COUPON_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch ({
                    type: types.ADD_COUPON_ERROR,
                });
            });
    };
}



export function generateCode() {
    let str = "abcdefghijklmnopqrstuvwxyz";
    const s = str.split("").sort(function () {
        return (0.5 - Math.random());
    });
    const randomCode= [];
    for (let i =0 ; i< 8; i++){randomCode[i] = s[i];}
    return function (dispatch) {
        dispatch({type: types.GENERATE_RANDOM_CODE_IN_GROUP_CUSTOMER, randomCode : randomCode.join("").toUpperCase()});
    };
}


export function updateDiscountFormData(coupon){
    return function (dispatch) {
        dispatch({
            type : types.UPDATE_DISCOUNT_FORM_DATA_IN_GROUP_CUSTOMER,
            coupon : coupon,
        });
    };
}
export function loadCouponsInModal( idGroup) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_COUPON_IN_MODAL_IN_GROUP_CUSTOMER
        });
        groupCustomerApis.loadCouponsInModal( idGroup)
            .then((res) => {
                dispatch({
                    type: types.LOADED_COUPON_IN_MODAL_SUCCESS_IN_GROUP_CUSTOMER,
                    coupons: res.data.data.coupons,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_COUPON_IN_MODAL_ERROR_IN_GROUP_CUSTOMER,
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


export function addGroupCustomer(groupCustomerForm,page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_GROUP_CUSTOMER,
        });
        groupCustomerApis.addGroupCustomerApi(groupCustomerForm)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.ADD_GROUP_CUSTOMER_SUCCESS,
                    });
                    dispatch(loadGroupCustomer(page,6));
                    helper.showTypeNotification('Đã thêm nhóm ' + groupCustomerForm.name, 'success');
                }
                else {
                    dispatch({
                        type: types.ADD_GROUP_CUSTOMER_ERROR,
                    });
                    helper.sweetAlertError(res.data.data.message);
                }
            })
            .catch(() => {
                helper.sweetAlertError("Thất bại");
            });
    };
}
export function editGroupCustomer(groupCustomerForm, groupId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_GROUP_CUSTOMER,});
        groupCustomerApis.editGroupCustomerApi(groupCustomerForm , groupId)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.EDIT_GROUP_CUSTOMER_SUCCESS,
                    });
                    helper.showTypeNotification('Đã chỉnh sửa nhóm ' + groupCustomerForm.name, 'success');
                    browserHistory.push('/good/goods/group-customer');
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({type: types.EDIT_GROUP_CUSTOMER_ERROR,});
                }
            })
            .catch(() => {
                helper.sweetAlertError("Thất bại");
            });
    };
}
export function addCustomer(groupCustomerForm, groupId ,closeAddCustomerModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ADD_CUSTOMER_IN_GROUP_CUSTOMER,});
        groupCustomerApis.editGroupCustomerApi(groupCustomerForm , groupId)
            .then((res) => {
                if (res.data.status) {

                    dispatch({
                        type: types.ADD_CUSTOMER_SUCCESS_IN_GROUP_CUSTOMER,
                    });
                    dispatch({
                        type: types.BEGIN_LOAD_CUSTOMER_IN_MODAL_IN_GROUP_CUSTOMER
                    });
                    groupCustomerApis.loadCustomersInModal(1, 6, '', groupId)
                        .then((res) => {
                            dispatch({
                                type: types.LOADED_CUSTOMER_IN_MODAL_SUCCESS_IN_GROUP_CUSTOMER,
                                groupCustomerForm: res.data,
                                total_pages: res.data.paginator.total_pages,
                            });
                        })
                        .catch(() => {
                            dispatch({
                                type: types.LOADED_CUSTOMER_IN_MODAL_ERROR_IN_GROUP_CUSTOMER,
                            });
                        });
                    helper.showTypeNotification('Đã chỉnh sửa nhóm ' + groupCustomerForm.name, 'success');
                    closeAddCustomerModal();
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({type: types.ADD_CUSTOMER_ERROR_IN_GROUP_CUSTOMER,});
                }
            })
            .catch(() => {
                helper.sweetAlertError("Thất bại");
            });
    };
}

export function deleteGroupCustomer(id) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa ", "info");
        groupCustomerApis.deleteGroupCustomerApi(id)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification(" Đã xóa ", "success");
                    dispatch({
                        type: types.DELETE_GROUP_CUSTOMER_SUCCESS,
                        id: id,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message);
                }
            })
            .catch(() => {
                helper.sweetAlertError("Nhóm vẫn còn khách hàng ");
            });
    };
}
export function deleteCoupon(id,name) {
    return function (dispatch ) {
        helper.showTypeNotification("Đang xóa " + name, "info");
        groupCustomerApis.deleteCouponApi(id)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification(" Đã xóa " + name, "success");
                    dispatch({
                        type: types.DELETE_DISCOUNT_SUCCESS_IN_GROUP_CUSTOMER,
                        id: id,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message.message);
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