import {observable, action, computed} from "mobx";
import {showErrorNotification} from "../../helpers/helper";
import * as crmAnalyticsApi from "./crmAnalyticsApi";

export default new class CRMAnalyticsStore {
    @observable isLoading = true;
    @observable analytics = {};
    @observable isLoadingCampaigns = true;
    @observable campaigns = [];
    @observable selectedCampaignId = 0;

    @action
    loadAnalytics() {
        this.isLoading = true;
        crmAnalyticsApi
            .analytics(this.selectedCampaignId)
            .then(res => {
                this.analytics = res.data.data.analytics;
                this.isLoading = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }

    @action

    loadCampaigns() {
        this.isLoadingCampaigns = true;
        crmAnalyticsApi
            .allCampagins()
            .then(res => {
                this.campaigns = res.data.data.marketing_campaigns;
                this.isLoadingCampaigns = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingCampaigns = false;
            });
    }

    @computed
    get analyticsData() {
        return [
            {
                title: 'Nhận biết',
                value: this.analytics.no_time
            }, {
                title: 'Dùng thử',
                value: this.analytics.one_time
            }, {
                title: 'Thân thiết',
                value: this.analytics.two_times
            }, {
                title: 'Trung thành',
                value: this.analytics.more_times
            }
        ];
    }

    @computed
    get campaignsData() {
        let campaignsData = this.campaigns.map(function (campaign) {
            return {
                key: campaign.id,
                value: campaign.name
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            }, {
                key: -1,
                value: "Không chiến dịch"
            },
            {
                key: -2,
                value: "Có chiến dịch"
            },
            ...campaignsData
        ];
    }


}();
