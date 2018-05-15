import { observable, action } from "mobx";
import * as issueApi from "./issueApi";
import { showErrorNotification } from "../../helpers/helper";

export default new class IssueStore {
    @observable isLoading = false;
    @observable isCreating = false;
    @observable issues = [];
    @observable totalPages = 1;
    @observable currentPage = 1;
    @observable search = "";
    @observable status = "";

    @action
    loadIssues() {
        this.isLoading = true;
        issueApi
            .loadIssues(this.search, this.status, this.currentPage)
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
            .then(() => {
                this.isCreating = false;
                this.search = "";
                this.status = "";
                this.currentPage = 1;
                this.loadIssues();
            })
            .catch(() => {
                this.isCreating = false;
                showErrorNotification("Có lỗi xảy ra");
            });
    }
}();
