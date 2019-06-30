import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import leadReducer from "../modules/lead/leadReducer";
import createRegister from "../modules/registerStudents/createRegisterReducer";

const appReducer = combineReducers({
    ...commonReducer,
    lead: leadReducer,
    createRegister: createRegister
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
