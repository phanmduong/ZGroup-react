import { combineReducers } from "redux";
import { LOG_OUT } from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import collectMoneyReducer from "../modules/collectMoney/collectMoneyReducer";
import historyCollectMoneyReducer from "../modules/historyCollectMoney/historyCollectMoneyReducer";
import financeReducer from "../modules/finance/financeReducer";
import bankAccountReducer from "../modules/bankAccount/bankAccountReducer";
import currencyReducer from "../modules/currency/currencyReducer";
import passwordReducer from "../modules/password/passwordReducer";

const appReducer = combineReducers({
    ...commonReducer,
    passwordAccount: passwordReducer,
    currency: currencyReducer,
    bankAccount: bankAccountReducer,
    finance: financeReducer,
    collectMoney:collectMoneyReducer,
    historyCollectMoney:historyCollectMoneyReducer
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
