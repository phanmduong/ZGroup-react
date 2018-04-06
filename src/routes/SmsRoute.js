import CampaignContaier from '../modules/campaign/CampaignContainer';
import CampaignComponent from '../modules/campaign/CampaignComponent';
import HistoryComponent from '../modules/campaign/HistoryComponent';
import ReceiversComponent from '../modules/campaign/ReceiversComponent';
// import CampaignListContainer from "../modules/campaignList/CampaignListContainer";

/**
 * Tab Quản lý tin nhắn Sms
 */
export default [
    {
        path: "/sms/campaign-list",
        // component: CampaignListContainer
    },
    {
        path: "/sms/campaign",
        component: CampaignContaier,
        type: "create",
        children: [
            {
                path: "/",
                component: CampaignComponent
            },
            {
                path: "receivers",
                component:ReceiversComponent
            },
            {
                path: "history",
                component:HistoryComponent
            }
        ]
                // component:
            },
        ];

