import {observable, computed, action} from "mobx";
import {getAllMarketingCampaigns, getAllSources, uploadImportData} from "./importApi";
import {sweetAlertError, sweetAlertSuccess, sweetAlertWaring} from "../../helpers/helper";

class Store {
    @observable steps = [];
    @observable currentOrder = 0;
    @observable dataCheck = {};
    @observable isUploading = false;

    constructor(steps) {
        this.steps = steps;
    }

    @computed get currentStep() {
        return this.steps[this.currentOrder];
    }

    getStep(order = this.currentOrder) {
        return this.steps[order];
    }

    @action
    getData() {
        getAllSources().then((res) => {
            this.dataCheck['sources'] = res.data.data.sources;
        });

        getAllMarketingCampaigns().then((res) => {
            this.dataCheck['marketing_campaigns'] = res.data.data.marketing_campaigns;
        });
    }

    @action
    uploadData(data, reset) {
        this.isUploading = true;
        uploadImportData(data).then((res) => {
            const dataRes = res.data.data;
            if (dataRes.error.length > 0) {
                sweetAlertWaring(`Import thành công ${data.length - dataRes.error.length} bản ghi, thất bại ${dataRes.error.length} bản ghi`)
                return;
            }
            sweetAlertSuccess(`Import thành công ${data.length - dataRes.error.length} bản ghi, thất bại ${dataRes.error.length} bản ghi`);
            reset();
        }).catch(() => {
            sweetAlertError("Import dữ liệu lỗi");
        }).finally(() => {
            this.isUploading = false;
        });


    }

}

export default Store;