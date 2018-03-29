import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import weekendReportReducer from "../modules/Zgroup/weekendReport/weekendReportReducer";


const appReducer = combineReducers({
    ...commonReducer,
    weekendReport: weekendReportReducer
    //other reducer

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
