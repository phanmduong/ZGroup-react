import React from 'react';
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import CardChart from "./CardChart";

class SummaryMaketingCampaignComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.loadSummary();
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Loading/>
            );
        } else {
            console.log(this.props.summary);
            let summary = helper.groupBy(this.props.summary, item => item.campaign.id, ["campaign_id", "registers"]);
            console.log(summary);
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">timeline</i>
                                </div>
                                <div className="card-content">
                                    <h4 className="card-title">Tổng kết chiến dịch Marketing
                                        <small/>
                                    </h4>
                                    <div className="row">
                                        {
                                            summary.map((item) => {
                                                return (
                                                    <CardChart
                                                        key={item.campaign_id}
                                                        campaign={item}
                                                        genId={this.props.genId}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default SummaryMaketingCampaignComponent;
