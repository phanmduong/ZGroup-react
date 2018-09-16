import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class DirectMoney extends React.Component {
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
					<label className="label-control">Chọn ví nạp tiền</label>
					<Select
						name="deposit"
						value={transfer.deposit}
						options={[
							{
								label: 'Ví lưu động',
								value: 0
							},
							{
								label: 'Ví cọc',
								value: 1
							}
						]}
						onChange={(value) => this.props.handleTransfer(value.value, 'deposit')}
						clearable={false}
					/>
				</div>
			</div>
		);
	}
}

DirectMoney.propTypes = {
	transferMoneyToWallet: PropTypes.object.isRequired,
	handleTransfer: PropTypes.func.isRequired
};

export default DirectMoney;
