import {action, observable} from "mobx";
import {loadClassesApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";


export default class DashboardClassStore {
    @observable isLoading = false;
    @observable classes = [];

    @action
    loadClasses = (filter) => {
        this.isLoading = true;
        loadClassesApi(filter).then((res) => {
            this.classes = res.data.classes;
            console.log(this.classes);
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra")
        }).finally(() => {
            this.isLoading = false;
        });
    };

}
