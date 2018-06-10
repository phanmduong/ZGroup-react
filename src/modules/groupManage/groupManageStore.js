import { observable, action } from 'mobx';
import * as groupManageApi from './groupManageApi';
import { showTypeNotification, showErrorNotification, showNotification } from '../../helpers/helper';

export const store = new class {
	@observable isLoading = false;
	@observable groups = [];
	@observable totalCount = 0;
	@observable totalPages = 1;
	@observable currentPage = 1;
	@observable limit = 20;
	@observable isSavingGroup = false;
	@observable groupCreateEdit = {};
	@observable createEditCampaignModal = false;

	@action
	getGroupList(page, search) {
		this.isLoading = true;
		groupManageApi.getGroupListApi(page, search).then((res) => {
			this.groups = res.data.groups;
			this.totalCount = res.data.paginator.total_count;
			this.totalPages = res.data.paginator.total_pages;
			this.currentPage = res.data.paginator.current_page;
			this.limit = res.data.paginator.limit;
			this.isLoading = false;
		});
	}

	@action
	saveGroup(group) {
		showTypeNotification('Đang lưu nhóm', 'info');
		this.isSavingGroup = true;
		groupManageApi.saveGroupModal(group).then((res) => {
			if (res.data.status) {
				showNotification('Lưu nhóm thành công');
				this.createEditCampaignModal = false;
				this.getGroupList();
			} else {
				showErrorNotification(res.data.message.message);
			}
			this.isSavingGroup = false;
		});
	}

	@action
	openCreateEditGroupModal(group){
		this.createEditCampaignModal = true;
		this.groupCreateEdit = group;
	}

	@action
	closeCreateEditGroupModal() {
		this.createEditCampaignModal = false;
	}

	@action
	handleCreateEditGroupModal(event) {
		const field = event.target.name;
		let groupCreateEdit = {
			...this.groupCreateEdit,
			[field]: event.target.value
		};
		this.groupCreateEdit = groupCreateEdit;
	}
}();
