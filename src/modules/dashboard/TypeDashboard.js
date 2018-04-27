/**
 * Created by phanmduong on 9/3/17.
 */
import React from "react";
import DashboardContainer from "./DashboardContainer";
import OrdersContainer from "../eCommerceDashboard/OrdersContainer";
import DashboardXHHContainer from "../dashboardXHH/DashboardXHHContainer";
import DashBoardUpContainer from "../dashboardUp/DashBoardUpContainer";
// import DashboardTrongDong from "../dashboardTrongDong/DashboardTrongDongContainer";

/*eslint-disable */
class TypeDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    // case "trongdongpalace":
    // return <DashboardTrongDong />;
    render() {
        switch (env.TYPE_DASHBOARD) {
            case "e-commerce":
                return <OrdersContainer />;
            case "xhh":
                return <DashboardXHHContainer />;
            case "UpCowoking-space":
                return <DashBoardUpContainer />;
           
            default:
                return <DashboardContainer />;
        }
    }
}

export default TypeDashboard;
