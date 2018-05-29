import React from 'react';
import {observer} from "mobx-react";
import store from './crmClientStore';
import Loading from "../../components/common/Loading";
import Select from "../../components/common/Select";
import ListClient from "./ListClient";
import {CRM_TYPE_CLIENT} from "../../constants/constants";

@observer
class CRMClientContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadCampaigns();
    }

    onChangeCampaign = (value) => {
        store.selectedCampaignId = value;
        store.currentPage = 1;
        store.loadClients();
    };

    onChangeTypeClient = (value) => {
        store.selectedTypeClient = value;
        store.currentPage = 1;
        store.loadClients();
    };

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
                            <div className="col-sm-4 col-xs-6">
                                <Select
                                    defaultMessage={"Chọn phân loại"}
                                    options={CRM_TYPE_CLIENT}
                                    value={store.selectedTypeClient}
                                    onChange={this.onChangeTypeClient}
                                />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-content">
                                <h4 className="card-title">
                                    Khách hàng
                                </h4>
                                <ListClient/>
                            </div>
                        </div>
                    </div>
                }
            </div>


        );
    }
}

export default CRMClientContainer;