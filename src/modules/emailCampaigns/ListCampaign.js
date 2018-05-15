import React from 'react';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import {Link} from 'react-router';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class ListCampaign extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Tên</th>
                        <th>Người tạo</th>
                        <th>Sended/Total</th>
                        <th>Delivery/Sended</th>
                        <th>Open/Delivery</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.campaigns.map((campaign, index) => {
                            let btn = 'btn-default';
                            let title = "Chưa gửi";

                            if (campaign.send_status === 1) {
                                btn = 'btn-success';
                                title = "Đã gửi";
                            }
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className="container-call-status">
                                            <button
                                                className={"btn btn-round " + btn + " none-padding size-40-px"}
                                                data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                data-original-title={title}>
                                                <i className="material-icons">
                                                    mail
                                                </i>
                                            </button>

                                        </div>
                                    </td>
                                    <td>{campaign.name}</td>
                                    <td>
                                        <Link className="btn btn-xs btn-main"
                                              style={{backgroundColor: '#' + campaign.owner.color}}
                                              to={"/email/campaigns/" + campaign.owner.id}
                                        >
                                            {helper.getShortName(campaign.owner.name)}
                                            <div className="ripple-container"/>
                                        </Link>
                                    </td>
                                    <td>
                                        {campaign.total ?
                                            (
                                                <div>
                                                    <h6>{campaign.sended + "/" + campaign.total}</h6>
                                                    <div
                                                        className="progress progress-line-danger progress-bar-table full-width">
                                                        <div className="progress-bar" role="progressbar"
                                                             aria-valuenow="60"
                                                             aria-valuemin="0"
                                                             aria-valuemax="100"
                                                             style={{width: campaign.sended * 100 / campaign.total + "%"}}>
                                                <span
                                                    className="sr-only">{campaign.sended * 100 / campaign.total}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <div>Chưa chọn danh sách</div>
                                            )

                                        }

                                    </td>
                                    <td>
                                        <h6>{campaign.delivery + "/" + campaign.sended}</h6>
                                        <div
                                            className="progress progress-line-danger progress-bar-table full-width">
                                            <div className="progress-bar" role="progressbar"
                                                 aria-valuenow="60"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style={{width: campaign.delivery * 100 / campaign.sended + "%"}}>
                                                <span
                                                    className="sr-only">{campaign.delivery * 100 / campaign.sended}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <h6>{campaign.open + "/" + campaign.delivery}</h6>
                                        <div
                                            className="progress progress-line-danger progress-bar-table full-width">
                                            <div className="progress-bar" role="progressbar"
                                                 aria-valuenow="60"
                                                 aria-valuemin="0"
                                                 aria-valuemax="100"
                                                 style={{width: campaign.open * 100 / campaign.delivery + "%"}}>
                                                <span
                                                    className="sr-only">{campaign.open * 100 / campaign.delivery}%</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td><ButtonGroupAction
                                        edit={() => this.props.openModal(campaign)}
                                        delete={this.props.deleteCampaign}
                                        object={campaign}
                                        disabledDelete={Boolean(campaign.send_status)}
                                        disabledEdit={Boolean(campaign.send_status)}
                                    /></td>
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

ListCampaign.propTypes = {
    openModal: PropTypes.func.isRequired,
    deleteCampaign: PropTypes.func.isRequired,
    campaigns: PropTypes.array.isRequired
};


export default ListCampaign;
