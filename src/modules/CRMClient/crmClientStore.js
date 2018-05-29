import {observable, action, computed} from "mobx";
import {showErrorNotification} from "../../helpers/helper";
import * as crmClientApi from "./crmClientApi";

export default new class CRMAnalyticsStore {
    @observable isLoading = true;
    @observable clients = [];
    @observable isLoadingCampaigns = true;
    @observable campaigns = [];
    @observable selectedCampaignId = 0;
    @observable selectedTypeClient = -1;
    @observable currentPage = 1;
    @observable totalPages = 1;

    @action
    loadClients() {
        this.isLoading = true;
        crmClientApi
            .clients(this.currentPage, this.selectedCampaignId, this.selectedTypeClient)
            .then(res => {
                this.isLoading = false;
                this.clients = res.data.users;
                this.currentPage = res.data.paginator.current_page;
                this.totalPages = res.data.paginator.total_pages;

            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }

    @action

    loadCampaigns() {
        this.isLoadingCampaigns = true;
        crmClientApi
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
