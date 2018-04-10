import RequestMoneyContainer from "../modules/Zgroup/request/requestMoney/RequestMoneyContainer";
import RequestVacationContainer from "../modules/Zgroup/request/requestVacation/RequestVacationContainer";
import CreateRequestVacationContainer from "../modules/Zgroup/request/requestVacation/CreateRequestVacationContainer";
import CreateRequestMoneyContainer from "../modules/Zgroup/request/requestMoney/CreateRequestMoneyContainer";
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
        path: "/administration/request/money/edit/:requestId",
        component: CreateRequestMoneyContainer,
    },
    {
        path: "/administration/request/vacation/create",
        component: CreateRequestVacationContainer,
    },
    {
        path: "/administration/request/vacation/edit/:requestId",
        component: CreateRequestVacationContainer,
    },
    {
        path: "/administration/request/money",
        component: RequestMoneyContainer,
    },
    {
        path: "/administration/request/vacation",
        component: RequestVacationContainer,
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
