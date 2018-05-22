import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as campaignAction from './campaignAction';
import FormInputDate from '../../components/common/FormInputDate';
import Star from '../../components/common/Star';
import Checkbox from '../../components/common/Checkbox';
import FormInputText from '../../components/common/FormInputText';
import UsersList from './UsersList';
import Pagination from '../../components/common/Pagination';
import  {isEmptyInput} from '../../helpers/helper';
import PropertyReactSelectValue from '../createProduct/PropertyReactSelectValue';
import Select from 'react-select';
import ItemReactSelect from '../../components/common/ItemReactSelect';
import { searchStaffs, getReceiversModal } from './campaignApi';
import Loading from '../../components/common/Loading';

//import Loading from "../../components/common/Loading";

class AddReceiverModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.campaignId = this.props.campaignId;
		this.timeOut = null;
		this.state = {
			isAll: false,
			chosenItems: [],
			page: 1,
			gens: [],
			classes: [],
			time: {
				startTime: '',
				endTime: ''
			},
			top: null,
			carer_id: null,
			rate: null,
			limit: 20,
			paid_course_quantity: null
		};
		this.loadUsers = this.loadUsers.bind(this);
		this.updateFormDate = this.updateFormDate.bind(this);
		this.loadStaffs = this.loadStaffs.bind(this);
		this.gensSearchChange = this.gensSearchChange.bind(this);
		this.classesSearchChange = this.classesSearchChange.bind(this);
		this.changeStaff = this.changeStaff.bind(this);
		this.changeTop = this.changeTop.bind(this);
		this.changeRate = this.changeRate.bind(this);
		this.chooseAll = this.chooseAll.bind(this);
		this.chooseItem = this.chooseItem.bind(this);
		this.onHideModal = this.onHideModal.bind(this);
		this.submit = this.submit.bind(this);
		this.changeQuantity = this.changeQuantity.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.currentPageModal !== this.props.currentPageModal)
			if (this.state.isAll) {
				let chosenItems = [ ...this.state.chosenItems ];
				nextProps.receiversModal.forEach((user) => {
					chosenItems = [
						...chosenItems,
						{
							id: user.id,
							checked: true
						}
					];
				});
				this.setState({
					chosenItems: chosenItems
				});
			}
		if (
			nextProps.isChoosingReceivers !== this.props.isChoosingReceivers &&
			!nextProps.isChoosingReceivers
		) {
			let time = {
				startTime: '',
				endTime: ''
			};
			this.setState({
				isAll: false,
				chosenItems: [],
				page: 1,
				gens: [],
				classes: [],
				time: time,
				top: null,
				carer_id: null,
				paid_course_quantity: null,
				rate: null
			});
			this.props.campaignAction.getReceiversModal(this.campaignId);
		}
	}

	updateFormDate(event) {
		const field = event.target.name;
		let time = { ...this.state.time };
		time[field] = event.target.value;
		if (!isEmptyInput(time.startTime) && !isEmptyInput(time.endTime)) {
			this.props.campaignAction.getReceiversModal(
				this.campaignId,
				1,
				this.state.gens,
				this.state.classes,
				time.startTime,
				time.endTime,
				this.state.top,
				this.state.carer_id,
				this.state.rate,
				this.state.limit,
				this.state.paid_course_quantity
			);
			this.setState({
				time: time,
				page: 1,
				isAll: false,
				chosenItems: []
			});
		} else {
			this.setState({
				time: time,
				page: 1,
				isAll: false,
				chosenItems: []
			});
		}
	}

	loadStaffs(input, callback) {
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				searchStaffs(input).then((res) => {
					let staffs = [];
					res.data.staffs.map((staff) => {
						staffs.push({
							...staff,
							...{
								value: staff.id,
								label: staff.name
							}
						});
					});
					callback(null, { options: staffs, complete: true });
				});
			}.bind(this),
			500
		);
	}

	changeTop(event) {
		const value = event.target.value;
		this.setState({
			top: value,
			page: 1,
			isAll: false,
			chosenItems: []
		});
		this.props.campaignAction.getReceiversModal(
			this.campaignId,
			1,
			this.state.gens,
			this.state.classes,
			this.state.time.startTime,
			this.state.time.endTime,
			value,
			this.state.carer_id,
			this.state.rate,
			this.state.limit,
			this.state.paid_course_quantity
		);
	}

	gensSearchChange(value) {
		this.setState({
			page: 1,
			gens: value,
			isAll: false,
			chosenItems: []
		});
		this.props.campaignAction.getReceiversModal(
			this.campaignId,
			1,
			value,
			this.state.classes,
			this.state.time.startTime,
			this.state.time.endTime,
			this.state.top,
			this.state.carer_id,
			this.state.rate,
			this.state.limit,
			this.state.paid_course_quantity
		);
	}

	classesSearchChange(value) {
		this.setState({
			page: 1,
			classes: value,
			isAll: false,
			chosenItems: []
		});
		this.props.campaignAction.getReceiversModal(
			this.campaignId,
			1,
			this.state.gens,
			value,
			this.state.time.startTime,
			this.state.time.endTime,
			this.state.top,
			this.state.carer_id,
			this.state.rate,
			this.state.limit,
			this.state.paid_course_quantity
		);
	}

	changeStaff(value) {
		if (value) {
			this.setState({
				page: 1,
				carer_id: value.id,
				isAll: false,
				chosenItems: []
			});
			this.props.campaignAction.getReceiversModal(
				this.campaignId,
				1,
				this.state.gens,
				this.state.classes,
				this.state.time.startTime,
				this.state.time.endTime,
				this.state.top,
				value.id,
				this.state.rate,
				this.state.limit,
				this.state.paid_course_quantity
			);
		} else {
			this.setState({
				page: 1,
				carer_id: null,
				isAll: false,
				chosenItems: []
			});
			this.props.campaignAction.getReceiversModal(
				this.campaignId,
				1,
				this.state.gens,
				this.state.classes,
				this.state.time.startTime,
				this.state.time.endTime,
				this.state.top,
				null,
				this.state.rate,
				this.state.limit,
				this.state.paid_course_quantity
			);
		}
	}

	changeRate(value) {
		this.setState({
			page: 1,
			rate: value,
			isAll: false,
			chosenItems: []
		});
		this.props.campaignAction.getReceiversModal(
			this.campaignId,
			1,
			this.state.gens,
			this.state.classes,
			this.state.time.startTime,
			this.state.time.endTime,
			this.state.top,
			this.state.carer_id,
			value,
			this.state.limit,
			this.state.paid_course_quantity
		);
	}

	changeQuantity(event) {
		const value = event.target.value;
		this.setState({
			paid_course_quantity: value,
			page: 1,
			isAll: false,
			chosenItems: []
		});
		this.props.campaignAction.getReceiversModal(
			this.campaignId,
			1,
			this.state.gens,
			this.state.classes,
			this.state.time.startTime,
			this.state.time.endTime,
			this.state.top,
			this.state.carer_id,
			this.state.rate,
			this.state.limit,
			value
		);
	}

	loadUsers(page = 1) {
		this.setState({ page: page });
		this.props.campaignAction.getReceiversModal(
			this.campaignId,
			page,
			this.state.gens,
			this.state.classes,
			this.state.time.startTime,
			this.state.time.endTime,
			this.state.top,
			this.state.carer_id,
			this.state.rate,
			this.state.limit,
			this.state.paid_course_quantity
		);
	}

	chooseAll(event) {
		this.setState({ isAll: event.target.checked });
		this.changeStatusAll(event.target.checked, this.props);
	}

	changeStatusAll(status, props) {
		let users = props.receiversModal.map((user) => {
			return {
				...user,
				checked: status
			};
		});
		let chosenItems = this.state.chosenItems.map((user) => {
			return {
				...user,
				checked: status
			};
		});
		users.map((user) => {
			let userData = chosenItems.filter((item) => item.id === user.id);
			if (userData === undefined || userData == null || userData.length <= 0) {
				chosenItems.push(user);
			}
		});
		this.setState({ chosenItems: [ ...chosenItems.filter((user) => user.checked) ] });
	}

	chooseItem(id, checked) {
		if (!checked) {
			let chosenItems = this.state.chosenItems.map((item) => {
				if (id === item.id) {
					return {
						...item,
						checked: false
					};
				}
				return item;
			});
			this.setState({
				isAll: false,
				chosenItems: chosenItems
			});
		} else {
			let inArray = false;
			let chosenItems = this.state.chosenItems.map((item) => {
				if (id === item.id) {
					inArray = true;
					return {
						...item,
						checked: true
					};
				}
				return item;
			});
			if (!inArray)
				chosenItems = [
					...chosenItems,
					{
						id: id,
						checked: true
					}
				];
			this.setState({
				chosenItems: chosenItems
			});
		}
	}

	onHideModal() {
		this.props.campaignAction.showAddReceiverModal();
		let time = {
			startTime: '',
			endTime: ''
		};
		this.setState({
			isAll: false,
			chosenItems: [],
			page: 1,
			gens: [],
			classes: [],
			time: time,
			top: null,
			carer_id: null,
			paid_course_quantity: null,
			rate: null
		});
	}

	submit() {
		this.props.campaignAction.beginSubmit();
		if (this.state.isAll && !this.state.top) {
			getReceiversModal(
				this.campaignId,
				this.state.page,
				this.state.gens,
				this.state.classes,
				this.state.time.startTime,
				this.state.time.endTime,
				this.state.top,
				this.state.carer_id,
				this.state.rate,
				-1,
				this.state.paid_course_quantity
			).then((res) => {
				let users = res.data.data.users;
				this.props.campaignAction.chooseReceivers(this.campaignId, users);
			});
		} else {
			this.props.campaignAction.chooseReceivers(this.campaignId, this.state.chosenItems);
		}
	}

	render() {
		let first = this.props.totalCountModal
			? (this.props.currentPageModal - 1) * this.props.limitModal + 1
			: 0;
		let end =
			this.props.currentPageModal < this.props.totalPagesModal
				? this.props.currentPageModal * this.props.limitModal
				: this.props.totalCountModal;

		return (
			<Modal show={this.props.addReceiverModal} onHide={() => this.onHideModal()} bsSize="large">
				<a onClick={() => this.onHideModal()} id="btn-close-modal" />
				<Modal.Header closeButton>
					<Modal.Title className="modal-title">Nhóm người dùng</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div
						style={{
							display: 'inline-block',
							position: 'relative',
							width: '100%',
							margin: '25px 0'
						}}>
						<div className="row">
							<div className="col-md-6">
								<Select.Creatable
									multi={true}
									placeholder="Chọn khóa (nhiều)"
									options={this.props.gens.map((course) => {
										return {
											value: course.id,
											label: course.name
										};
									})}
									onChange={this.gensSearchChange}
									value={this.state.gens}
									valueComponent={PropertyReactSelectValue}
								/>
							</div>
							<div className="col-md-6">
								<Select.Creatable
									multi={true}
									placeholder="Chọn lớp (nhiều)"
									options={this.props.classes.map((studyClass) => {
										return {
											value: studyClass.id,
											label: studyClass.name
										};
									})}
									onChange={this.classesSearchChange}
									value={this.state.classes}
									valueComponent={PropertyReactSelectValue}
								/>
							</div>
							<div className="col-md-6">
								<FormInputDate
									placeholder="Từ ngày"
									name="startTime"
									updateFormData={this.updateFormDate}
									id="form-start-time"
									value={this.state.time.startTime}
									maxDate={this.state.time.endTime}
								/>
							</div>
							<div className="col-md-6">
								<FormInputDate
									placeholder="Đến ngày"
									name="endTime"
									updateFormData={this.updateFormDate}
									id="form-end-time"
									value={this.state.time.endTime}
									minDate={this.state.time.startTime}
								/>
							</div>

							<div className="col-md-6">
								{this.props.isChoosingReceivers ? (
									<Loading />
								) : (
									<div className="form-group">
										<div className="flex flex-row-center">
											<Star
												value={0}
												maxStar={5}
												onChange={(value) => {
													this.changeRate(value);
												}}
											/>
										</div>
									</div>
								)}
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<Select.Async
										loadOptions={this.loadStaffs}
										loadingPlaceholder="Đang tải..."
										placeholder="Lead của"
										searchPromptText="Không có dữ liệu nhân viên"
										onChange={this.changeStaff}
										value={this.state.carer_id}
										optionRenderer={(option) => {
											return (
												<ItemReactSelect
													label={option.label}
													url={option.avatar_url}
												/>
											);
										}}
										valueRenderer={(option) => {
											return (
												<ItemReactSelect
													label={option.label}
													url={option.avatar_url}
												/>
											);
										}}
									/>
								</div>
							</div>
							<div className="col-md-4" style={{ zIndex: 0 }}>
								<Checkbox
									label={`Chọn tất cả (${this.props.totalCountModal})`}
									checkBoxLeft
									onChange={this.chooseAll}
									name="isAll"
									checked={this.state.isAll}
								/>
							</div>
							<div className="col-md-4">
								<FormInputText
									name="top"
									required
									type="number"
									placeholder="Nhập top"
									updateFormData={this.changeTop}
									value={this.state.top}
									className="none-padding none-margin"
								/>
							</div>
							<div className="col-md-4">
								<FormInputText
									name="paid_course_quantity"
									required
									type="number"
									placeholder="Số khóa đã nộp tiền"
									updateFormData={this.changeQuantity}
									value={this.state.paid_course_quantity}
									className="none-padding none-margin"
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<UsersList
									isAll={this.state.isAll}
									chosenItems={this.state.chosenItems}
									chooseItem={this.chooseItem}
									users={this.props.receiversModal}
									isLoading={this.props.isLoadingReceiversModal}
								/>
							</div>
						</div>
						<div className="row float-right">
							<div
								className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
								style={{ textAlign: 'right' }}>
								<b style={{ marginRight: '15px' }}>
									Hiển thị kêt quả từ {first}
									- {end}/{this.props.totalCountModal}
								</b>
								<br />
								<Pagination
									totalPages={this.props.totalPagesModal}
									currentPage={this.props.currentPageModal}
									loadDataPage={this.loadUsers}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<button className="btn" onClick={this.onHideModal}>
							Hủy
						</button>
						<button className="btn btn-success" onClick={this.submit}>
							Thêm
						</button>
					</div>
				</Modal.Footer>
			</Modal>
		);
	}
}

