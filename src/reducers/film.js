import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import filmReducer from "../modules/film/filmReducer";
import sessionReducer from "../modules/session/sessionReducer";

const appReducer = combineReducers({
    ...commonReducer,
    film: filmReducer,
    session: sessionReducer,

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
