import React from 'react';
import { Modal } from 'react-bootstrap';
//import Select from 'react-select';
import FormInputText from '../../components/common/FormInputText';
//import TooltipButton from "../../components/common/TooltipButton";
import { isEmptyInput, showErrorNotification } from '../../helpers/helper';
import { observer } from 'mobx-react';
import { store } from './groupManageStore';

@observer
class CreateEditGroupModal extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	submit = () => {
		const group = store.groupCreateEdit;
		if (isEmptyInput(group.name) || isEmptyInput(group.description)) {
			if (isEmptyInput(group.name)) showErrorNotification('Bạn cần nhập Tên nhóm');
			if (isEmptyInput(group.description)) showErrorNotification('Bạn cần nhập mô tả ngắn cho nhóm');
		} else store.saveGroup(group);
	};

	render() {
		let group = store.groupCreateEdit;
		return (
			<Modal show={store.createEditCampaignModal} onHide={() => store.closeCreateEditGroupModal()}>
				<a onClick={() => store.closeCreateEditGroupModal()} id="btn-close-modal" />
				<Modal.Header closeButton>
					<Modal.Title>{group.id ? 'Sửa nhóm' : 'Tạo nhóm'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<form role="form" id="form-add-room">
							<FormInputText
								label="Tên nhóm"
								name="name"
								updateFormData={(e) => store.handleCreateEditGroupModal(e)}
								value={group.name || ''}
								required
							/>
							<div className="form-group">
								<label className="label-control">Mô tả ngắn</label>
								<textarea
									type="text"
									className="form-control"
									value={group.description ? group.description : ''}
									name="description"
									onChange={(e) => store.handleCreateEditGroupModal(e)}
								/>
								<span className="material-input" />
							</div>

							{store.isSavingGroup ? (
								<button type="button" className="btn btn-rose disabled">
									<i className="fa fa-spinner fa-spin" /> Đang lưu
								</button>
							) : (
								<button type="button" className="btn btn-rose" onClick={this.submit}>
									Lưu
								</button>
							)}
						</form>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default CreateEditGroupModal;
