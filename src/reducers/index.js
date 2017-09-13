import {combineReducers} from 'redux';
import loginReducer from '../modules/login/loginReducer';
import tabsReducer from '../modules/tab/tabsReducer';
import staffsReducer from '../modules/manageStaff/staffsReducer';
import rolesReducer from '../modules/role/rolesReducer';
import baseListReducer from '../modules/bases/baseListReducer';
import * as types from '../constants/actionTypes';
import taskReducer from "../modules/tasks/taskReducer";
import registerReducer from "../modules/registerStudents/registerReducer";
import emailTemplatesReducer from "../modules/emailTemplates/emailTemplatesReducer";
import emailFormsReducer from "../modules/emailForms/emailFormsReducer";
import blogReducer from '../modules/blog/blogReducer';
import profileReducer from '../modules/profile/profileReducer';
import studySessionReducer from '../modules/studySession/studySessionReducer';
import scheduleClassReducer from '../modules/scheduleClass/scheduleClassReducer';
import gensReducer from '../modules/gens/gensReducer';
import studentReducer from '../modules/infoStudent/studentReducer';
import personalCalendarReducer from '../modules/tasks/calendar/personalCalendarReducer';
import dashboardReducer from '../modules/dashboard/dashboardReducer';
import notificationReducer from '../modules/notification/notificationReducer';
import collectMoneyReducer from '../modules/collectMoney/collectMoneyReducer';
import historyCollectMoneyReducer from '../modules/historyCollectMoney/historyCollectMoneyReducer';
import historyCallsReducer from '../modules/historyCalls/historyCallsReducer';
import classesReducer from '../modules/classes/classesReducer';
import ruleReducer from '../modules/rule/ruleReducer';

const appReducer = combineReducers({
    login: loginReducer,
    tabs: tabsReducer,
    staffs: staffsReducer,
    roles: rolesReducer,
    baseList: baseListReducer,
    task: taskReducer,
    emailTemplates: emailTemplatesReducer,
    emailForms: emailFormsReducer,
    blog: blogReducer,
    registerStudents: registerReducer,
    profile: profileReducer,
    studySession: studySessionReducer,
    scheduleClass: scheduleClassReducer,
    gens: gensReducer,
    infoStudent: studentReducer,
    personalCalendar: personalCalendarReducer,
    dashboard: dashboardReducer,
    notification: notificationReducer,
    collectMoney: collectMoneyReducer,
    historyCollectMoney: historyCollectMoneyReducer,
    historyCalls: historyCallsReducer,
    classes: classesReducer,
    rule: ruleReducer,
});

const rootReducer = (state, action) => {
    if (action.type === types.LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
