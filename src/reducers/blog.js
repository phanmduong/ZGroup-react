import { combineReducers } from "redux";
import { LOG_OUT } from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import blogReducer from "../modules/blog/blogReducer";
import blogTypeReducer from "../modules/blogType/blogTypeReducer";
const appReducer = combineReducers({
    ...commonReducer,
    blog: blogReducer,
    blogType: blogTypeReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
