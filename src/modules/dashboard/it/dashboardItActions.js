import * as types from '../../../constants/actionTypes';
import * as dashboardItApi from './dashboardItApi';


/*eslint no-console: 0 */

export function loadGensData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA_DASHBOARD
        });
        dashboardItApi.loadGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_DASHBOARD_SUCCESS,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GENS_DASHBOARD_ERROR
            });
        });
    };
}
