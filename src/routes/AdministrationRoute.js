import WeekendReportContainer from "../modules/Zgroup/weekendReport/WeekendReportContainer";
import AddReportContainer from "../modules/Zgroup/weekendReport/AddReportContainer";

/**
 * Tab Hanh Chinh
 */
export default [
    {
        path: "/administration/weekend-report",
        component: WeekendReportContainer
    },
    {
        path:"/administration/weekend-report/add-report",
        component: AddReportContainer
    }
];
