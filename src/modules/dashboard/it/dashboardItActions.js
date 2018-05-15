import * as types from '../../../constants/actionTypes';
import * as dashboardItApi from './dashboardItApi';

/*eslint no-console: 0 */

export function loadFilteredCards(from, to, projectId = "", staffId = "") {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CARDS_MODAL_DASHBOARD_IT,
        });

        dashboardItApi.loadFilteredCards(from, to, projectId, staffId)
            .then((res) => {
                console.log(res);
                dispatch({
                    type: types.LOAD_CARDS_MODAL_DASHBOARD_IT_SUCCESS,
                    cards: res.data.data.cards
                });
            });
    };
}

export function loadCountCardsByStaffDuration(from, to, projectId = "", staffId = "") {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CARDS_STAFF_DURATION,
        });
        dashboardItApi.loadCards(from, to, projectId, staffId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CARDS_STAFF_DURATION_SUCCESS,
                    days: res.data.data.days,
                    num_cards: res.data.data.num_cards,
                    total_points: res.data.data.total_points,
                    staffs: res.data.data.staffs
                });
            });
    };
}

export function toggleShowCardsModal(show) {
    return function (dispatch) {
        dispatch({
            type: types.SHOW_CARDS_MODAL_DASHBOARD_IT,
            show
        });

    };
}


