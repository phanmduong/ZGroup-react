import React from 'react';
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import CardChart from "./CardChart";
import PropTypes from 'prop-types';

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
            let summary = helper.groupBy(this.props.summary, item => item.campaign.id, ["campaign_id", "registers"]);
            return (
                <div className="row">
                    {
                        summary.map((item) => {
                            return (
                                <CardChart
                                    key={item.campaign_id}
                                    campaign={item}
                                />
                            );
                        })
                    }
                </div>
            );
        }
    }
}

SummaryMaketingCampaignComponent.propTypes = {
    summary: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadSummary: PropTypes.func.isRequired,
};

export default SummaryMaketingCampaignComponent;
