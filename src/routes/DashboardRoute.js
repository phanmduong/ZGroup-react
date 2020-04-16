import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";
import DashboardStaffContainer from "../modules/dashboardStaff/DashboardStaffContainer";
import DashboardTrongDongContainer from "../modules/dashboardTrongDong/DashboardTrongDongContainer";
import LogRegisterRoom from "../modules/logRegisterRoom/LogRegisterRoom";
import DashboardStudyPackContainer from "../modules/dashboardStudyPack/DashboardContainer";
import SettingContainer from "../modules/setting/SettingContainer";
import DashboardMarketingContainer from "../modules/dashboard/dashboardMarketing/DashboardMarketingContainer";
import DashboardLeadsComponent from "../modules/dashboard/dashboardMarketing/DashboardLeadsComponent";
import DashboardRegisterComponent from "../modules/dashboard/dashboardSale/DashboardRegisterComponent";
import DashboardKpiComponent from "../modules/dashboard/dashboardSale/DashboardKpiComponent";
import DashboardClassComponent from "../modules/dashboard/dashboardSale/DashboardClassComponent";
import DashboardSaleContainer from "../modules/dashboard/dashboardSale/DashboardSaleContainer";
import DashboardCourseComponent from "../modules/dashboard/dashboardSale/DashboardCourseComponent";


/**
 * Tab trang chủ
 */
export default [
    {
        path: "/dashboard/sale",
        component: DashboardSaleContainer,
        children: [
            {
                path: "/",
                component: DashboardRegisterComponent,
            },
            {
                path: "kpi",
                component: DashboardKpiComponent,
            },
            {
                path: "class",
                component: DashboardClassComponent,
            },
            {
                path: "course",
                component: DashboardCourseComponent,
            },
        ]
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
    {
        path: "/dashboard/marketing",
        component: DashboardMarketingContainer,
        children: [
            {
                path: "/",
                component: DashboardLeadsComponent,
            },
        ]
    },

];
