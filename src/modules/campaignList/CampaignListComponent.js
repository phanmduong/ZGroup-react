import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import TooltipButton from '../../components/common/TooltipButton';
import Switch from '../../components/common/Switch';

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
							<th />
							<th>Tên chiến dịch</th>
							<th>Mô tả ngắn</th>
							<th>Số tin đã gửi</th>
							<th>Ngân sách</th>
							<th>Trạng thái</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{this.props.campaigns &&
							this.props.campaigns.map((campaign, index) => {
								const name =
									campaign.name.length < 15
										? campaign.name
										: campaign.name.substring(0, 14) + '...';
								const image = campaign.user.avatar_url
									? campaign.user.avatar_url.substring(0, 4) === 'http'
										? campaign.user.avatar_url
										: 'http://' + campaign.user.avatar_url
									: 'http://farm9.staticflickr.com/8130/29541772703_6ed8b50c47_b.jpg';
								const description =
									campaign.description.length < 25
										? campaign.description
										: campaign.description.substring(0, 24) + '...';
								return (
									<tr key={index}>
										<td>
											<TooltipButton text={campaign.user.name} placement="top">
												<img
													style={{
														width: '30px',
														height: '30px',
														borderRadius: '50%',
														verticalAlign: 'middle',
														background:
															'url(' + image + ') center center / cover',
														display: 'inline-block',
														float: 'right',
														marginLeft: '3px'
													}}
													data-toggle="tooltip"
													title=""
													type="button"
													rel="tooltip"
													data-original-title=""
												/>
											</TooltipButton>
										</td>
										<td>
											<TooltipButton text={campaign.name} placement="top">
												<Link
													to={`/sms/campaign-detail/${campaign.id}`}
													className="text-name-student-register"
													rel="tooltip"
													title=""
													data-original-title="Remove item">
													{name}
												</Link>
											</TooltipButton>
										</td>
										<td>
											<TooltipButton text={campaign.description} placement="top">
												<span>{description}</span>
											</TooltipButton>
										</td>
										<td>
											<div>
												<h7>
													{campaign.sent_quantity}/{campaign.needed_quantity}
												</h7>
												<div
													className="progress"
													style={{
														position: 'relative',
														left: 0,
														bottom: 0,
														width: '100%',
														zIndex: '100',
														marginBottom: '0'
													}}>
													<div
														className="progress-bar"
														role="progressbar"
														aria-valuenow="70"
														aria-valuemin="0"
														aria-valuemax="100"
														style={{ width: `${50}%` }}>
														<span className="sr-only">{50}% Complete</span>
													</div>
												</div>
											</div>
										</td>
										<td>1.000.000</td>
										<td>
											<Switch
												onChange={(value) =>
													this.props.changeCampaignStatus(campaign.id, value)}
												value={campaign.status === 'open'}
											/>
										</td>
										<td>
											<div className="btn-group-action">
												<a
													style={{ color: '#878787' }}
													data-toggle="tooltip"
													title=""
													type="button"
													rel="tooltip"
													data-original-title="Xoá"
													onClick={() =>
														this.props.showCreateEditCampaignModal(campaign)}>
													<i className="material-icons">edit</i>
												</a>
											</div>
										</td>
									</tr>
								);
							})}
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
