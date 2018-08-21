import loginReducer from "../modules/login/loginReducer";
import tabsReducer from "../modules/tab/tabsReducer";
import notificationReducer from "../modules/notification/notificationReducer";
import globalLoadingReducer from "../modules/globalLoading/globalLoadingReducer";
import firstLoginReducer from "../modules/firstLogin/firstLoginReducer";

export default {
    globalLoading: globalLoadingReducer,
    login: loginReducer,
    tabs: tabsReducer,
    notification: notificationReducer,
    firstLogin: firstLoginReducer,
};
