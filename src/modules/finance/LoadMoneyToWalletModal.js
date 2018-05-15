import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as financeActions from './financeActions';
import PropTypes from 'prop-types';
import Search from '../../components/common/Search';
import Loading from '../../components/common/Loading';
import { showErrorNotification } from '../../helpers/helper';
import DirectMoney from './DirectMoney';
import WalletToWallet from './WalletToWallet';

class LoadMoneyToWalletModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			query: '',
			tab: 'DirectMoney'
		};
		this.timeOut = null;
		this.customersSearchChange = this.customersSearchChange.bind(this);
		this.chooseCustomer = this.chooseCustomer.bind(this);
		this.loadMoneyToWallet = this.loadMoneyToWallet.bind(this);
		this.handleTransfer = this.handleTransfer.bind(this);
	}

	chooseCustomer(customer) {
		let transfer = {
			...this.props.transferMoneyToWallet,
			customer: customer
		};
		this.props.financeActions.handleLoadMoneyToWalletModal(transfer);
	}

	customersSearchChange(value) {
		this.setState({
			query: value
		});
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				this.props.financeActions.loadCustomers(value);
			}.bind(this),
			500
		);
	}

	handleTransfer(value, name) {
		let transfer = {
			...this.props.transferMoneyToWallet,
			[name]: value
		};
		this.props.financeActions.handleLoadMoneyToWalletModal(transfer);
	}

	loadMoneyToWallet() {
		const transfer = { ...this.props.transferMoneyToWallet };
		if (!transfer.customer) {
			showErrorNotification('Bạn cần tìm rồi chọn khách hàng');
		} else {
			this.props.financeActions.loadMoneyToWallet(transfer, this.state.tab);
		}
	}

	render() {
		let transfer = this.props.transferMoneyToWallet;
		return (
			<Modal
				show={this.props.loadMoneyToWalletModal}
				onHide={() => this.props.financeActions.showLoadMoneyToWalletModal()}
			>
				<a onClick={() => this.props.financeActions.showLoadMoneyToWalletModal()} id="btn-close-modal" />
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title">Nạp tiền vào ví</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="container" style={{ width: '100%' }}>
						<div className="row">
							<div className="col-sm-12 nav-tabs-wrapper">
								<ul className="nav nav-pills nav-pills-rose">
									<li className={this.state.tab === 'DirectMoney' && 'active'}>
										<a
											onClick={() =>
												this.setState({
													tab: 'DirectMoney'
												})}
										>
											Nạp tiền trực tiếp
										</a>
									</li>
									<li className={this.state.tab === 'WalletToWallet' && 'active'}>
										<a
											onClick={() =>
												this.setState({
													tab: 'WalletToWallet'
												})}
										>
											Chuyển tiền qua ví
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								{this.state.tab === 'DirectMoney' ? (
									<DirectMoney
										handleTransfer={this.handleTransfer}
										transferMoneyToWallet={this.props.transferMoneyToWallet}
									/>
								) : (
									<WalletToWallet
										transferMoneyToWallet={this.props.transferMoneyToWallet}
										handleTransfer={this.handleTransfer}
									/>
								)}
							</div>

							<div className="col-sm-4" />
						</div>
						<div className="row">
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
								<div className="form-group">
									<label className="label-control">Họ tên khách hàng</label>
									<input
										type="text"
										className="form-control"
										value={transfer.customer ? transfer.customer.name : ''}
										disabled={true}
									/>
									<span className="material-input" />
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
								<div className="form-group">
									<label className="label-control">Số điện thoại</label>
									<input
										type="text"
										className="form-control"
										value={transfer.customer ? transfer.customer.phone : ''}
										disabled={true}
									/>
									<span className="material-input" />
								</div>
							</div>
							<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
								<div className="form-group">
									<label className="label-control">Email</label>
									<input
										type="text"
										className="form-control"
										value={transfer.customer ? transfer.customer.email : ''}
										disabled={true}
									/>
									<span className="material-input" />
								</div>
							</div>
						</div>
						<Search
							onChange={this.customersSearchChange}
							value={this.state.query}
							placeholder="Nhập tên, số điện thoại hoặc email để tìm và chọn khách hàng"
						/>
						{this.props.isLoadingCustomer ? (
							<Loading />
						) : (
							<div>
								{this.props.customers && this.props.customers.length ? (
									<div className="table-responsive">
										<table className="table table-hover">
											<thead>
												<tr className="text-rose">
													<th>Họ tên</th>
													<th>Số điện thoại</th>
													<th>Email</th>
												</tr>
											</thead>
											<tbody>
												{this.props.customers.map((customer, id) => {
													return (
														<tr
															key={id}
															onClick={() => this.chooseCustomer(customer)}
															style={{ cursor: 'pointer' }}
														>
															<td>{customer.name}</td>
															<td>{customer.phone}</td>
															<td>{customer.email}</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
								) : (
									<div />
								)}
							</div>
						)}
						{this.props.isLoadingMoneyToWallet ? (
							<Loading />
						) : (
							<div>
								<button
									rel="tooltip"
									data-placement="top"
									title=""
									data-original-title="Remove item"
									type="button"
									className="btn btn-success btn-round"
									data-dismiss="modal"
									onClick={() => this.loadMoneyToWallet()}
								>
									<i className="material-icons">check</i> Xác nhận
								</button>
								<button
									rel="tooltip"
									data-placement="top"
									title=""
									data-original-title="Remove item"
									type="button"
									className="btn btn-danger btn-round"
									data-dismiss="modal"
									onClick={() => this.props.financeActions.showLoadMoneyToWalletModal()}
								>
									<i className="material-icons">close</i> Huỷ
								</button>
							</div>
						)}
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

LoadMoneyToWalletModal.propTypes = {
	financeActions: PropTypes.object.isRequired,
	loadMoneyToWalletModal: PropTypes.bool,
	transferMoneyToWallet: PropTypes.object.isRequired,
	isLoadingCustomer: PropTypes.bool,
	customers: PropTypes.array.isRequired,
	isLoadingMoneyToWallet: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		loadMoneyToWalletModal: state.finance.loadMoneyToWalletModal,
		transferMoneyToWallet: state.finance.transferMoneyToWallet,
		isLoadingCustomer: state.finance.isLoadingCustomer,
		customers: state.finance.customers,
		isLoadingMoneyToWallet: state.finance.isLoadingMoneyToWallet
	};
}

function mapDispatchToProps(dispatch) {
	return {
		financeActions: bindActionCreators(financeActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoneyToWalletModal);
