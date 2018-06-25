import DashboardItContainer from "../modules/dashboard/it/DashboardItContainer";
import TypeDashboard from "../modules/dashboard/TypeDashboard";
import DashboardStaffContainer from "../modules/dashboardStaff/DashboardStaffContainer";
import DashboardTrongDongContainer from "../modules/dashboardTrongDong/DashboardTrongDongContainer";
<<<<<<< HEAD
=======
import LogRegisterRoom from "../modules/logRegisterRoom/LogRegisterRoom";
>>>>>>> 63b606cbe576e4a5ad2ba79693eb43a0da14ddb6

/**
 * Tab trang chủ
 */
export default [
<<<<<<< HEAD
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
    }
=======
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
>>>>>>> 63b606cbe576e4a5ad2ba79693eb43a0da14ddb6
];
