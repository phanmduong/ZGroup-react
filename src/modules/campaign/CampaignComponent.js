import React from 'react';
import Pagination from '../../components/common/Pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TooltipButton from '../../components/common/TooltipButton';
import { bindActionCreators } from 'redux';
import * as campaignAction from './campaignAction';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import { dotNumber } from '../../helpers/helper';

class CampaignComponent extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.campaignId = this.props.params.campaignId;
		this.state = {
			page: 1,
			query: ''
		};
		this.timeOut = null;
		this.loadOrders = this.loadOrders.bind(this);
		this.templatesSearchChange = this.templatesSearchChange.bind(this);
	}

	templatesSearchChange(value) {
		this.setState({
			query: value,
			page: 1
		});
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				this.props.campaignAction.loadAllMessage(this.campaignId, 1, value);
			}.bind(this),
			500
		);
	}

	loadOrders(page = 1) {
		this.setState({ page: page });
		this.props.campaignAction.loadAllMessage(this.campaignId, page, this.state.query);
	}

	render() {
		let first = this.props.totalCountMessage
			? (this.props.currentPageMessage - 1) * this.props.limitMessage + 1
			: 0;
		let end =
			this.props.currentPageMessage < this.props.totalPagesMessage
				? this.props.currentPageMessage * this.props.limitMessage
				: this.props.totalCountMessage;

		return (
			<div>
				<Search
					onChange={this.templatesSearchChange}
					value={this.state.query}
					placeholder="Nhập tên hoặc nội dung tin nhắn để tìm"
				/>
				<br />
				{this.props.isLoadingMessage ? (
					<Loading />
				) : (
					<div className="table-responsive">
						<table className="table table-hover">
							<thead className="text-rose">
								<tr className="text-rose">
									<th />
									<th>Tên tin nhắn</th>
									<th>Nội dung</th>
									<th>Sent/Total</th>
									<th>Ngày gửi</th>
									<th>Tạm tính</th>
									<th>Loại tin nhắn</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{this.props.allMessage &&
									this.props.allMessage.map((message, index) => {
										let a = message.name.slice(0, 15);
										let b = message.content.slice(0, 30);
										let btn = 'btn-default';
										let title = 'Chưa gửi';

										if (message.status === 'sent') {
											btn = 'btn-success';
											title = 'Đã gửi';
										}
										let percent = message.sent_quantity / message.total_quantity * 100;
										return (
											<tr key={index}>
												<td>
													<TooltipButton placement="top" text={title}>
														<div
															className="container-call-status"
															style={{ margin: '-15px 0 -15px 0' }}
														>
															<button
																className={
																	'btn btn-round ' + btn + ' none-padding size-40-px'
																}
																data-toggle="tooltip"
																title=""
																type="button"
																rel="tooltip"
																data-original-title={title}
															>
																<i className="material-icons">mail</i>
															</button>
														</div>
													</TooltipButton>
												</td>
												<td>
													<TooltipButton placement="top" text={message.name}>
														<b>{a.length < 15 ? a : a.concat('...')}</b>
													</TooltipButton>
												</td>
												<td>
													<TooltipButton placement="top" text={message.content}>
														<div>{b.length < 30 ? b : b.concat('...')}</div>
													</TooltipButton>
												</td>
												<td>
													<TooltipButton
														placement="top"
														text={`${message.sent_quantity} tin nhắn đã gửi`}
													>
														<div>
															<h7>
																{message.sent_quantity}/{message.total_quantity}
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
																}}
															>
																<div
																	className="progress-bar"
																	role="progressbar"
																	aria-valuenow="70"
																	aria-valuemin="0"
																	aria-valuemax="100"
																	style={{ width: `${percent}%` }}
																>
																	<span className="sr-only">{percent}% Complete</span>
																</div>
															</div>
														</div>
													</TooltipButton>
												</td>
												<td>{message.send_time}</td>
												<td>
													<TooltipButton placement="top" text={`Ngân sách`}>
														<div>{dotNumber(message.sent_quantity * 750)}vnđ</div>
													</TooltipButton>
												</td>
												<td>
													<span
														className="btn btn-main btn-sm"
														style={{
															backgroundColor: message.sms_template_type.color,
															margin: '-10px auto'
														}}
													>
														{message.sms_template_type.name}
													</span>
												</td>
												<td>
													<div className="btn-group-action">
														<div style={{ display: 'inline-block' }}>
															<TooltipButton placement="top" text={`Sửa`}>
																<a
																	onClick={() => {
																		this.props.campaignAction.showAddMessageModal();
																		this.props.campaignAction.upMessage({
																			...message,
																			sms_template_type_id:
																				message.sms_template_type.id
																		});
																	}}
																>
																	<i className="material-icons">edit</i>
																</a>
															</TooltipButton>
														</div>
														{/*Thao tác xóa tin nhắn*/}
														{/*<TooltipButton placement="top"*/}
														{/*text={`Xóa`}>*/}
														{/*<a><i className="material-icons">delete</i>*/}
														{/*</a></TooltipButton>*/}
													</div>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				)}

				<div className="row float-right">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'right' }}>
						<b style={{ marginRight: '15px' }}>
							Hiển thị kêt quả từ {first}
							- {end}/{this.props.totalCountMessage}
						</b>
						<br />
						<Pagination
							totalPages={this.props.totalPagesMessage}
							currentPage={this.props.currentPageMessage}
							loadDataPage={this.loadOrders}
						/>
					</div>
				</div>
			</div>
		);
	}
}

CampaignComponent.propTypes = {
	isLoadingMessage: PropTypes.bool.isRequired,
	limitMessage: PropTypes.number.isRequired,
	currentPageMessage: PropTypes.number.isRequired,
	totalPagesMessage: PropTypes.number.isRequired,
	totalCountMessage: PropTypes.number.isRequired,
	campaignAction: PropTypes.object.isRequired,
	allMessage: PropTypes.array.isRequired,
	params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		allMessage: state.smsCampaign.allMessage,
		totalPagesMessage: state.smsCampaign.totalPagesMessage,
		totalCountMessage: state.smsCampaign.totalCountMessage,
		currentPageMessage: state.smsCampaign.currentPageMessage,
		limitMessage: state.smsCampaign.limitMessage,
		isLoadingMessage: state.smsCampaign.isLoadingMessage
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignAction: bindActionCreators(campaignAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignComponent);
