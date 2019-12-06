import loginReducer from "../modules/login/loginReducer";
import tabsReducer from "../modules/tab/tabsReducer";
import notificationReducer from "../modules/notification/notificationReducer";
import globalLoadingReducer from "../modules/globalLoading/globalLoadingReducer";
import firstLoginReducer from "../modules/firstLogin/firstLoginReducer";
import studentReducer from "../modules/infoStudent/studentReducer";
import createRegister from "../modules/registerStudents/createRegisterReducer";

export default {
    globalLoading: globalLoadingReducer,
    login: loginReducer,
    tabs: tabsReducer,
    notification: notificationReducer,
    firstLogin: firstLoginReducer,
    infoStudent: studentReducer,
    createRegister: createRegister,
};
