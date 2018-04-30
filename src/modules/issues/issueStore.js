import { observable, action } from "mobx";
import * as issueApi from "./issueApi";
import { showErrorNotification } from "../../helpers/helper";

export default new class IssueStore {
    @observable isLoading = false;
    @observable isCreating = false;ç
    @observable issues = [];
    @observable totalPages = 1;
    @observable currentPage = 1;

    @action
    loadIssues(search, status) {
        this.isLoading = true;
        issueApi
            .loadIssues(search, status)
            .then(res => {
                this.isLoading = false;
                this.issues = res.data.issues;
                this.totalPages = res.data.paginator.total_pages;
                this.currentPage = res.data.paginator.current_page;
            })
            .catch(() => {
                this.isLoading = false;
                showErrorNotification("Có lỗi xảy ra");
            });
    }

    @action
    createIssue(title, description, content) {
        this.isCreating = true;
        issueApi
            .createIssue(title, description, content)
            .then(res => {
                this.isCreating = false;
                this.issues = [...res.data.data.issue, this.issues];
            })
            .catch(() => {
                this.isCreating = false;
                showErrorNotification("Có lỗi xảy ra");
            });
    }
}();
