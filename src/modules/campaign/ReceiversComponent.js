import React from 'react';
import Pagination from '../../components/common/Pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TooltipButton from '../../components/common/TooltipButton';
import OverlappedCircles from '../../components/common/OverlappedCircles';
import * as campaignAction from './campaignAction';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import { confirm, definePhoneHead } from '../../helpers/helper';

class ReceiversComponent extends React.Component {
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
		this.removeUserFromCampaign = this.removeUserFromCampaign.bind(this);
		this.showHistoryDetailModal = this.showHistoryDetailModal.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.isChoosingReceivers !== this.props.isChoosingReceivers &&
			!nextProps.isChoosingReceivers
		) {
			this.setState({
				page: 1,
				query: ''
			});
			this.props.campaignAction.loadAllReceiver(this.props.params.campaignId, 1, '');
		}
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
				this.props.campaignAction.loadAllReceiver(this.campaignId, 1, value);
			}.bind(this),
			500
		);
	}

	loadOrders(page = 1) {
		this.setState({ page: page });
		this.props.campaignAction.loadAllReceiver(this.campaignId, page, this.state.query);
	}

	removeUserFromCampaign(user) {
		confirm('error', 'Xóa người dùng', 'Bạn có chắc muốn xóa người dùng này', () => {
			this.props.campaignAction.removeUserFromCampaign(this.campaignId, user);
		});
	}

	showHistoryDetailModal(user) {
		this.props.campaignAction.showHistoryDetailModal();
		this.props.campaignAction.getHistoryUser(user, this.campaignId, 1, '', null);
	}

	render() {
		let first = this.props.totalCountReceiver
			? (this.props.currentPageReceiver - 1) * this.props.limitReceiver + 1
			: 0;
		let end =
			this.props.currentPageReceiver < this.props.totalPagesReceiver
				? this.props.currentPageReceiver * this.props.limitReceiver
				: this.props.totalCountReceiver;

		return (
			<div>
				<Search
					onChange={this.templatesSearchChange}
					value={this.state.query}
					placeholder="Nhập tên hoặc nội dung tin nhắn để tìm"
				/>
				<br />
				{this.props.isLoadingReceiver ? (
					<Loading />
				) : (
					<div className="table-responsive">
						<table className="table table-hover">
							<thead className="text-rose">
								<tr>
									<th />
									<th>Họ tên</th>
									<th>Email</th>
									<th>Số điện thoại</th>
									<th>Đã đóng tiền</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{this.props.allReceiver &&
									this.props.allReceiver.map((receiver, index) => {
										const image = receiver.avatar_url
											? receiver.avatar_url.substring(0, 4) === 'http'
												? receiver.avatar_url
												: 'http://' + receiver.avatar_url
											: 'http://farm9.staticflickr.com/8130/29541772703_6ed8b50c47_b.jpg';
										return (
											<tr key={index}>
												<td>
													<div>
														<div
															className="avatar-list-staff"
															style={{
																background:
																	'url(' +
																	image +
																	') center center / cover',
																display: 'inline-block'
															}}
														/>
													</div>
												</td>
												<td>
													<b>{receiver.name}</b>
												</td>
												<td>{receiver.email}</td>
												<td>
													<span style={{ width: '120px' }}>{receiver.phone}</span>
													&ensp;
													<span>
														<img
															style={{
																width: '30px',
																height: 'auto'
															}}
															src={definePhoneHead(receiver.phone)}
														/>
													</span>
												</td>
												<td>
													<OverlappedCircles
														circles={receiver.paid_money.map((course) => {
															return {
																image: course.image_url,
																name: course.name
															};
														})}
													/>
												</td>
												<td>
													<div className="btn-group-action">
														<div style={{ display: 'inline-block' }}>
															<TooltipButton
																placement="top"
																text="Xem chi tiết">
																<a onClick={() =>
																		this.showHistoryDetailModal(receiver)}>
																	<i className="material-icons">
																		add_circle
																	</i>
																</a>
															</TooltipButton>
														</div>
														<TooltipButton placement="top" text="Sửa">
															<a>
																<i className="material-icons">edit</i>
															</a>
														</TooltipButton>
														<TooltipButton placement="top" text="Xóa">
															<a
																onClick={() =>
																	this.removeUserFromCampaign(receiver)}>
																<i className="material-icons">delete</i>
															</a>
														</TooltipButton>
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
							- {end}/{this.props.totalCountReceiver}
						</b>
						<br />
						<Pagination
							totalPages={this.props.totalPagesReceiver}
							currentPage={this.props.currentPageReceiver}
							loadDataPage={this.loadOrders}
						/>
					</div>
				</div>
			</div>
		);
	}
}

ReceiversComponent.propTypes = {
	isLoadingReceiver: PropTypes.bool.isRequired,
	limitReceiver: PropTypes.number.isRequired,
	currentPageReceiver: PropTypes.number.isRequired,
	totalPagesReceiver: PropTypes.number.isRequired,
	totalCountReceiver: PropTypes.number.isRequired,
	campaignAction: PropTypes.object.isRequired,
	allReceiver: PropTypes.array.isRequired,
	params: PropTypes.object.isRequired,
	campaignName: PropTypes.string.isRequired,
	isChoosingReceivers: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		allReceiver: state.smsCampaign.allReceiver,
		totalPagesReceiver: state.smsCampaign.totalPagesReceiver,
		totalCountReceiver: state.smsCampaign.totalCountReceiver,
		currentPageReceiver: state.smsCampaign.currentPageReceiver,
		limitReceiver: state.smsCampaign.limitReceiver,
		isLoadingReceiver: state.smsCampaign.isLoadingReceiver,
		campaignName: state.smsCampaign.campaignName,
		isChoosingReceivers: state.smsCampaign.isChoosingReceivers
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignAction: bindActionCreators(campaignAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiversComponent);
