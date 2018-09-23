import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as campaignListAction from './campaignListAction';
import FormInputText from '../../components/common/FormInputText';
import Search from '../../components/common/Search';
import Loading from '../../components/common/Loading';
import Pagination from '../../components/common/Pagination';
import { CirclePicker } from 'react-color';
import TooltipButton from '../../components/common/TooltipButton';
import { isEmptyInput, showErrorNotification } from '../../helpers/helper';

class ManageTemplateTypesModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: '',
			color: '',
			query: '',
			page: 1,
			modal: false,
			id: null
		};
		this.timeOut = null;
		this.createTemplateTypeModal = this.createTemplateTypeModal.bind(this);
		this.templateTypesSearchChange = this.templateTypesSearchChange.bind(this);
		this.loadOrders = this.loadOrders.bind(this);
	}

	componentWillMount() {
		this.props.campaignListAction.getTemplateTypes();
	}

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.isSavingTemplateTypes !== this.props.isSavingTemplateTypes &&
			!nextProps.isSavingTemplateTypes &&
			nextProps.templateTypeSuccess
		) {
			this.setState({
				page: 1,
				query: '',
				modal: false
			});
			this.props.campaignListAction.getTemplateTypes();
		}
	}

	createTemplateTypeModal() {
		const type = this.state;
		if (isEmptyInput(type.name) || isEmptyInput(type.color)) {
			if (isEmptyInput(type.name)) showErrorNotification('Bạn cần nhập tên loại tin nhắn');
			if (isEmptyInput(type.color)) showErrorNotification('Bạn cần chọn màu cho loại tin nhắn');
		} else this.props.campaignListAction.saveTemplateType(this.state);
	}

	templateTypesSearchChange(value) {
		this.setState({
			query: value,
			page: 1
		});
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				this.props.campaignListAction.getTemplateTypes(1, value);
			}.bind(this),
			500
		);
	}

	loadOrders(page = 1) {
		this.setState({ page: page });
		this.props.campaignListAction.getTemplateTypes(page, this.state.query);
	}

	render() {
		let first = this.props.totalCountTemplateTypes
			? (this.props.currentPageTemplateTypes - 1) * this.props.limitTemplateTypes + 1
			: 0;
		let end =
			this.props.currentPageTemplateTypes < this.props.totalPagesTemplateTypes
				? this.props.currentPageTemplateTypes * this.props.limitTemplateTypes
				: this.props.totalCountTemplateTypes;
		return (
			<Modal
				show={this.props.manageTemplateTypesModal}
				onHide={() => this.props.campaignListAction.showManageTemplateTypesModal()}>
				<a
					onClick={() => this.props.campaignListAction.showManageTemplateTypesModal()}
					id="btn-close-modal"
				/>
				<Modal.Header closeButton>
					<div className="flex-row flex">
						<h4 className="card-title" style={{ lineHeight: '0px' }}>
							<strong>Quản lý loại tin nhắn</strong>
						</h4>
						<button
							aria-expanded="false"
							className="button-plus"
							onClick={() =>
								this.setState({
									name: '',
									color: '',
									modal: true,
									id: null
								})}>
							<i className="material-icons" style={{ fontSize: '20px' }}>
								add
							</i>
						</button>
					</div>
				</Modal.Header>
				<Modal.Body>
					<Modal show={this.state.modal} onHide={() => this.setState({ modal: false })}>
						<a onClick={() => this.setState({ modal: false })} id="btn-close-modal" />
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title">
								{this.state.id ? 'Sửa' : 'Thêm'}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="row">
								<div className="col-md-12">
									<FormInputText
										name="name"
										value={this.state.name}
										placeholder="Không quá 25 ký tự"
										disabled={this.state.name.length > 24}
										max={10}
										updateFormData={(e) => this.setState({ name: e.target.value })}
									/>
								</div>
								<br />
								<TooltipButton text="Màu loại tin nhắn" placement="top">
									<div className="col-md-12">
										<CirclePicker
											width="100%"
											color={this.state.color}
											onChangeComplete={(color) => this.setState({ color: color.hex })}
										/>
									</div>
								</TooltipButton>
								<div className="col-md-3">
									{this.props.isSavingTemplateTypes ? (
										<button
											type="button"
											className="btn btn-rose disabled"
											style={{
												float: 'right'
											}}>
											<i className="fa fa-spinner fa-spin" /> Đang lưu
										</button>
									) : (
										<button
											type="button"
											className="btn btn-rose"
											style={{
												float: 'right'
											}}
											onClick={this.createTemplateTypeModal}>
											Lưu
										</button>
									)}
								</div>
							</div>
						</Modal.Body>
					</Modal>
					<Search
						onChange={this.templateTypesSearchChange}
						value={this.state.query}
						placeholder="Nhập tên loại tin nhắn để tìm"
					/>
					{this.props.isLoadingTemplateTypes ? (
						<Loading />
					) : (
						<div className="table-responsive">
							<table className="table table-hover">
								<thead>
									<tr className="text-rose">
										<th>Tên loại tin nhắn</th>
										<th>Màu sắc</th>
										<th />
									</tr>
								</thead>
								<tbody>
									{this.props.templateTypesList &&
										this.props.templateTypesList.map((type, id) => {
											return (
												<tr key={id}>
													<td>
														<span
															className="text-name-student-register"
															rel="tooltip"
															title="">
															{type.name}
														</span>
													</td>
													<td>
														<div
															className="campaign-message-type"
															style={{ backgroundColor: type.color }}
														/>
													</td>
													<td>
														<div className="btn-group-action">
															<a
																style={{ color: '#878787' }}
																data-toggle="tooltip"
																title=""
																type="button"
																rel="tooltip"
																data-original-title="Sửa"
																onClick={() =>
																	this.setState({
																		modal: true,
																		name: type.name,
																		id: type.id,
																		color: type.color
																	})}>
																<i className="material-icons">edit</i>
															</a>
														</div>
													</td>
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
							- {end}/{this.props.totalCountTemplateTypes}
						</b>
						<br />
						<Pagination
							totalPages={this.props.totalPagesTemplateTypes}
							currentPage={this.props.currentPageTemplateTypes}
							loadDataPage={this.loadOrders}
						/>
					</div>
				</Modal.Footer>
			</Modal>
		);
	}
}

ManageTemplateTypesModal.propTypes = {
	manageTemplateTypesModal: PropTypes.bool.isRequired,
	campaignListAction: PropTypes.object.isRequired,
	templateTypesList: PropTypes.array.isRequired,
	totalCountTemplateTypes: PropTypes.number.isRequired,
	totalPagesTemplateTypes: PropTypes.number.isRequired,
	limitTemplateTypes: PropTypes.number.isRequired,
	currentPageTemplateTypes: PropTypes.number.isRequired,
	isLoadingTemplateTypes: PropTypes.bool.isRequired,
	isSavingTemplateTypes: PropTypes.bool.isRequired,
	templateTypeSuccess: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		manageTemplateTypesModal: state.campaignList.manageTemplateTypesModal,
		templateTypesList: state.campaignList.templateTypesList,
		totalCountTemplateTypes: state.campaignList.totalCountTemplateTypes,
		totalPagesTemplateTypes: state.campaignList.totalPagesTemplateTypes,
		limitTemplateTypes: state.campaignList.limitTemplateTypes,
		currentPageTemplateTypes: state.campaignList.currentPageTemplateTypes,
		isLoadingTemplateTypes: state.campaignList.isLoadingTemplateTypes,
		isSavingTemplateTypes: state.campaignList.isSavingTemplateTypes,
		templateTypeSuccess: state.campaignList.templateTypeSuccess
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignListAction: bindActionCreators(campaignListAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTemplateTypesModal);
