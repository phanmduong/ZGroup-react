import {action, observable} from "mobx";
import {setExpenseSourceApi} from "./DashboardMarketingApi";
import {DATE_FORMAT_SQL} from "../../../constants/constants";


export default new class SetExpenseSource {
    @observable isStoring = false;
    @observable isLoading = false;
    @observable showModal = false;
    @observable selectedSource = {};
    @observable formData = {
        start_time: '',
        end_time: '',
        gen_id: 0,
        source_ids: [],
        money: 0
    };
    @observable historyFilter = {
        start_time: '',
        end_time: '',
    };

    @observable openHistoryPanel = false;

    @observable data = [];

    // @action
    // historyKpi = (filter) => {
    //     this.isLoading = true;
    //     filter = {...filter};
    //     filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
    //     filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
    //     getHistoryLeadKpiApi(filter).then((res) => {
    //         this.data = res.data.data;
    //     }).catch(() => {
    //         showErrorNotification("Có lỗi xảy ra");
    //     }).finally(() => {
    //         this.isLoading = false;
    //     });
    // };

    @action
    storeKpi = (callback) => {
        this.isStoring = true;
        const formData = {...this.formData};
        formData.start_time = formData.start_time.format(DATE_FORMAT_SQL);
        formData.end_time = formData.end_time.format(DATE_FORMAT_SQL);
        setExpenseSourceApi(formData).then(() => {
            if (callback) {
                callback();
            }
        }).catch(() => {

        }).finally(() => {
            this.isStoring = false;
        });
    }
}();
