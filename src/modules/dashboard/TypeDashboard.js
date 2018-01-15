/**
 * Created by phanmduong on 9/3/17.
 */
import React from 'react';
import DashboardContainer from "./DashboardContainer";
import OrdersContainer from "../eCommerceDashboard/OrdersContainer";
import DashboardXHHContainer from "../dashboardXHH/DashboardXHHContainer";

/*eslint-disable */
class TypeDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        switch (env.TYPE_DASHBOARD) {
            case 'e-commerce':
                return <OrdersContainer/>;
            case 'xhh':
                return <DashboardXHHContainer/>;
            default:
                return <DashboardContainer/>
        }
    }
}


export default TypeDashboard;
