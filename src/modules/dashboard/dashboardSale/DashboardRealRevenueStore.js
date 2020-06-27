import {action, observable} from "mobx";
import {analyticsRealRevenueApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";


export default class DashboardRealRevenueStore {
    @observable isLoading = false;
    @observable data = {};

    @action
    analyticsRegister = (filter) => {
        this.isLoading = true;
        analyticsRealRevenueApi(filter).then((res) => {
            this.data = res.data.analytics;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

}
