import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as campaignAction from './campaignAction';
import Pagination from '../../components/common/Pagination';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import TooltipButton from '../../components/common/TooltipButton';

class HistoryDetailModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.timeOut = null;
		this.campaignId = this.props.campaignId;
		this.state = {
			query: '',
			page: 1
		};
		this.historySearchChange = this.historySearchChange.bind(this);
		this.loadDetail = this.loadDetail.bind(this);
		this.onHide = this.onHide.bind(this);
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
				this.props.campaignAction.getHistoryUser(
					this.props.userHistoryDetail,
					this.campaignId,
					1,
					value,
					null
				);
			}.bind(this),
			500
		);
	}

	loadDetail(page = 1) {
		this.setState({ page: page });
		this.props.campaignAction.getHistoryUser(
			this.props.userHistoryDetail,
			this.campaignId,
			page,
			this.state.query,
			null
		);
	}

	onHide() {
		this.props.campaignAction.showHistoryDetailModal();
		this.setState({
			query: '',
			page: 1
		});
	}

	render() {
		let first = this.props.totalCountHistoryModal
			? (this.props.currentPageHistoryModal - 1) * this.props.limitHistoryModal + 1
			: 0;
		let end =
			this.props.currentPageHistoryModal < this.props.totalPagesHistoryModal
				? this.props.currentPageHistoryModal * this.props.limitHistoryModal
				: this.props.totalCountHistoryModal;

		return (
			<Modal show={this.props.historyDetailModal} onHide={() => this.onHide()}>
				<a onClick={() => this.onHide()} id="btn-close-modal" />
				<Modal.Header closeButton>
					<Modal.Title className="modal-title">
						Chi tiết lịch sử gửi tin của {this.props.userHistoryDetail.name}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Search
						onChange={this.historySearchChange}
						value={this.state.query}
						placeholder="Nhập nội dung tin nhắn để tìm"
					/>
					<br />
					{this.props.isLoadingHistoryModal ? (
						<Loading />
					) : (
						<div className="table-responsive">
							<table className="table table-hover">
								<thead className="text-rose">
									<tr className="text-rose">
										<th />
										<th>Nội dung</th>
										<th>Thời gian gửi</th>
									</tr>
								</thead>
								<tbody>
									{this.props.historyModal &&
										this.props.historyModal.map((his, index) => {
											return (
												<tr key={index}>
													<td>
														<TooltipButton placement="top" text={`Tin thứ ${index+1}`}>
															<div className="sent-message"
															style={{ marginLeft: 0 }}>
																<span style={{ margin: 'auto' }}>{index + 1}</span>
															</div>
														</TooltipButton>
													</td>
									
													<td>{his.content}</td>

													<td>{his.sent_time}</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<div style={{ textAlign: 'right' }}>
						<b style={{ marginRight: '15px' }}>
							Hiển thị kêt quả từ {first}
							- {end}/{this.props.totalCountHistoryModal}
						</b>
						<br />
						<Pagination
							totalPages={this.props.totalPagesHistoryModal}
							currentPage={this.props.currentPageHistoryModal}
							loadDataPage={this.loadDetail}
						/>
					</div>
				</Modal.Footer>
			</Modal>
		);
	}
}

HistoryDetailModal.propTypes = {
	campaignId: PropTypes.string.isRequired,
	campaignAction: PropTypes.object.isRequired,
	historyDetailModal: PropTypes.bool.isRequired,
	isLoadingHistoryModal: PropTypes.bool,
	historyModal: PropTypes.array,
	currentPageHistoryModal: PropTypes.number,
	limitHistoryModal: PropTypes.number,
	totalCountHistoryModal: PropTypes.number,
	totalPagesHistoryModal: PropTypes.number,
	userHistoryDetail: PropTypes.object
};

function mapStateToProps(state) {
	return {
		isLoadingHistoryModal: state.smsCampaign.isLoadingHistoryModal,
		historyModal: state.smsCampaign.historyModal,
		currentPageHistoryModal: state.smsCampaign.currentPageHistoryModal,
		limitHistoryModal: state.smsCampaign.limitHistoryModal,
		totalCountHistoryModal: state.smsCampaign.totalCountHistoryModal,
		totalPagesHistoryModal: state.smsCampaign.totalPagesHistoryModal,
		historyDetailModal: state.smsCampaign.historyDetailModal,
		userHistoryDetail: state.smsCampaign.userHistoryDetail
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignAction: bindActionCreators(campaignAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetailModal);
