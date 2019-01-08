import { observable, action } from 'mobx';
import * as groupApi from './groupApi';
import { showTypeNotification, showNotification } from '../../helpers/helper';

export const store = new class {
	@observable isLoading = false;
	@observable isAll = false;
	@observable chosenItems = [];
	@observable members = [];
	@observable totalCount = 0;
	@observable totalPages = 1;
	@observable currentPage = 1;
	@observable limit = 20;
	@observable name = '';
	@observable users = [];
	@observable isLoadingMembersModal = false;
	@observable totalCountModal = 0;
	@observable totalPagesModal = 0;
	@observable currentPageModal = 1;
	@observable limitModal = 10;
	@observable isChoosingMembers = false;
	@observable gens = [];
	@observable classes = [];
	@observable isGlobalLoading = false;

	@action
	loadAllMembers(clusterId, page, search) {
		this.isLoading = true;
		groupApi.loadAllMembersApi(clusterId, page, search).then((res) => {
			this.members = res.data.members;
			this.totalCount = res.data.paginator.total_count;
			this.totalPages = res.data.paginator.total_pages;
			this.currentPage = res.data.paginator.current_page;
			this.limit = res.data.paginator.limit;
			this.isLoading = false;
			this.name = res.data.group.name;
		});
	}

	@action
	getMembersModal(
		clusterId,
		page,
		gens,
		classes,
		start_time,
		end_time,
		top,
		carer_id,
		rate,
		limit,
		paid_course_quantity
	) {
		this.isLoadingMembersModal = true;
		groupApi
			.getMembersModal(
				clusterId,
				page,
				gens,
				classes,
				start_time,
				end_time,
				top,
				carer_id,
				rate,
				limit,
				paid_course_quantity
			)
			.then((res) => {
				if (this.isAll) {
					let chosenItems = [ ...this.chosenItems ];
					res.data.users.forEach((user) => {
						chosenItems = [
							...chosenItems,
							{
								id: user.id,
								checked: true
							}
						];
					});
					store.chosenItems = chosenItems;
				}
				this.isLoadingMembersModal = false;
				this.users = res.data.users;
				this.currentPageModal = res.data.paginator.current_page;
				this.limitModal = res.data.paginator.limit;
				this.totalCountModal = res.data.paginator.total_count;
				this.totalPagesModal = res.data.paginator.total_pages;
			});
	}

	@action
	beginSubmit() {
		this.isGlobalLoading = true;
		showTypeNotification('Đang thêm người dùng', 'info');
	}

	@action
	chooseMembers(clusterId, users) {
		this.isChoosingMembers = true;
		groupApi.chooseMembers(clusterId, users).then(() => {
			this.isChoosingMembers = false;
			showNotification('Đã thêm người nhận vào chiến dịch');
			this.loadAllMembers(clusterId, 1, '');
			this.getMembersModal(clusterId);
			this.isGlobalLoading = false;
		});
	}

	@action
	loadAllGens() {
		groupApi.loadAllGens().then((res) => {
			this.gens = res.data.data.gens;
		});
	}

	@action
	loadAllClasses() {
		groupApi.loadAllClasses().then((res) => {
			this.classes = res.data.data.classes;
		});
	}
}();
