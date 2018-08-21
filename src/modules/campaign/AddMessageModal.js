import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as campaignAction from './campaignAction';
import Loading from '../../components/common/Loading';
import FormInputDateTime from '../../components/common/FormInputDateTime';
import { isEmptyInput, showErrorNotification, changeToSlugSpace } from '../../helpers/helper';
import { DATETIME_FORMAT_SQL } from '../../constants/constants';
import Select from 'react-select';

class AddMessageModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.upMessage = this.upMessage.bind(this);
		this.saveMessage = this.saveMessage.bind(this);
		this.changTemplateTypes = this.changTemplateTypes.bind(this);
	}

	saveMessage() {
		const message = { ...this.props.message };
		if (
			isEmptyInput(message.name) ||
			isEmptyInput(message.content) ||
			isEmptyInput(message.sms_template_type_id) ||
			isEmptyInput(message.send_time)
		) {
			if (isEmptyInput(message.name)) showErrorNotification('Bạn cần nhập Tên tin nhắn');
			if (isEmptyInput(message.content)) showErrorNotification('Bạn cần nhập Nội dung tin nhắn');
			if (isEmptyInput(message.sms_template_type_id))
				showErrorNotification('Bạn cần chọn Loại tin nhắn');
			if (isEmptyInput(message.send_time)) showErrorNotification('Bạn cần chọn Ngày gửi');
		} else if (!message.template_id) {
			this.props.campaignAction.saveMessage(this.props.campaignId, message);
		} else this.props.campaignAction.editMessage(message);
	}

	upMessage(e) {
		const field = e.target.name;
		let value = e.target.value;
		if (field === 'content') {
			value = changeToSlugSpace(value);
		}
		let message = {
			...this.props.message,
			[field]: value
		};
		this.props.campaignAction.upMessage(message);
	}

	changTemplateTypes(value) {
		let message = {
			...this.props.message,
			sms_template_type_id: value ? value.value : ''
		};
		this.props.campaignAction.upMessage(message);
	}

	render() {
		let message = this.props.message;
		return (
			<Modal
				show={this.props.addMessageModal}
				onHide={() => {
					this.props.campaignAction.showAddMessageModal();
				}}>
				<a
					onClick={() => {
						this.props.campaignAction.showAddMessageModal();
					}}
					id="btn-close-modal"
				/>
				<Modal.Header closeButton>
					<Modal.Title className="modal-title">Thêm tin nhắn</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<form method="#" action="#">
							<div className="row">
								<div className="col-md-6">
									<br />
									<label className="label-control">Loại tin nhắn</label>
									<Select
										disabled={this.props.upMessage}
										value={message.sms_template_type_id}
										options={this.props.template_types.map((template_types) => {
											return {
												...template_types,
												value: template_types.id,
												label: template_types.name
											};
										})}
										onChange={this.changTemplateTypes}
									/>
								</div>
								<div className="col-md-6">
									<FormInputDateTime
										format={DATETIME_FORMAT_SQL}
										name="send_time"
										id="send_time"
										label="Ngày gửi tin"
										value={message.send_time || ''}
										updateFormData={this.upMessage}
									/>
								</div>
							</div>
							<div className="form-group">
								<label className="label-control">Tên tin nhắn</label>
								<input
									type="text"
									name="name"
									className="form-control"
									value={message.name || ''}
									disabled={this.props.upMessage}
									onChange={this.upMessage}
								/>
								<span className="material-input" />
							</div>
							<div className="form-group">
								<label className="label-control">Nội dung tin nhắn</label>
								<textarea
									type="text"
									className="form-control"
									value={message.content || ''}
									name="content"
									placeholder="Không quá 255 ký tự"
									onChange={this.upMessage}
									disabled={
										this.props.upMessage ||
										(message.content && message.content.length > 255)
									}
								/>
								<span className="material-input" />
							</div>

							<br />

							{this.props.upMessage ? ( //upMessage với isSavingMessage thì khác gì nhau mà lại chia thành 2 cái như vậy
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
										onClick={this.saveMessage}>
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
										onClick={() => {
											this.props.campaignAction.showAddMessageModal();
										}}>
										<i className="material-icons">close</i> Huỷ
									</button>
								</div>
							)}
						</form>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

AddMessageModal.propTypes = {
	upMessage: PropTypes.bool.isRequired,
	addMessageModal: PropTypes.bool.isRequired,
	campaignAction: PropTypes.object.isRequired,
	message: PropTypes.object.isRequired,
	template_types: PropTypes.array.isRequired,
	isSavingMessage: PropTypes.bool.isRequired,
	campaignId: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	return {
		template_types: state.smsCampaign.template_types,
		message: state.smsCampaign.message,
		upMessage: state.smsCampaign.upMessage,
		addMessageModal: state.smsCampaign.addMessageModal,
		isSavingMessage: state.smsCampaign.isSavingMessage
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignAction: bindActionCreators(campaignAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMessageModal);
