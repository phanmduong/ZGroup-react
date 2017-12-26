import * as types from '../../../constants/actionTypes';
import * as dashboardItApi from './dashboardItApi';


/*eslint no-console: 0 */

export function loadCountCardsByStaffDuration(staffId, from, to) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CARDS_STAFF_DURATION,

        });
        dashboardItApi.loadCards(staffId,from, to)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CARDS_STAFF_DURATION_SUCCESS,
                    days: res.data.data.days,
                    num_cards: res.data.data.num_cards
                });
            });
    };
}
