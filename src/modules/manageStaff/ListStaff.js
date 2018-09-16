import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from '../../components/common/ButtonGroupAction';
import * as helper from '../../helpers/helper';
import { NO_AVATAR } from '../../constants/env';
import { Link } from 'react-router';

let self;

class ListStaff extends React.Component {
	constructor(props, context) {
		super(props, context);
		self = this;
	}

	render() {
		let { staffs, roles, bases, departments } = this.props;
		return (
			<div className="col-md-12">
				<div className="table-responsive">
					<table className="table">
						<thead className="text-rose">
							<tr>
								<th />
								<th>Họ tên</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Cơ sở</th>
								<th>Chức vụ</th>
								<th>Bộ phận</th>
								{!this.props.disableActions && <th />}
							</tr>
						</thead>
						<tbody>
							{staffs.map((staff, index) => {
								let avatar = helper.avatarEmpty(staff.avatar_url)
									? NO_AVATAR
									: staff.avatar_url;
								return (
									<tr key={index}>
										<td>
											<div
												className="avatar-list-staff"
												style={{
													background: 'url(' + avatar + ') center center / cover',
													display: 'inline-block'
												}}
											/>
										</td>
										<td>
											<Link to={`hr/staff/${staff.id}/info`}>{staff.name}</Link>
										</td>
										<td>{staff.email}</td>
										<td>{staff.phone}</td>
										<td>
											{bases !== null &&
											bases.length > 0 && (
												<select
													disabled={this.props.disableActions}
													className="form-control"
													value={staff.base_id}
													onChange={(event) => {
														self.props.changeBaseStaff(
															staff.id,
															event.target.value
														);
													}}>
													{bases.map((base, key) => {
														return (
															<option key={key} value={base.id}>
																{!helper.isEmptyInput(base.name) &&
																	`${base.name}: ${base.address}`}
															</option>
														);
													})}
												</select>
											)}
										</td>
										<td>
											{roles !== null &&
											roles !== undefined && (
												<select
													disabled={this.props.disableActions}
													className="form-control"
													value={staff.role_id}
													onChange={(event) => {
														self.props.changeRoleStaff(
															staff.id,
															event.target.value
														);
													}}>
													{roles.map((role, key) => {
														return (
															<option key={key} value={role.id}>
																{role.role_title}
															</option>
														);
													})}
												</select>
											)}
										</td>
										<td>
											{departments !== null &&
											departments !== undefined && (
												<select
													disabled={this.props.disableActions}
													className="form-control"
													value={staff.department_id}
													onChange={(event) => {
														self.props.changeDepartmentStaff(
															staff.id,
															event.target.value
														);
													}}>
													{departments.map((department, key) => {
														return (
															<option key={key} value={department.id}>
																{department.name}
															</option>
														);
													})}
												</select>
											)}
										</td>

										{!this.props.disableActions && (
											<td>
												<ButtonGroupAction
													delete={self.props.deleteStaff}
													editUrl={`/hr/staff/${staff.id}/edit`}
													object={staff}
												/>
											</td>
										)}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

ListStaff.propTypes = {
	roles: PropTypes.array.isRequired,
	staffs: PropTypes.array.isRequired,
	bases: PropTypes.array.isRequired,
	departments: PropTypes.array.isRequired,
	changeRoleStaff: PropTypes.func.isRequired,
	changeBaseStaff: PropTypes.func.isRequired,
	changeDepartmentStaff: PropTypes.func.isRequired,
	deleteStaff: PropTypes.func.isRequired,
	disableActions: PropTypes.bool.isRequired,
	titleList: PropTypes.string.isRequired
};

export default ListStaff;
