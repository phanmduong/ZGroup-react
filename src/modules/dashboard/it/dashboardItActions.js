import * as types from '../../../constants/actionTypes';
import * as dashboardItApi from './dashboardItApi';

/*eslint no-console: 0 */

// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(x);
//         }, 2000);
//     });
// }
//
//
// async function add1(x) {
//     const a = await resolveAfter2Seconds(20);
//     const b = await resolveAfter2Seconds(30);
//     return x + a + b;
// }


export function loadCountCardsByStaffDuration(from, to, projectId = "", staffId = "") {
    // add1(10).then(v => {
    //     console.log(v);  // prints 60 after 4 seconds.
    // });

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
                    total_points: res.data.data.total_points
                });
            });
    };
}

export function toggleShowCardsModal(show){
    return function (dispatch) {
        dispatch({
            type: types.SHOW_CARDS_MODAL_DASHBOARD_IT,
            show
        });

    };
}