AddReceiverModal.propTypes = {
	campaignAction: PropTypes.object.isRequired,
	receiversModal: PropTypes.array.isRequired,
	isLoadingReceiversModal: PropTypes.bool.isRequired,
	currentPageModal: PropTypes.number.isRequired,
	limitModal: PropTypes.number.isRequired,
	totalCountModal: PropTypes.number.isRequired,
	totalPagesModal: PropTypes.number.isRequired,
	addReceiverModal: PropTypes.bool.isRequired,
	gens: PropTypes.array.isRequired,
	classes: PropTypes.array.isRequired,
	campaignId: PropTypes.string.isRequired,
	isChoosingReceivers: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		receiversModal: state.smsCampaign.receiversModal,
		isLoadingReceiversModal: state.smsCampaign.isLoadingReceiversModal,
		currentPageModal: state.smsCampaign.currentPageModal,
		limitModal: state.smsCampaign.limitModal,
		totalCountModal: state.smsCampaign.totalCountModal,
		totalPagesModal: state.smsCampaign.totalPagesModal,
		addReceiverModal: state.smsCampaign.addReceiverModal,
		gens: state.smsCampaign.gens,
		classes: state.smsCampaign.classes,
		isChoosingReceivers: state.smsCampaign.isChoosingReceivers
	};
}

function mapDispatchToProps(dispatch) {
	return {
		campaignAction: bindActionCreators(campaignAction, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReceiverModal);
