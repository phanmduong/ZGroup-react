import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import historyCallsReducer from "../modules/historyCalls/historyCallsReducer";

const appReducer = combineReducers({
    ...commonReducer,
    historyCalls: historyCallsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
