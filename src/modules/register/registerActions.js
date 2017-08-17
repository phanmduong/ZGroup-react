/**
 * Created by phanmduong on 4/6/17.
 */
// import * as types from '../../constants/actionTypes';
// import * as configApi from './configApi';
// import {browserHistory} from "react-router";
// import {showNotification} from "../../helpers/helper";

// import _ from 'lodash';

// export function loadClientConfigs(clientId, page = 1, query = null) {
//     return function (dispatch) {
//         dispatch({
//             type: types.BEGIN_LOAD_CLIENT_CONFIGS
//         });

// configApi.loadClientConfigs(clientId, page, query).then(function (res) {
//     dispatch({
//         type: types.LOAD_CLIENT_CONFIGS_SUCCESS,
//         clientConfigs: res.data.client_configs,
//         currentPage: res.data.paginator.current_page,
//         totalPages: res.data.paginator.total_pages
//     });
// }).catch(error => {
//     console.error(error);
// });

//     };
// }
