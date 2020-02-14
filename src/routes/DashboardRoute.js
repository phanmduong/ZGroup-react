import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";
import TypeDashboard from "../modules/dashboard/TypeDashboard";
import DashboardStaffContainer from "../modules/dashboardStaff/DashboardStaffContainer";
import DashboardTrongDongContainer from "../modules/dashboardTrongDong/DashboardTrongDongContainer";
import LogRegisterRoom from "../modules/logRegisterRoom/LogRegisterRoom";
import DashboardStudyPackContainer from "../modules/dashboardStudyPack/DashboardContainer";
import SettingContainer from "../modules/setting/SettingContainer";


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
        path: "/dashboard/log-register-room",
        component: LogRegisterRoom
    },
    {
        path: "/setting",
        component: SettingContainer
    },
];
