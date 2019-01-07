import React from 'react';
import { Link } from 'react-router';
import TooltipButton from '../../components/common/TooltipButton';
//import {dotNumber} from '../../helpers/helper';
import { observer } from 'mobx-react';
import { store } from './groupManageStore';

@observer
class GroupManageComponent extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div className="table-responsive">
				<table className="table table-hover">
					<thead className="text-rose">
						<tr className="text-rose">
							<th />
							<th>Tên nhóm</th>
							<th>Mô tả ngắn</th>
							<th>Số người</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{store.groups &&
							store.groups.map((group, index) => {
								const name = group.name.length < 15 ? group.name : group.name.substring(0, 14) + '...';
								const image = group.creator.avatar_url
									? group.creator.avatar_url.substring(0, 4) === 'http'
										? group.creator.avatar_url
										: 'http://' + group.creator.avatar_url
									: 'http://farm9.staticflickr.com/8130/29541772703_6ed8b50c47_b.jpg';
								const description =
									group.description.length < 25
										? group.description
										: group.description.substring(0, 24) + '...';

								return (
									<tr key={index}>
										<td>
											<TooltipButton text={group.creator.name} placement="top">
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
											</TooltipButton>
										</td>
										<td>
											<TooltipButton text={group.name} placement="top">
												<Link
													to={`/group/group-detail/${group.id}`}
													className="text-name-student-register"
													rel="tooltip"
													title=""
													data-original-title="Remove item"
												>
													{name}
												</Link>
											</TooltipButton>
										</td>
										<td>
											<TooltipButton text={group.description} placement="top">
												<span>{description}</span>
											</TooltipButton>
										</td>
										<td>
											{group.quantity}
										</td>
										<td>
											<div className="btn-group-action">
												<a
													style={{ color: '#878787' }}
													data-toggle="tooltip"
													title=""
													type="button"
													rel="tooltip"
													onClick={() => store.openCreateEditGroupModal(group)}
												>
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
		);
	}
}

export default GroupManageComponent;
