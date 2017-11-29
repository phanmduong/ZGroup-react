import * as types from '../../constants/actionTypes';
import * as discountApis from './dicountApis';
// import * as helper from '../../helpers/helper';


export function loadDiscounts( page , limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DISCOUNT
        });
        discountApis.loadDiscountsApi(limit, page ,query )
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
