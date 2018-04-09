import ManageRequestContainer from "../modules/Zgroup/request/ManageRequestContainer";
import CreateRequestVacationContainer from "../modules/Zgroup/request/requestVacation/CreateRequestVacationContainer";
import CreateRequestMoneyContainer from "../modules/Zgroup/request/requestMoney/RequestMoneyContainer";
import WeekendReportContainer from "../modules/Zgroup/weekendReport/WeekendReportContainer";
import AddReportContainer from "../modules/Zgroup/weekendReport/AddReportContainer";

/**
 * Tab Hanh Chinh
 */
export default [
    {
        path: "/administration/request/money/create",
        component: CreateRequestMoneyContainer,
    },
    {
        path: "/administration/request/vacation/create",
        component: CreateRequestVacationContainer,
    },
    {
        path: "/administration/request/manage",
        component: ManageRequestContainer,
    },
    {
        path: "/administration/weekend-report",
        component: WeekendReportContainer,
    },
    {
        path: "/administration/weekend-report/add-report",
        component: AddReportContainer,
    },
];
