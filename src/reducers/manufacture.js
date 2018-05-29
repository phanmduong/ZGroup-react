import { combineReducers } from "redux";
import { LOG_OUT } from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import taskReducer from "../modules/tasks/taskReducer";
import goodReducer from "../modules/good/goodReducer";
import cardFilterReducer from "../modules/tasks/board/filter/cardFilterReducer";
import bookReducer from "../modules/book/bookReducer";

const appReducer = combineReducers({
    ...commonReducer,
    task: taskReducer,
    book: bookReducer,
    good: goodReducer,
    cardFilter: cardFilterReducer
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
