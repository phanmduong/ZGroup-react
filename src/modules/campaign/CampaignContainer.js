import React from 'react';
import { Link, IndexLink } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as campaignAction from './campaignAction';
import AddReceiverModal from './AddReceiverModal';
import AddMessageModal from './AddMessageModal';
import HistoryDetailModal from './HistoryDetailModal';

class CampaignContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.path = '';
		this.campaignId = this.props.params.campaignId;
		this.state = {
			type: 'edit',
			link: '',
		};
		this.showAddMessageModal2 = this.showAddMessageModal2.bind(this);
		this.showAddReceiverModal = this.showAddReceiverModal.bind(this);
	}

	componentWillMount() {
		this.props.campaignAction.loadTypeOfMessage();
		this.props.campaignAction.loadAllMessage(this.props.params.campaignId, 1, '');
		this.props.campaignAction.loadAllReceiver(this.props.params.campaignId, 1, '');
		this.props.campaignAction.getHistory(this.props.params.campaignId, 1, '', null);
		this.setState({
			type: 'edit',
			link: `/sms/campaign-detail/${this.campaignId}`
		});
	}

	componentWillReceiveProps(nextProps) {
		if (
			this.props.location.pathname !== nextProps.location.pathname &&
			nextProps.location.pathname === `${this.state.link}/receivers`
		) {
			this.props.campaignAction.loadAllReceiver(this.props.params.campaignId, 1, '');
		}
		if (
			this.props.location.pathname !== nextProps.location.pathname &&
			nextProps.location.pathname === this.state.link
		) {
			this.props.campaignAction.loadAllMessage(this.props.params.campaignId, 1, '');
		}
		if (
			this.props.location.pathname !== nextProps.location.pathname &&
			nextProps.location.pathname === `${this.state.link}/history`
		) {
			this.props.campaignAction.getHistory(this.props.params.campaignId, 1, '', null);
		}
		if (nextProps.isSavingMessage !== this.props.isSavingMessage && !nextProps.isSavingMessage) {
			this.props.campaignAction.loadAllMessage(this.campaignId, 1, '');
		}
	}

	showAddMessageModal2(message) {
		this.props.campaignAction.showAddMessageModal();
		this.props.campaignAction.upMessage(message);
	}

	showAddReceiverModal() {
		this.props.campaignAction.showAddReceiverModal();
		this.props.campaignAction.getReceiversModal(this.campaignId);
		this.props.campaignAction.loadAllGens();
		this.props.campaignAction.loadAllClasses();
	}

	render() {
		this.path = this.props.location.pathname;
		return (
			<div>
				<IndexLink to={this.state.link}>
					<button
						type="button"
						style={{ color: 'white' }}
						className={
							this.path === this.state.link ? 'btn-primary btn btn-round' : 'btn btn-round'
						}
						data-dismiss="modal">
						CHIẾN DỊCH
						<div className="ripple-container" />
					</button>
				</IndexLink>&emsp;
				<Link to={`${this.state.link}/receivers`} style={{ color: 'white' }}>
					<button
						type="button"
						className={
							this.path === `${this.state.link}/receivers` ? (
								'btn-primary btn btn-round'
							) : (
								'btn btn-round'
							)
						}
						data-dismiss="modal">
						NGƯỜI NHẬN
						<div className="ripple-container" />
					</button>
				</Link>&emsp;
				<Link to={`${this.state.link}/history`} style={{ color: 'white' }}>
					<button
						type="button"
						className={
							this.path === `${this.state.link}/history` ? (
								'btn-primary btn btn-round'
							) : (
								'btn btn-round'
							)
						}
						data-dismiss="modal">
						LỊCH SỬ
					</button>
				</Link>
				<br />
				<br />
				<div className="col-lg-12">
					<div className="card">
						<div className="card-content">
							<div className="tab-content">
								<div className="flex-row flex">
									<h5 className="card-title">
										<strong>{this.props.campaignName}</strong>
									</h5>
									<div className="dropdown">
										<button
											className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
											type="button"
											data-toggle="dropdown">
											<strong>+</strong>
										</button>
										<ul className="dropdown-menu dropdown-primary">
											<li>
												<a
													onClick={() =>
														this.showAddMessageModal2({
															sms_template_type_id: 1
														})}>
													Thêm tin
												</a>
											</li>
											<li>
												<a onClick={() => this.showAddReceiverModal()}>
													Thêm người nhận
												</a>
											</li>
										</ul>
									</div>
								</div>
								{this.props.children}
							</div>
						</div>
					</div>
				</div>
				<AddReceiverModal campaignId={this.campaignId} />
				<AddMessageModal campaignId={this.campaignId} />
				<HistoryDetailModal campaignId={this.campaignId}/>
			</div>
		);
	}
}

CampaignContainer.propTypes = {
	children: PropTypes.element,
	location: PropTypes.object.isRequired,
	pathname: PropTypes.string,
	campaignAction: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired,
	isSavingMessage: PropTypes.bool.isRequired,
	campaignName: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	return {
		isSavingMessage: state.smsCampaign.isSavingMessage,
		campaignName: state.smsCampaign.campaignName
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignAction: bindActionCreators(campaignAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignContainer);
