import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import goodOrdersReducer from "../modules/goodOrders/goodOrdersReducer";
import dashboardXHHReducer from "../modules/dashboardXHH/dashboardXHHReducer";
import DashBoardUpReducer from "../modules/dashboardUp/DashBoardUpReducer";
import dashboardReducer from "../modules/dashboard/dashboardReducer";
import seatReducer from "../modules/bases/seat/seatReducer";
import taskReducer from "../modules/tasks/taskReducer";
import loginReducer from "../modules/login/loginReducer";

const appReducer = combineReducers({
    ...commonReducer,
    goodOrders: goodOrdersReducer,
    dashboardXHH: dashboardXHHReducer,
    dashboard: dashboardReducer,
    seat: seatReducer,
    dashboardUp: DashBoardUpReducer,
    task: taskReducer,
    login: loginReducer,
});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
