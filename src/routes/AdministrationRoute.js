
import ManageRequestContainer from "../modules/Zgroup/request/ManageRequestContainer";
import CreateRequestVacationContainer from "../modules/Zgroup/request/requestVacation/CreateRequestVacationContainer";
import WeekendReportContainer from "../modules/Zgroup/weekendReport/WeekendReportContainer";
import AddReportContainer from "../modules/Zgroup/weekendReport/AddReportContainer";


/**
 * Tab Hanh Chinh
 */
export default [
    { 
        path: "/administration/manage",
        component: ManageRequestContainer
    },
    { 
        path: "/administration/request/vacation",
        component: CreateRequestVacationContainer
    },
    {
        path: "/administration/weekend-report",
        component: WeekendReportContainer
    },
    {
        path:"/administration/weekend-report/add-report",
        component: AddReportContainer
    }
];
