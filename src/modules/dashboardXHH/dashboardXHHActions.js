import * as types from '../../constants/actionTypes';
import * as dashboardXHHApi from './dashboardXHHApi';

/*eslint no-console: 0 */

export function loadDashboardData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_DASHBOARD_XHH_DATA
        });
        dashboardXHHApi.loadDashboard()
            .then((res) => {
                dispatch({
                    type: types.LOAD_DASHBOARD_XHH_DATA_SUCCESS,
                    dashboard: res.data.data,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_DASHBOARD_XHH_DATA_ERROR
            });
        });
    };
}




