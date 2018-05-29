import { combineReducers } from "redux";
import { LOG_OUT } from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import requestReducer from "../modules/Zgroup/request/requestReducer";
import weekendReportReducer from "../modules/Zgroup/weekendReport/weekendReportReducer";
import ProposePaymentReducer from "../modules/Zgroup/proposePaymentAdministration/ProposePaymentReducer";
import billReducer from "../modules/Zgroup/bill/billReducer";


const appReducer = combineReducers({
    ...commonReducer,
    //other reducer
    weekendReport: weekendReportReducer,
    request: requestReducer,
    payment: ProposePaymentReducer,
    bill: billReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
