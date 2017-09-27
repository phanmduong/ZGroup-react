import * as types from '../../constants/actionTypes';
import * as emailCampaignApi from './emailCampaignApi';
// import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */
export function loadCampaigns(page, search, ownerId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_CAMPAIGNS,
        });
        emailCampaignApi.loadCampaigns(page, search, ownerId)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_CAMPAIGNS_SUCCESS,
                    campaigns: res.data.campaigns,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_CAMPAIGNS_ERROR,
                });
            });
    };
}
