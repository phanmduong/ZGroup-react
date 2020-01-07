import * as types from '../../constants/actionTypes';
import * as discountApis from './dicountApis';
import * as helper from '../../helpers/helper';


export function loadDiscounts( filter ) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DISCOUNT
        });
        discountApis.loadDiscountsApi(filter )
            .then( (res) =>  {
                let paginated = filter.limit !== -1;
                dispatch({
                    type : types.LOADED_DISCOUNT_SUCCESS,
                    discountsList : res.data.coupons,
                    total_pages : paginated ? res.data.paginator.total_pages : 1,
                    total_count : paginated ? res.data.paginator.total_count : 1,
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

