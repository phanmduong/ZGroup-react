import * as types from './campaignListActionTypes';
import * as campaignListApi from './campaignListApi';

export function getCampaignList(search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CAMPAIGN_LIST
        });
        campaignListApi.getCampaignListApi(search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CAMPAIGN_LIST_SUCCESS,
                    campaigns: res.data.campaigns,
                    totalCount: res.data.paginator.total_count,
                    totalPages: res.data.paginator.total_pages,
                    currentPage: res.data.paginator.current_page,
                    limit: res.data.paginator.limit
                });
            });
    };
}