import {action, observable} from "mobx";
import {showErrorNotification} from "../../../helpers/helper";
import {analyticsRevenueApi} from "./dashboardSaleApi";

class CardRevenueStore {
    @observable isLoading = false;
    @observable data = {};

    @action
    analyticsRevenue = (filter) => {
        this.isLoading = true;
        analyticsRevenueApi(filter).then((res) => {
            this.data = res.data.analytics;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

}

export default new CardRevenueStore();
