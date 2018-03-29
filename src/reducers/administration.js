import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
<<<<<<< HEAD
import requestReducer from "../modules/Zgroup/request/requestReducer";
=======
import weekendReportReducer from "../modules/Zgroup/weekendReport/weekendReportReducer";

>>>>>>> f38c10a6895737ad8969277e0f1b83035ce73408

const appReducer = combineReducers({
    ...commonReducer,
    weekendReport: weekendReportReducer
    //other reducer
    request: requestReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
