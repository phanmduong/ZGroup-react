import React from 'react';
import PyramidChart from "../../components/common/pyramidChart/PyramidChart";
import {observer} from "mobx-react";
import store from './crmAnalyticsStore';
import Loading from "../../components/common/Loading";
import Select from "../../components/common/Select";

@observer
class CRMAnalytics extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadCampaigns();
        store.loadAnalytics();
    }

    onChangeCampaign = (value) => {
        store.selectedCampaignId = value;
        store.loadAnalytics();
    }

    render() {
        return (
            <div>
                {store.isLoadingCampaigns ? <Loading/> :
                    <div>
                        <div className="row">
                            <div className="col-sm-4 col-xs-6">
                                <Select
                                    defaultMessage={"Chọn chiến dịch"}
                                    options={store.campaignsData}
                                    value={store.selectedCampaignId}
                                    onChange={this.onChangeCampaign}
                                />
                            </div>
                        </div>
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
                    </div>
                }
            </div>


        );
    }
}

export default CRMAnalytics;