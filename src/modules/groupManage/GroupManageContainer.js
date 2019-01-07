import React from 'react';
import Pagination from '../../components/common/Pagination';
import Search from '../../components/common/Search';
import Loading from '../../components/common/Loading';
import GroupManageComponent from './GroupManageComponent';
import { observer } from 'mobx-react';
import { store } from './groupManageStore';
import CreateEditGroupModal from './CreateEditGroupModal';

@observer
class GroupManageContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.timeOut = null;
		this.state = {
			page: 1,
			query: ''
		};
	}

	componentWillMount() {
		store.getGroupList();
	}

	groupsSearchChange = (value) => {
		this.setState({
			query: value,
			page: 1
		});
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				store.getGroupList(1, this.state.query);
			}.bind(this),
			500
		);
	};

	loadDataPage(page = 1) {
		store.getGroupList(page, this.state.query);
	}

	render() {
		let first = store.totalCount ? (store.currentPage - 1) * store.limit + 1 : 0;
		let end = store.currentPage < store.totalPages ? store.currentPage * store.limit : store.totalCount;

		return (
			<div className="card">
				<CreateEditGroupModal />
				<div className="card-content">
					<div className="tab-content">
						<div className="flex-row flex">
							<h5 className="card-title">
								<strong>Danh sách nhóm</strong>
							</h5>
							<div className="dropdown">
								<button
									className="btn btn-primary btn-round btn-xs dropdown-toggle button-add none-margin"
									type="button"
									//data-toggle="dropdown"
									onClick={() => store.openCreateEditGroupModal({})}
								>
									<strong>+</strong>
								</button>
								{/* <ul className="dropdown-menu dropdown-primary">
									<li>
										<a
											onClick={() =>
												this.showCreateEditCampaignModal({
													status: 'open'
												})}
										>
											Thêm chiến dịch
										</a>
									</li>
									<li>
										<a onClick={() => store.showManageTemplateTypesModal()}>
											Thêm loại tin nhắn
										</a>
									</li>
								</ul> */}
							</div>
						</div>
						<Search
							onChange={this.groupsSearchChange}
							value={this.state.query}
							placeholder="Nhập tên nhóm để tìm"
							disabled={store.isLoading}
						/>
					</div>
					<br />
					{store.isLoading ? <Loading /> : <GroupManageComponent />}
					<div className="row float-right">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ textAlign: 'right' }}>
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
		);
	}
}

export default GroupManageContainer;
