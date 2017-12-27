import DashboardContainer from "../modules/dashboard/DashboardContainer";
import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";

/**
 * Tab trang chủ
 */
export default [
    {
        path: "/",
        component: DashboardContainer
    },
    {
        path: "/dashboard",
        component: DashboardContainer
    },
    {
        path: "/dashboard/it",
        component: DashboardItContainer
    }
];
