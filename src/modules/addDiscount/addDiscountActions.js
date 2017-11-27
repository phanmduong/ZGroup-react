import * as types from '../../constants/actionTypes';
import * as addDiscountApis from './addDiscountApis';
import * as helper from '../../helpers/helper';


export function updateDiscountFormData(discount){
    return function (dispatch) {
        dispatch({
            type : types.UPDATE_DISCOUNT_FORM_DATA,
            discount : discount,
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
                }
                else {
                    helper.sweetAlertError(res.data.data.message);
                    dispatch({
                        type: types.ADD_DISCOUNT_ERROR,
                    });
                }
            })
            .catch(() => {
                    helper.sweetAlertError('Thêm thất bại ');
                    dispatch({
                        type: types.ADD_DISCOUNT_ERROR
                    });
                }
            );
    };
}

export function loadCustomers( page , limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER_IN_DISCOUNT
        });
        addDiscountApis.loadCustomersApi(limit, page ,query )
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_CUSTOMER_SUCCESS_IN_DISCOUNT,
                    customers : res.data.customers,
                    total_pages : res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_CUSTOMER_ERROR_IN_DISCOUNT,
                });
            });

    };
}
export function loadGoods( page , limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOOD_IN_DISCOUNT
        });
        addDiscountApis.loadGoodsApi(limit, page ,query )
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_GOOD_SUCCESS_IN_DISCOUNT,
                    goods : res.data.goods,
                    total_pages : res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_GOOD_ERROR_IN_DISCOUNT,
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
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_CATEGORY_SUCCESS_IN_DISCOUNT,
                    categories : res.data.data[0].good_categories,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_CATEGORY_ERROR_IN_DISCOUNT,
                });
            });

    };
}
