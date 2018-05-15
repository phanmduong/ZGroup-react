import * as types from '../../constants/actionTypes';
import * as addDiscountApis from './addDiscountApis';
import * as helper from '../../helpers/helper';
import {browserHistory} from 'react-router';


export function uploadImage(file) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_IN_DISCOUNT,
        });
        addDiscountApis.uploadImage(
            file,
            function (event) {
                let data = JSON.parse(event.currentTarget.response);
                dispatch(uploadImageDiscountSuccess(data.link));
            },
            () => {
                helper.showErrorNotification("Đăng ảnh thất bại.");
                dispatch(uploadImageDiscountFailed());
            },
        );
    };
}

export function uploadImageDiscountSuccess(cover_url) {
    return {
        type: types.UPLOAD_IMAGE_DISCOUNT_SUCCESS,
        cover_url: cover_url,
    };
}

export function uploadImageDiscountFailed() {
    return {
        type: types.UPLOAD_IMAGE_DISCOUNT_FAILED,
    };
}


export function updateDiscountFormData(discount) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DISCOUNT_FORM_DATA,
            discount: discount,
        });
    };
}


export function addDiscount(discount) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_ADD_DISCOUNT});
        addDiscountApis.addDiscountApi(discount)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification('Đã thêm ' + discount.name, 'success');
                    dispatch({
                        type: types.ADD_DISCOUNT_SUCCESS,
                    });
                    browserHistory.push('/good/discount');
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({
                        type: types.ADD_DISCOUNT_ERROR,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: types.ADD_DISCOUNT_ERROR,
                });
            });
    };
}

export function loadCustomers(page, limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER_IN_DISCOUNT
        });
        addDiscountApis.loadCustomersApi(limit, page, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_CUSTOMER_SUCCESS_IN_DISCOUNT,
                    customers: res.data.customers,
                    total_pages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_CUSTOMER_ERROR_IN_DISCOUNT,
                });
            });

    };
}

export function loadGoods(page, limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOOD_IN_DISCOUNT
        });
        addDiscountApis.loadGoodsApi(limit, page, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_GOOD_SUCCESS_IN_DISCOUNT,
                    goods: res.data.goods,
                    total_pages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_GOOD_ERROR_IN_DISCOUNT,
                });
            });

    };
}

export function loadGroupCustomers(page, limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GROUP_CUSTOMER_IN_DISCOUNT
        });
        addDiscountApis.loadGroupCustomersApi(limit, page, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_GROUP_CUSTOMER_SUCCESS_IN_DISCOUNT,
                    customer_groups: res.data.customer_groups,
                    total_pages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_GROUP_CUSTOMER_ERROR_IN_DISCOUNT,
                });
            });

    };
}

export function loadCategories() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CATEGORY_IN_DISCOUNT
        });
        addDiscountApis.loadCategoriesApi()
            .then((res) => {
                dispatch({
                    type: types.LOADED_CATEGORY_SUCCESS_IN_DISCOUNT,
                    categories: helper.superSortCategories(res.data.data[0].good_categories),  // hàm để sort các categories cha con
                });
            })
            .catch(() => {
                helper.sweetAlertError("Thiếu thông tin");
                dispatch({
                    type: types.LOADED_CATEGORY_ERROR_IN_DISCOUNT,
                });
            });

    };
}

export function loadDiscount(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_DISCOUNT_IN_ADD});
        addDiscountApis.loadDiscountApi(id)
            .then((res) => {
                dispatch({
                    type: types.LOADED_DISCOUNT_SUCCESS_IN_ADD,
                    discount: res.data.data.coupon,
                });
            });

    };
}

export function generateCode() {
    let str = "abcdefghijklmnopqrstuvwxyz";
    const s = str.split("").sort(function () {
        return (0.5 - Math.random());
    });
    const randomCode = [];
    for (let i = 0; i < 8; i++) {
        randomCode[i] = s[i];
    }
    return function (dispatch) {
        dispatch({type: types.GENERATE_RANDOM_CODE, randomCode: randomCode.join("").toUpperCase()});
    };
}

export function editDiscount(discount) {
    return function (dispatch) {

        dispatch({
            type: types.BEGIN_EDIT_DISCOUNT
        });
        addDiscountApis.editDiscountApi(discount)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification('Đã chỉnh sửa ' + discount.name, 'success');
                    dispatch({
                        type: types.EDIT_DISCOUNT_SUCCESS,
                        discount: res.data.data.coupon,
                    });
                    browserHistory.push('/good/discount');
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({
                        type: types.EDIT_DISCOUNT_ERROR
                    });
                }
            })
            .catch(() => {
                helper.sweetAlertError("Thiếu thông tin");
                dispatch({
                    type: types.EDIT_DISCOUNT_ERROR,
                });
            });
    };
}
