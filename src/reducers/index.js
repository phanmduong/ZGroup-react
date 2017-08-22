import {combineReducers} from 'redux';
import loginReducer from '../modules/login/loginReducer';
import tabsReducer from '../modules/tab/tabsReducer';
import staffsReducer from '../modules/manageStaff/staffsReducer';
import rolesReducer from '../modules/role/rolesReducer';
import baseListReducer from '../modules/bases/baseListReducer';
import * as types from '../constants/actionTypes';
import taskReducer from "../modules/tasks/taskReducer";
import registerReducer from "../modules/register/registerReducer";

const appReducer = combineReducers({
    login: loginReducer,
    tabs: tabsReducer,
    staffs: staffsReducer,
    roles: rolesReducer,
    baseList: baseListReducer,
    task: taskReducer,
    register: registerReducer
});

const rootReducer = (state, action) => {
    if (action.type === types.LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
