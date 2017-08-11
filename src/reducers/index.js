import {combineReducers} from 'redux';
import dashboardReducer from './dashboardReducer';
import loginReducer from './loginReducer';
import registerListReducer from './registerListReducer';
import genListReducer from './genListReducer';
import searchRegistersReducer from './searchRegistersReducer';
import tabsReducer from '../modules/tab/tabsReducer';
import staffsReducer from './staffsReducer';
import rolesReducer from './rolesReducer';
import baseReducer from './baseReducer';
import baseListReducer from '../modules/bases/baseListReducer';
import * as types from '../constants/actionTypes';
import taskReducer from "../modules/tasks/taskReducer";

const appReducer = combineReducers({
    dashboard: dashboardReducer,
    login: loginReducer,
    registerList: registerListReducer,
    genList: genListReducer,
    searchRegisters: searchRegistersReducer,
    tabs: tabsReducer,
    staffs: staffsReducer,
    roles: rolesReducer,
    bases: baseReducer,
    baseList: baseListReducer,
    task: taskReducer
});

const rootReducer = (state, action) => {
    if (action.type === types.LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
