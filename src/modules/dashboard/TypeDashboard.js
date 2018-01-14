/**
 * Created by phanmduong on 9/3/17.
 */
import React from 'react';
import DashboardContainer from "./DashboardContainer";
import OrdersContainer from "../eCommerceDashboard/OrdersContainer";

/*eslint-disable */
class TypeDashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        switch (env.TYPE_DASHBOARD) {
            case 'e-commerce':
                return <OrdersContainer/>;
            default:
                return <DashboardContainer/>
        }
    }
}


export default TypeDashboard;
