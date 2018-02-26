import { combineReducers } from "redux";
import { LOG_OUT } from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import summaryMarketingCampaignUpReducer from "../modules/summaryMarketingCampaignUp/summaryMarketingCampaignUpReducer";

import historyCallsReducer from '../modules/historyCalls/historyCallsReducer';
import marketingCampaignsUpReducer from "../modules/marketingCampaignUp/marketingCampaignsUpReducer";
import summaryMarketingCampaignReducer from "../modules/summaryMarketingCampaign/summaryMarketingCampaignReducer";
import marketingCampaignsReducer from "../modules/marketingCampaign/marketingCampaignsReducer";
import summarySalesUpReducer from "../modules/summarySalesUp/summarySalesUpReducer";
import summarySalesReducer from "../modules/summarySales/summarySalesReducer";


const appReducer = combineReducers({
    ...commonReducer,
    historyCalls: historyCallsReducer,
    marketingCampaignUp: marketingCampaignsUpReducer,
    summaryMarketingCampaignUp: summaryMarketingCampaignUpReducer,
    summaryMarketingCampaign: summaryMarketingCampaignReducer,
    marketingCampaigns: marketingCampaignsReducer,
    summarySalesUp : summarySalesUpReducer,
    summarySales: summarySalesReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
