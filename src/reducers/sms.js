import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import smsCampaignReducer from "../modules/campaign/campaignReducer";

const appReducer = combineReducers({
    ...commonReducer,
    smsCampaign: smsCampaignReducer,

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }
    return appReducer(state, action);
};

export default rootReducer;
