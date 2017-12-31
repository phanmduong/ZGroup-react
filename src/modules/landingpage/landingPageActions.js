import * as types from '../../constants/actionTypes';
import * as landingPagesApi from './landingPagesApi';


export function loadLandingPages(page, search) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_LANDING_PAGES});
        landingPagesApi.loadLandingPages(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_LANDING_PAGES_SUCCESS,
                    landingPages: res.data.landing_pages,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_LANDING_PAGES_ERROR});
            });
    };
}
