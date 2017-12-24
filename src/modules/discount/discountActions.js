import * as types from '../../constants/actionTypes';
import * as discountApis from './dicountApis';
import * as helper from '../../helpers/helper';


export function loadDiscounts( page , limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DISCOUNT
        });
        discountApis.loadDiscountsApi(page, limit ,query )
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_DISCOUNT_SUCCESS,
                    discountsList : res.data.coupons,
                    total_pages : res.data.paginator.total_pages,
                    total_count : res.data.paginator.total_count,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_DISCOUNT_ERROR,
                });
            });
    };
}

export function deleteDiscount(id , name) {
    return function (dispatch ) {
        helper.showTypeNotification("Đang xóa " + name, "info");
        discountApis.deleteDiscountApi(id)
            .then((res) => {
                if (res.data.status) {
                    helper.showTypeNotification(" Đã xóa " + name, "success");
                    dispatch({
                        type: types.DELETE_DISCOUNT_SUCCESS,
                        id: id,
                    });
                }
                else {
                    helper.sweetAlertError(res.data.message.message);
                }
            });
    };
}

