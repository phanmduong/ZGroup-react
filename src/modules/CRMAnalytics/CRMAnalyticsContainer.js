import React from 'react';
import PyramidChart from "../../components/common/pyramidChart/PyramidChart";
import {observer} from "mobx-react";
import store from './crmAnalyticsStore';
import Loading from "../../components/common/Loading";

@observer
class CRMAnalytics extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadAnalytics();
    }

    render() {
        return (

            <div className="card">
                <div className="card-content">
                    <h4 className="card-title">
                        Phân tích người dùng
                    </h4>
                    {
                        store.isLoading ? <Loading/> :
                            <PyramidChart id={"crm-analtics-chart"} data={store.analyticsData}/>
                    }
                </div>
            </div>

        );
    }
}

export default CRMAnalytics;