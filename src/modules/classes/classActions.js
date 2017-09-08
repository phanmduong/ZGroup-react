import * as types from '../../constants/actionTypes';
import * as classApi from './classApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function loadClasses(search, page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASSES_DATA,
        });
        classApi.loadClasses(search, page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CLASSES_DATA_SUCCESS,
                    classes: res.data.classes,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_CLASSES_DATA_ERROR
            });
        });
    };
}




