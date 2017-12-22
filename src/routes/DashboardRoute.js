// import BasesContainer from "../modules/bases/BasesContainer";
// import RoomsContainer from "../modules/rooms/RoomsContainer";
// import CreateBaseContainer from "../modules/bases/CreateBaseContainer";
import DashboardContainer from "../modules/dashboard/DashboardContainer";

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
    }
];
