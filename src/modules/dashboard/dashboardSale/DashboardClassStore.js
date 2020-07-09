import {action, observable} from "mobx";
import {loadClassesApi} from "./dashboardSaleApi";
import {showErrorNotification, showNotification, showTypeNotification} from "../../../helpers/helper";
import {changeClassStatus} from "../dashboardApi";


export default class DashboardClassStore {
    @observable isLoading = false;
    @observable classes = [];
    @observable currentTab = "registering";

    @action
    loadClasses = (filter) => {
        this.isLoading = true;
        if (this.currentTab == "registering") {
            filter = {...filter, ...{enroll_start_date: filter.start_time, enroll_end_date: filter.end_time}};
        } else {
            filter = {...filter, ...{start_date: filter.start_time, end_date: filter.end_time}};
        }

        loadClassesApi(filter).then((res) => {
            this.classes = res.data.classes;
            console.log(this.classes);
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

    @action
    changeClassStatus = (classId) => {
        showTypeNotification("Đang thay đổi", "info");
        this.classes = this.classes.map((item) => {
            if (item.id == classId) {
                return {...item, status: item.status == 0 ? 1 : 0};
            } else return item;
        });
        changeClassStatus(classId).then(() => {
            showNotification("Thay đổi thành công");
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        });
    }

}
