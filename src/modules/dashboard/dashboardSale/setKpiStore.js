import {action, computed, observable} from "mobx";
import {getHistoryKpiApi, setKpiApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";
import {DATE_FORMAT_SQL} from "../../../constants/constants";


export default new class SetKpiStore {
    @observable isStoring = false;
    @observable isLoading = false;
    @observable showModal = false;
    @observable selectedSaler = {};
    @observable setKpi = {
        start_time: '',
        end_time: '',
        user_ids: [],
        money: 0
    };

    @observable openHistoryPanel = false;

    @observable data = [];

    @action
    historyKpi = (filter) => {
        this.isLoading = true;
        filter = {...filter};
        filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
        getHistoryKpiApi(filter).then((res) => {
            this.data = res.data.data;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

    @action
    storeKpi = (callback) => {
        this.isStoring = true;
        const kpi = {...this.setKpi};
        kpi.start_time = kpi.start_time.format(DATE_FORMAT_SQL);
        kpi.end_time = kpi.end_time.format(DATE_FORMAT_SQL);
        setKpiApi(kpi).then(() => {
            if (callback) {
                callback();
            }
        }).catch(() => {

        }).finally(() => {
            this.isStoring = false;
        });
    }

    @computed
    get dataSet() {
        const labels = this.history.map((item) => item.date);
        return {
            labels: labels,
            datasets: [
                {
                    label: "KPI",
                    backgroundColor: '#4caa00',
                    borderColor: '#4caa00',
                    data: [],
                },
                {
                    label: "Doanh thu",
                    backgroundColor: '#ff4444',
                    borderColor: '#ff4444',
                    data: [],
                },
            ]
        };
    }

}();
