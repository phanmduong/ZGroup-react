/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as baseListApi from './baseListApi';
// import _ from 'lodash';

export function loadBases(page = 1) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES
        });
        baseListApi.loadBases(page).then(function (res) {
            dispatch({
                type: types.LOAD_BASES_SUCCESS,
                bases: res.data.bases,
                currentPage: res.data.paginator.current_page,
                totalPages: res.data.paginator.total_pages
            });
        }).catch(error => {
            throw (error);
        });

    };
}

