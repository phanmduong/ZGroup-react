import {action, observable} from "mobx";
import {analyticsKpiApi, setKpiApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";


export default new class SetKpiStore {
    @observable isStoring = false;
    @observable showModal = false;
    @observable selectedSaler = {};
    @observable setKpi = {
        start_time: '',
        end_time: '',
        user_ids: [],
        money: 0
    };

    @observable data = [];

    @action
    analyticsKpi = (filter) => {
        this.isLoading = true;
        analyticsKpiApi(filter).then((res) => {
            this.data = res.data.analytics;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

    @action
    storeKpi = (callback) => {
        this.isStoring = true;
        setKpiApi(this.setKpi).then(() => {
            if (callback) {
                callback();
            }
        }).catch(() => {

        }).finally(() => {
            this.isStoring = false;
        })
    }

}();
