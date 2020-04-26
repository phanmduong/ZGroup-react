import {action, observable} from "mobx";
import {getHistoryCourseKpiApi, setCourseKpiApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";
import {DATE_FORMAT_SQL} from "../../../constants/constants";


export default new class SetCourseKpiStore {
    @observable isStoring = false;
    @observable isLoading = false;
    @observable showModal = false;
    @observable selectedCourse = {};
    @observable setKpi = {
        start_time: '',
        end_time: '',
        course_ids: [],
        money: 0
    };
    @observable historyFilter = {
        start_time: '',
        end_time: '',
    };

    @observable openHistoryPanel = false;

    @observable data = [];

    @action
    historyKpi = (filter) => {
        this.isLoading = true;
        filter = {...filter};
        filter.start_time = filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filter.end_time.format(DATE_FORMAT_SQL);
        getHistoryCourseKpiApi(filter).then((res) => {
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
        setCourseKpiApi(kpi).then(() => {
            if (callback) {
                callback();
            }
        }).catch(() => {

        }).finally(() => {
            this.isStoring = false;
        });
    }
}();
