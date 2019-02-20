import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import goodOrdersReducer from "../modules/goodOrders/goodOrdersReducer";
import dashboardXHHReducer from "../modules/dashboardXHH/dashboardXHHReducer";
import DashBoardUpReducer from "../modules/dashboardUp/DashBoardUpReducer";
import dashboardReducer from "../modules/dashboard/dashboardReducer";
import dashboardStudyPackReducer from "../modules/dashboardStudyPack/dashboardReducer";
import seatReducer from "../modules/bases/seat/seatReducer";
import taskReducer from "../modules/tasks/taskReducer";
import blogReducer from "../modules/analytics/analyticsBlogs/blogReducer";

const appReducer = combineReducers({
    ...commonReducer,
    goodOrders: goodOrdersReducer,
    dashboardXHH: dashboardXHHReducer,
    dashboard: dashboardReducer,
    dashboardStudyPack: dashboardStudyPackReducer,
    seat: seatReducer,
    dashboardUp: DashBoardUpReducer,
    blog: blogReducer,
    task: taskReducer
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
