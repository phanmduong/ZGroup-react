import React from 'react';
import Pagination from '../../components/common/Pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TooltipButton from '../../components/common/TooltipButton';
import OverlappedCircles from '../../components/common/OverlappedCircles';
import * as campaignAction from './campaignAction';
import { definePhoneHead } from '../../helpers/helper';
import Search from '../../components/common/Search';
import Loading from '../../components/common/Loading';

class HistoryComponent extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.campaignId = this.props.params.campaignId;
		this.state = {
			query: '',
			page: 1
		};
		this.historySearchChange = this.historySearchChange.bind(this);
		this.loadHistory = this.loadHistory.bind(this);
		this.showHistoryDetailModal = this.showHistoryDetailModal.bind(this);
	}

	historySearchChange(value) {
		this.setState({
			query: value,
			page: 1
		});
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				this.props.campaignAction.getHistory(this.campaignId, 1, value, null);
			}.bind(this),
			500
		);
	}

	loadHistory(page = 1) {
		this.setState({ page: page });
		this.props.campaignAction.getHistory(this.campaignId, page, this.state.query, null);
	}

	showHistoryDetailModal(user) {
		this.props.campaignAction.showHistoryDetailModal();
		this.props.campaignAction.getHistoryUser(user, this.campaignId, 1, '', null);
	}

	render() {
		let first = this.props.totalCountHistory
			? (this.props.currentPageHistory - 1) * this.props.limitHistory + 1
			: 0;
		let end =
			this.props.currentPageHistory < this.props.totalPagesHistory
				? this.props.currentPageHistory * this.props.limitHistory
				: this.props.totalCountHistory;
		return (
			<div>
				<Search
					onChange={this.historySearchChange}
					value={this.state.query}
					placeholder="Nhập tên hoặc số điện thoại người nhận để tìm"
					disabled={this.props.isLoadingHistory}
				/>
				<br />
				{this.props.isLoadingHistory ? (
					<Loading />
				) : (
					<div className="table-responsive">
						<table className="table table-hover">
							<thead className="text-rose">
								<tr className="text-rose">
									<th />
									<th>Họ tên</th>
									<th>Nội dung</th>
									<th>Số điện thoại</th>
									<th>Thời gian gửi</th>
									<th>Đã đóng tiền</th>
									<th />
								</tr>
							</thead>
							<tbody>
								{this.props.history &&
									this.props.history.map((his, index) => {
										const image = his.user.avatar_url
											? his.user.avatar_url.substring(0, 4) === 'http'
												? his.user.avatar_url
												: 'http://' + his.user.avatar_url
											: 'http://farm9.staticflickr.com/8130/29541772703_6ed8b50c47_b.jpg';
										return (
											<tr key={index}>
												<td>
													<div style={{ display: 'flex' }}>
														<div
															className="avatar-list-staff"
															style={{
																background: 'url(' + image + ') center center / cover',
																display: 'inline-block'
															}}
														/>
														{/* <TooltipButton placement="top" text="Tin thứ 6">
															<div className="sent-message">
																<span style={{ margin: 'auto' }}>6</span>
															</div>
														</TooltipButton> */}
													</div>
												</td>
												<td>
													<b>{his.user.name}</b>
												</td>
												<td>{his.content}</td>
												<td>
													<span style={{ width: '120px' }}>{his.user.phone}</span>
													&ensp;
													<span>
														<img
															style={{
																width: '30px',
																height: 'auto'
															}}
															src={definePhoneHead(his.user.phone)}
														/>
													</span>
												</td>
												<td>{his.sent_time}</td>
												<td>
													<OverlappedCircles
														circles={his.user.paid_money.map((course) => {
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
															<TooltipButton placement="top" text="Xem chi tiết">
																<a
																	onClick={() =>
																		this.showHistoryDetailModal(his.user)}
																>
																	<i className="material-icons">add_circle</i>
																</a>
															</TooltipButton>
														</div>
														<TooltipButton placement="top" text="Sửa">
															<a>
																<i className="material-icons">edit</i>
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
							- {end}/{this.props.totalCountHistory}
						</b>
						<br />
						<Pagination
							totalPages={this.props.totalPagesHistory}
							currentPage={this.props.currentPageHistory}
							loadDataPage={this.loadHistory}
						/>
					</div>
				</div>
			</div>
		);
	}
}

HistoryComponent.propTypes = {
	campaignAction: PropTypes.object.isRequired,
	history: PropTypes.array.isRequired,
	isLoadingHistory: PropTypes.bool.isRequired,
	currentPageHistory: PropTypes.number.isRequired,
	limitHistory: PropTypes.number.isRequired,
	totalCountHistory: PropTypes.number.isRequired,
	totalPagesHistory: PropTypes.number.isRequired,
	params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		history: state.smsCampaign.history,
		isLoadingHistory: state.smsCampaign.isLoadingHistory,
		currentPageHistory: state.smsCampaign.currentPageHistory,
		limitHistory: state.smsCampaign.limitHistory,
		totalCountHistory: state.smsCampaign.totalCountHistory,
		totalPagesHistory: state.smsCampaign.totalPagesHistory
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignAction: bindActionCreators(campaignAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryComponent);
