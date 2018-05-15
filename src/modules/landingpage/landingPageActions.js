import * as types from '../../constants/actionTypes';
import * as landingPagesApi from './landingPagesApi';
import {showErrorMessage, showTypeNotification} from "../../helpers/helper";


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

export function deleteLandingPage(landingPageId) {
    return function (dispatch) {
        showTypeNotification("Đang xóa landing page","info");
        dispatch({type: types.BEGIN_DELETE_LANDING_PAGE});
        landingPagesApi.deleteLandingPage(landingPageId)
            .then((res) => {
                if (res.data.status === 1) {
                    showTypeNotification("Xóa landing page thành công");
                    dispatch({
                        type: types.DELETE_LANDING_PAGE_SUCCESS,
                    });
                } else {
                    showErrorMessage(res.data.message);
                    dispatch({type: types.DELETE_LANDING_PAGE_ERROR});
                }
            })
            .catch(() => {
                dispatch({type: types.DELETE_LANDING_PAGE_ERROR});
            });
    };
}
