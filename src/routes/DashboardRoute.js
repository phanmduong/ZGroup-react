import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";
import TypeDashboard from "../modules/dashboard/TypeDashboard";
// import DashboardStaffContainer from "../modules/dashboardStaff/DashboardStaffContainer";

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
    // {
    //     path: "/dashboard/staff",
    //     component: DashboardStaffContainer,
    // },
];
