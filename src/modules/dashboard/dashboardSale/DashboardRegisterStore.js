import {action, observable} from "mobx";
import {analyticsRegisterApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";


export default class DashboardRegisterStore {
    @observable isLoading = false;
    @observable data = {};

    @action
    analyticsRegister = (filter) => {
        this.isLoading = true;
        analyticsRegisterApi(filter).then((res) => {
            this.data = res.data.analytics;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

}
