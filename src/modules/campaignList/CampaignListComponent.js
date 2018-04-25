import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router";
import TooltipButton from "../../components/common/TooltipButton";
import Switch from "../../components/common/Switch";

class CampaignListComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th/>
                        <th>Tên chiến dịch</th>
                        <th>Mô tả ngắn</th>
                        <th>Số tin đã gửi</th>
                        <th>Ngân sách</th>
                        <th>Trạng thái</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.campaigns && this.props.campaigns.map((campaign, index) => {
                            const name = campaign.name.length < 15 ? campaign.name : campaign.name.substring(0, 14) + "...";
                            const description = campaign.description.length < 25 ? campaign.description : campaign.description.substring(0, 24) + "...";
                            return (
                                <tr key={index}>
                                    <td>
                                        <TooltipButton text={campaign.user.name} placement="top">
                                            <img style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%",
                                                verticalAlign: "middle",
                                                background: "url(" + campaign.user.avatar_url + ") center center / cover",
                                                display: "inline-block",
                                                float: "right",
                                                marginLeft: "3px"
                                            }} data-toggle="tooltip" title="" type="button"
                                                 rel="tooltip"
                                                 data-original-title=""/>
                                        </TooltipButton>
                                    </td>
                                    <td>
                                        <TooltipButton text={campaign.name} placement="top">
                                            <Link to={`/sms/campaign-detail/${campaign.id}`}
                                                  className="text-name-student-register"
                                                  rel="tooltip" title=""
                                                  data-original-title="Remove item">
                                                {name}
                                            </Link>
                                        </TooltipButton>
                                    </td>
                                    <td>
                                        <TooltipButton text={campaign.description} placement="top">
                                            <span>
                                                {description}
                                                </span>
                                        </TooltipButton>
                                    </td>
                                    <td>
                                        <div>
                                            <h6>{campaign.sent_quantity}/{campaign.needed_quantity}</h6>
                                            <div className="progress progress-line-danger">
                                                <div className="progress-bar progress-bar-success"
                                                     style={{
                                                         width: (campaign.sent_quantity === 0) ? 0 :
                                                             campaign.sent_quantity * 100 / campaign.needed_quantity + '%'
                                                     }}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        fuck
                                    </td>
                                    <td>
                                        <Switch
                                            onChange={(value) => this.props.changeCampaignStatus(campaign.id, value)}
                                            value={(campaign.status === "open")}/>
                                    </td>
                                    <td>
                                        <a style={{color: "#878787"}}
                                           data-toggle="tooltip" title=""
                                           type="button" rel="tooltip"
                                           data-original-title="Xoá"
                                           onClick={() => this.props.showCreateEditCampaignModal(campaign)}>
                                            <i className="material-icons">edit</i>
                                        </a>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>

            </div>
        );
    }
}

CampaignListComponent.propTypes = {
    campaigns: PropTypes.array.isRequired,
    changeCampaignStatus: PropTypes.func.isRequired,
    showCreateEditCampaignModal: PropTypes.func.isRequired
};

export default CampaignListComponent;