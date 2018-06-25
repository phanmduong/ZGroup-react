import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";
import TypeDashboard from "../modules/dashboard/TypeDashboard";
import DashboardStaffContainer from "../modules/dashboardStaff/DashboardStaffContainer";
import DashboardTrongDongContainer from "../modules/dashboardTrongDong/DashboardTrongDongContainer";
import LogRegisterRoom from "../modules/logRegisterRoom/LogRegisterRoom";

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
  }
];
