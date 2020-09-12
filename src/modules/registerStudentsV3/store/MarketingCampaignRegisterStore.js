import {action, observable} from "mobx";
import {loadMarketingEmail} from "../../marketingCampaign/marketingCampaignApi";

export default class MarketingCampaignRegisterStore {
    @observable isLoading = false;
    @observable isLoaded = false;
    @observable campaigns = [];


    @action loadCampaigns() {
        this.isLoading = true;
        this.isLoaded = true;
        loadMarketingEmail(1, -1).then((res) => {
            this.campaigns = res.data.data.marketing_campaigns;
        }).catch(e => {
            console.log(e);
        }).finally(() => {
            this.isLoading = false;
        });

    }

};