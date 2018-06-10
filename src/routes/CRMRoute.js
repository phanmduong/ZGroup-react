import CRMAnalyticsContainer from "../modules/CRMAnalytics/CRMAnalyticsContainer";
import CRMClientContainer from "../modules/CRMClient/CRMClientContainer";


export default [
    {
        path: "/crm/analytics",
        component: CRMAnalyticsContainer,
    },
    {
        path: "/crm/clients",
        component: CRMClientContainer,
    },
];
