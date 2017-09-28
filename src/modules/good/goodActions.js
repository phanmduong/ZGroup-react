/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as goodApi from './goodApi';

// import _ from 'lodash';
/*eslint no-console: 0 */
export function loadGoods(page = 1, query = null) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOODS
        });
        goodApi.loadGoods(page, query)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOODS_SUCCESS,
                    goods: res.data.goods,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            });

    };
}
