import ManageRequestContainer from "../modules/Zgroup/request/ManageRequestContainer";
// import CreateRequestVacationContainer from "../modules/Zgroup/request/requestVacation/CreateRequestVacationContainer";
import WeekendReportContainer from "../modules/Zgroup/weekendReport/WeekendReportContainer";
import AddReportContainer from "../modules/Zgroup/weekendReport/AddReportContainer";

/**
 * Tab Hanh Chinh
 */
export default [
    {
        path: "/administration/manage",
        component: ManageRequestContainer,
    },
    {
        path: "/administration/weekend-report",
        component: WeekendReportContainer,
    },
    {
        path: "/administration/weekend-report/create",
        component: AddReportContainer,
    },
    {
        path: "/administration/weekend-report/edit/:reportId",
        component: AddReportContainer,
    },
];
//path: "/sms/campaign-detail/:campaignId",