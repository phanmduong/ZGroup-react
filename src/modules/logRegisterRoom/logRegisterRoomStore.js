import { observable, action } from "mobx";
import { showErrorNotification } from "../../helpers/helper";
import * as logRegisterRoomApi from "./logRegisterRoomApi";

export default new class DashboardTrongDongStore {
  @observable isLoading = false;
  @observable currentPage = 1;
  @observable totalPages = 1;
  @observable logs = [];

  @action
  loadLogs() {
    this.isLoading = true;
    logRegisterRoomApi
      .loadLogs(this.currentPage)
      .then(res => {
        this.isLoading = false;
        this.logs = res.data.logs;
        this.currentPage = res.data.paginator.current_page;
        this.totalPages = res.data.paginator.total_pages;
      })
      .catch(() => {
        showErrorNotification("Có lỗi xảy ra.");
        this.isLoading = false;
      });
  }
}();
