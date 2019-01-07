import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormInputDate from '../../components/common/FormInputDate';
import Star from '../../components/common/Star';
import Checkbox from '../../components/common/Checkbox';
import FormInputText from '../../components/common/FormInputText';
import UserList from './UserList';
import Pagination from '../../components/common/Pagination';
import { isEmptyInput, showErrorNotification } from '../../helpers/helper';
import PropertyReactSelectValue from '../createProduct/PropertyReactSelectValue';
import Select from 'react-select';
import ItemReactSelect from '../../components/common/ItemReactSelect';
import { searchStaffs, getMembersModal } from './groupApi';
import Loading from '../../components/common/Loading';
import { observer } from 'mobx-react';
import { store } from './groupStore';

@observer
class AddMemberModal extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.clusterId = this.props.clusterId;
		this.timeOut = null;
		this.state = {
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
			limit: 10,
			paid_course_quantity: null
		};
	}

	updateFormDate = (event) => {
		const field = event.target.name;
		let time = { ...this.state.time };
		time[field] = event.target.value;
		this.setState({
			time: time,
			page: 1
		});
		store.isAll = false;
		store.chosenItems = [];
		if (!isEmptyInput(time.startTime) && !isEmptyInput(time.endTime)) {
			store.getMembersModal(
				this.clusterId,
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
		}
	};

	loadStaffs = (input, callback) => {
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
	};

	changeTop = (event) => {
		const value = event.target.value;
		this.setState({
			top: value,
			page: 1
		});
		store.chosenItems = [];
		store.isAll = false;
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				store.getMembersModal(
					this.clusterId,
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
			}.bind(this),
			500
		);
	};

	gensSearchChange = (value) => {
		this.setState({
			page: 1,
			gens: value
		});
		store.chosenItems = [];
		store.isAll = false;
		store.getMembersModal(
			this.clusterId,
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
	};

	classesSearchChange = (value) => {
		this.setState({
			page: 1,
			classes: value
		});
		store.chosenItems = [];
		store.isAll = false;
		store.getMembersModal(
			this.clusterId,
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
	};

	changeStaff = (value) => {
		if (value) {
			this.setState({
				page: 1,
				carer_id: value.id
			});
			store.chosenItems = [];
			store.isAll = false;
			store.getMembersModal(
				this.clusterId,
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
				carer_id: null
			});
			store.chosenItems = [];
			store.isAll = false;
			store.getMembersModal(
				this.clusterId,
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
	};

	changeRate = (value) => {
		this.setState({
			page: 1,
			rate: value
		});
		store.chosenItems = [];
		store.isAll = false;
		store.getMembersModal(
			this.clusterId,
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
	};

	changeQuantity = (event) => {
		const value = event.target.value;
		this.setState({
			paid_course_quantity: value,
			page: 1
		});
		store.chosenItems = [];
		store.isAll = false;
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				store.getMembersModal(
					this.clusterId,
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
			}.bind(this),
			500
		);
	};

	loadUsers = (page = 1) => {
		this.setState({ page: page });
		store.getMembersModal(
			this.clusterId,
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
	};

	chooseAll = (event) => {
		store.isAll = event.target.checked;
		this.changeStatusAll(event.target.checked);
	};

	changeStatusAll = (status) => {
		let users = store.users.map((user) => {
			return {
				...user,
				checked: status
			};
		});
		let chosenItems = store.chosenItems.map((user) => {
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
		store.chosenItems = [ ...chosenItems.filter((user) => user.checked) ];
	};

	chooseItem = (id, checked) => {
		if (!checked) {
			let chosenItems = store.chosenItems.map((item) => {
				if (id === item.id) {
					return {
						...item,
						checked: false
					};
				}
				return item;
			});

			store.chosenItems = chosenItems;

			store.isAll = false;
		} else {
			let inArray = false;
			let chosenItems = store.chosenItems.map((item) => {
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
			store.chosenItems = chosenItems;
		}
	};

	onHideModal = () => {
		this.props.onHide();
		let time = {
			startTime: '',
			endTime: ''
		};
		store.isAll = false;
		store.chosenItems = [];
		this.setState({
			page: 1,
			gens: [],
			classes: [],
			time: time,
			top: null,
			carer_id: null,
			paid_course_quantity: null,
			rate: null
		});
	};

	submit = () => {
		store.beginSubmit();
		if (store.isAll && !this.state.top) {
			getMembersModal(
				this.clusterId,
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
				store.chooseMembers(this.clusterId, users);
			});
		} else {
			if (store.chosenItems.length === 0) {
				showErrorNotification('Bạn chưa chọn người để thêm vào nhóm');
			} else store.chooseMembers(this.clusterId, store.chosenItems);
		}
		let time = {
			startTime: '',
			endTime: ''
		};
		store.isAll = false;
		store.chosenItems = [];
		this.setState({
			page: 1,
			gens: [],
			classes: [],
			time: time,
			top: null,
			carer_id: null,
			paid_course_quantity: null,
			rate: null
		});
	};

	render() {
		let first = store.totalCountModal ? (store.currentPageModal - 1) * store.limitModal + 1 : 0;
		let end =
			store.currentPageModal < store.totalPagesModal
				? store.currentPageModal * store.limitModal
				: store.totalCountModal;

		return (
			<Modal show={this.props.addMemberModal} onHide={() => this.onHideModal()} bsSize="large">
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
						}}
					>
						<div className="row">
							<div className="col-md-6">
								<Select.Creatable
									multi={true}
									placeholder="Chọn khóa (nhiều)"
									options={store.gens.map((course) => {
										return {
											value: course.id,
											label: course.name
										};
									})}
									onChange={this.gensSearchChange}
									value={this.state.gens}
									valueComponent={PropertyReactSelectValue}
									disabled={store.isLoadingMembersModal}
								/>
							</div>
							<div className="col-md-6">
								<Select.Creatable
									multi={true}
									placeholder="Chọn lớp (nhiều)"
									options={store.classes.map((studyClass) => {
										return {
											value: studyClass.id,
											label: studyClass.name
										};
									})}
									onChange={this.classesSearchChange}
									value={this.state.classes}
									valueComponent={PropertyReactSelectValue}
									disabled={store.isLoadingMembersModal}
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
									disabled={store.isLoadingMembersModal}
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
									disabled={store.isLoadingMembersModal}
								/>
							</div>

							<div className="col-md-6">
								{store.isChoosingMembers ? (
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
												disable={store.isLoadingMembersModal}
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
											return <ItemReactSelect label={option.label} url={option.avatar_url} />;
										}}
										valueRenderer={(option) => {
											return <ItemReactSelect label={option.label} url={option.avatar_url} />;
										}}
										disabled={store.isLoadingMembersModal}
									/>
								</div>
							</div>
							<div className="col-md-4" style={{ zIndex: 0 }}>
								<Checkbox
									label={`Chọn tất cả (${store.totalCountModal})`}
									checkBoxLeft
									onChange={this.chooseAll}
									name="isAll"
									checked={store.isAll}
									disabled={store.isLoadingMembersModal}
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
									disabled={store.isLoadingMembersModal}
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
									disabled={store.isLoadingMembersModal}
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-12">
								<UserList isAll={store.isAll} chooseItem={this.chooseItem} />
							</div>
						</div>
						<div className="row float-right">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'right' }}>
								<b style={{ marginRight: '15px' }}>
									Hiển thị kêt quả từ {first}
									- {end}/{store.totalCountModal}
								</b>
								<br />
								<Pagination
									totalPages={store.totalPagesModal}
									currentPage={store.currentPageModal}
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

AddMemberModal.propTypes = {
	clusterId: PropTypes.string.isRequired,
	addMemberModal: PropTypes.bool.isRequired,
	onHide: PropTypes.func.isRequired
};

export default AddMemberModal;
