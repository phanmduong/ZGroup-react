import {observable, action, computed} from "mobx";
import {showErrorNotification} from "../../helpers/helper";
import * as crmAnalyticsApi from "./crmAnalyticsApi";

export default new class CRMAnalyticsStore {
    @observable isLoading = true;
    @observable analytics = {};

    @action
    loadAnalytics() {
        this.isLoading = true;
        crmAnalyticsApi
            .analytics()
            .then(res => {
                this.analytics = res.data.data.analytics;
                this.isLoading = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }

    @computed
    get analyticsData() {
        return [
            {
                title: 'Nhận biết',
                value: this.analytics.no_time
            }, {
                title: 'Thân thiết',
                value: this.analytics.one_time
            }, {
                title: 'Trung thành',
                value: this.analytics.more_times
            }
        ];
    }
}();
