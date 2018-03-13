import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";
import TypeDashboard from "../modules/dashboard/TypeDashboard";

/**
 * Tab trang chủ
 */
export default [
    {
        path: "/",
        component: TypeDashboard,
    },
    {
        path: "/dashboard",
        component: TypeDashboard,
    },
    {
        path: "/dashboard/it",
        component: DashboardItContainer,
    },
];
