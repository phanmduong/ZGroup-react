import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router";

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
                                    </td>
                                    <td>
                                        <Link to={``}
                                              className="text-name-student-register"
                                              rel="tooltip" title=""
                                              data-original-title="Remove item">
                                            {name}
                                        </Link>
                                    </td>
                                    <td>
                                        {description}
                                    </td>
                                    <td>fuck</td>
                                    <td>
                                        fuck
                                    </td>
                                    <td>
                                        {campaign.status}
                                    </td>
                                    <td>
                                        <Link to={`/good/product/${campaign.id}/edit`}
                                              style={{color: "#878787"}}
                                              data-toggle="tooltip" title=""
                                              type="button" rel="tooltip"
                                              data-original-title="Sửa"><i
                                            className="material-icons">edit</i>
                                        </Link>
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
    campaigns: PropTypes.array.isRequired
};

export default CampaignListComponent;