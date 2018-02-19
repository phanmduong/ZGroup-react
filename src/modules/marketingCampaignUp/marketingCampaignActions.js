import * as types from '../../constants/actionTypes';
import * as marketingCampaignApi from './marketingCampaignApi';


export function loadMarketingCampaigns(page) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_MARKETING_CAMPAIGNS});
        marketingCampaignApi.loadMarketingEmail(page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_MARKETING_CAMPAIGNS_SUCCESS,
                    marketingCampaigns: res.data.marketing_campaigns,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_MARKETING_CAMPAIGNS_ERROR
            });
        });
    };
}

// export function loadAllCourse() {
//     return function (dispatch) {
//         dispatch({type: types.BEGIN_LOAD_COURSES_MARKETING_CAMPAIGNS});
//         marketingCampaignApi.loadAllCourses()
//             .then((res) => {
//                 dispatch({
//                     type: types.LOAD_COURSES_MARKETING_CAMPAIGNS_SUCCESS,
//                     courses: res.data.data.courses,
//                 });
//             }).catch(() => {
//             dispatch({
//                 type: types.LOAD_COURSES_MARKETING_CAMPAIGNS_ERROR
//             });
//         });
//     };
// }

export function storeMarketingCampaign(marketingCampaign, closeModal) {
    let isEdit = !!marketingCampaign.id;
    return function (dispatch) {
        dispatch({type: types.BEGIN_STORE_MARKETING_CAMPAIGN});
        marketingCampaignApi.storeMarketingCampaign(marketingCampaign)
            .then((res) => {
                closeModal();
                dispatch({
                    type: types.STORE_MARKETING_CAMPAIGN_SUCCESS,
                    marketingCampaign: res.data.data.marketing_campaign,
                    isEdit: isEdit,
                });
            }).catch(() => {
            dispatch({
                type: types.STORE_MARKETING_CAMPAIGN_ERROR
            });
        });
    };
}

