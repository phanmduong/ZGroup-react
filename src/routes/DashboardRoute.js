import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";
import TypeDashboard from "../modules/dashboard/TypeDashboard";
import DashboardStaffContainer from "../modules/dashboardStaff/DashboardStaffContainer";
import DashboardTrongDongContainer from "../modules/dashboardTrongDong/DashboardTrongDongContainer";
import LogRegisterRoom from "../modules/logRegisterRoom/LogRegisterRoom";
import DashboardStudyPackContainer from "../modules/dashboardStudyPack/DashboardContainer";
import AnalyticsContainer from "../modules/analytics/AnalyticsContainer";
import AnalyticsBlogsContainer from "../modules/analytics/analyticsBlogs/AnalyticsBlogsContainer";

/**
 * Tab trang chủ
 */
export default [
    {
        path: "/",
        component: TypeDashboard
    },
    {
        path: "/dashboard",
        component: TypeDashboard
    },
    {
        path: "/dashboard/it",
        component: DashboardItContainer
    },
    {
        path: "/dashboard/study-pack",
        component: DashboardStudyPackContainer
    },
    {
        path: "/dashboard/staff",
        component: DashboardStaffContainer
    },
    {
        path: "/dashboard/view-register",
        component: DashboardTrongDongContainer
    },
    {
        path: "/dashboard/analytics",
        component: AnalyticsContainer,
    },
    {
        path: "/dashboard/analytics/blog",
        component: AnalyticsBlogsContainer,
    },
    {
        path: "/dashboard/log-register-room",
        component: LogRegisterRoom
    }
];
