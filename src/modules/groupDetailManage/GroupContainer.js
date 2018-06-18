import React from 'react';
import Pagination from '../../components/common/Pagination';
import TooltipButton from '../../components/common/TooltipButton';
import OverlappedCircles from '../../components/common/OverlappedCircles';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import { definePhoneHead } from '../../helpers/helper';
import { observer } from 'mobx-react';
import { store } from './groupStore';
import PropTypes from 'prop-types';
import AddMemberModal from './AddMemberModal';

@observer
class GroupContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.clusterId = this.props.params.clusterId;
		this.state = {
			page: 1,
			query: '',
			addMemberModal: false
		};
		this.timeOut = null;
	}

	componentWillMount() {
		store.loadAllMembers(this.clusterId, 1, '');
	}

	loadDataPage = (page = 1) => {
		store.loadAllMembers(this.clusterId, page, this.state.query);
	};

	showAddMemberModal = () => {
		this.setState({
			addMemberModal: true
		});
		store.getMembersModal(this.clusterId);
		store.loadAllGens();
		store.loadAllClasses();
	};

	membersSearchChange = (value) => {
		this.setState({
			query: value,
			page: 1
		});
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				store.loadAllMembers(this.clusterId, 1, value);
			}.bind(this),
			500
		);
	};

	render() {
		let first = store.totalCount ? (store.currentPage - 1) * store.limit + 1 : 0;
		let end = store.currentPage < store.totalPages ? store.currentPage * store.limit : store.totalCount;

		return (
			<div className="col-lg-12">
				<AddMemberModal
					clusterId={this.clusterId}
					addMemberModal={this.state.addMemberModal}
					onHide={() =>
						this.setState({
							addMemberModal: false
						})}
				/>
				<div className="card">
					<div className="card-content">
						<div className="tab-content">
							<div className="flex-row flex">
								<h5 className="card-title">
									<strong>{store.name}</strong>
								</h5>
								<div className="dropdown">
									<button
										className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
										type="button"
										data-toggle="dropdown"
										onClick={() => this.showAddMemberModal()}
									>
										<strong>+</strong>
									</button>
									{/* <ul className="dropdown-menu dropdown-primary">
										<li>
											<a
												onClick={() =>
													this.showAddMessageModal2({
														sms_template_type_id: 1
													})}
											>
												Thêm tin
											</a>
										</li>
										<li>
											<a onClick={() => this.showAddReceiverModal()}>Thêm người nhận</a>
										</li>
									</ul> */}
								</div>
							</div>
							<div>
								<Search
									onChange={this.membersSearchChange}
									value={this.state.query}
									placeholder="Nhập tên, email hoặc số điện thoại người dùng để tìm"
									disabled={store.isLoading}
								/>
								<br />
								{store.isLoading ? (
									<Loading />
								) : (
									<div className="table-responsive">
										<table className="table table-hover">
											<thead className="text-rose">
												<tr>
													<th />
													<th>Họ tên</th>
													<th>Email</th>
													<th>Số điện thoại</th>
													<th>Đã đóng tiền</th>
													<th />
												</tr>
											</thead>
											<tbody>
												{store.members &&
													store.members.map((receiver, index) => {
														const image = receiver.avatar_url
															? receiver.avatar_url.substring(0, 4) === 'http'
																? receiver.avatar_url
																: 'http://' + receiver.avatar_url
															: 'http://farm9.staticflickr.com/8130/29541772703_6ed8b50c47_b.jpg';
														return (
															<tr key={index}>
																<td>
																	<div>
																		<div
																			className="avatar-list-staff"
																			style={{
																				background:
																					'url(' +
																					image +
																					') center center / cover',
																				display: 'inline-block'
																			}}
																		/>
																	</div>
																</td>
																<td>
																	<b>{receiver.name}</b>
																</td>
																<td>{receiver.email}</td>
																<td>
																	<span style={{ width: '120px' }}>{receiver.phone}</span>
																	&ensp;
																	<span>
																		<img
																			style={{
																				width: '30px',
																				height: 'auto'
																			}}
																			src={definePhoneHead(receiver.phone)}
																		/>
																	</span>
																</td>
																<td>
																	<OverlappedCircles
																		circles={receiver.paid_money.map((course) => {
																			return {
																				image: course.image_url,
																				name: course.name
																			};
																		})}
																	/>
																</td>
																<td>
																	<div className="btn-group-action">
																		<TooltipButton placement="top" text="Sửa">
																			<a>
																				<i className="material-icons">edit</i>
																			</a>
																		</TooltipButton>
																		<TooltipButton placement="top" text="Xóa">
																			<a
																				onClick={() =>
																					this.removeUserFromCampaign(
																						receiver
																					)}
																			>
																				<i className="material-icons">delete</i>
																			</a>
																		</TooltipButton>
																	</div>
																</td>
															</tr>
														);
													})}
											</tbody>
										</table>
									</div>
								)}
								<div className="row float-right">
									<div
										className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
										style={{ textAlign: 'right' }}
									>
										<b style={{ marginRight: '15px' }}>
											Hiển thị kêt quả từ {first}
											- {end}/{store.totalCount}
										</b>
										<br />
										<Pagination
											totalPages={store.totalPages}
											currentPage={store.currentPage}
											loadDataPage={this.loadDataPage}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

GroupContainer.propTypes = {
	params: PropTypes.object.isRequired
};

export default GroupContainer;
