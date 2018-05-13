import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class WalletToWallet extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		let transfer = this.props.transferMoneyToWallet;
		return (
			<div>
				<div className="form-group">
					<label className="label-control">Số tiền</label>
					<input
						type="number"
						name="money"
						placeholder="Nhập số tiền cần nạp"
						className="form-control"
						value={transfer.money}
						onChange={(e) => this.props.handleTransfer(e.target.value, 'money')}
					/>
					<span className="material-input" />
				</div>
				<div className="form-group">
					<label className="label-control">Chọn hình thức</label>
					<Select
						name="wallet"
						value={transfer.wallet}
						options={[
							{
								label: 'Ví cọc sang ví lưu động',
								value: 'deposit'
							},
							{
								label: 'Ví lưu động sang ví cọc',
								value: 'money'
							}
						]}
						onChange={(value) => this.props.handleTransfer(value.value, 'wallet')}
						clearable={false}
					/>
				</div>
			</div>
		);
	}
}

WalletToWallet.propTypes = {
	transferMoneyToWallet: PropTypes.object.isRequired,
	handleTransfer: PropTypes.func.isRequired
};

export default WalletToWallet;
