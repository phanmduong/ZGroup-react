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
