import React from 'react';
import PropTypes from 'prop-types';
//import TooltipButton from "../../components/common/TooltipButton";
import Loading from '../../components/common/Loading';
import OverlappedCircles from '../../components/common/OverlappedCircles';
import * as helper from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import Star from '../../components/common/Star';
import Checkbox from '../../components/common/Checkbox';
import { store } from './groupStore';
import { observer } from 'mobx-react';

@observer
class UserList extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	isCheckedUser = (userId) => {
		const users = store.chosenItems.filter((user) => user.id === userId);
		if (users.length > 0) return this.props.isAll || !!users[0].checked;
		return false;
	};

	render() {
		return (
			<div>
				{store.isLoadingMembersModal ? (
					<Loading />
				) : (
					<div className="table-responsive">
						<table className="table table-hover">
							<thead className="text-rose">
								<tr className="text-rose">
									<th />
									<th />
									<th>Họ tên</th>
									<th>Email</th>
									<th>Số điện thoại</th>
									<th>Đánh giá</th>
									<th>Nhân viên</th>
									<th>Thời gian</th>
									<th>Đã đóng tiền</th>
								</tr>
							</thead>
							<tbody>
								{store.users &&
									store.users.map((user, index) => {
										const image = user.avatar_url
											? user.avatar_url.substring(0, 4) === 'http'
												? user.avatar_url
												: 'http://' + user.avatar_url
											: 'http://farm9.staticflickr.com/8130/29541772703_6ed8b50c47_b.jpg';
										return (
											<tr key={index}>
												<td>
													<Checkbox
														checked={this.isCheckedUser(user.id)}
														onChange={(e) =>
															this.props.chooseItem(user.id, e.target.checked)}
														disabled={store.isLoadingMembersModal}
													/>
												</td>
												<td>
													<img
														style={{
															width: '30px',
															height: '30px',
															borderRadius: '50%',
															verticalAlign: 'middle',
															background: 'url(' + image + ') center center / cover',
															display: 'inline-block',
															float: 'right',
															marginLeft: '3px'
														}}
														data-toggle="tooltip"
														title=""
														type="button"
														rel="tooltip"
														data-original-title=""
													/>
												</td>
												<td>
													<b>{user.name}</b>
												</td>
												<td>{user.email}</td>
												<td>{user.phone}</td>
												<td>
													<Star maxStar={5} value={user.rate} disable />
												</td>
												<td>
													{user.carer.id ? (
														<TooltipButton text={user.carer.name} placement="top">
															<span
																className="btn"
																style={{
																	backgroundColor: user.carer.color
																		? '#' + user.carer.color
																		: ''
																}}
															>
																{helper.getShortName(user.carer.name)}
															</span>
														</TooltipButton>
													) : (
														<div>Không có</div>
													)}
												</td>
												<td>
													<div
														style={{
															cursor: 'default'
														}}
														className="btn btn-sm btn-simple btn-main text-name-student-register"
													>
														{user.time}
													</div>
												</td>
												<td>
													<OverlappedCircles
														circles={user.paid_money.map((course) => {
															return {
																image: course.image_url,
																name: course.name
															};
														})}
													/>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}
}

UserList.propTypes = {
	isAll: PropTypes.bool.isRequired,
	chooseItem: PropTypes.func.isRequired
};

export default UserList;
