import {action, get, observable} from "mobx";
import {analyticsKpiApi} from "./dashboardSaleApi";
import {showErrorNotification} from "../../../helpers/helper";
import {NO_AVATAR} from "../../../constants/env";


export default class DashboardKpiStore {
    @observable isLoading = false;
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

    @get
    get totalKpi() {
        return this.data && this.data.length > 0 ? this.data.reduce((a, b) => {
            return {
                "name": "Tất cả nhân viên",
                "avatar_url": NO_AVATAR,
                "total_register": a.total_register + b.total_register,
                "total_paid_register": a.total_paid_register + b.total_paid_register,
                "kpi": a.kpi + b.kpi,
                "revenue": a.revenue + b.revenue,
            };
        }) : {
            "name": "Tất cả nhân viên",
            "avatar_url": NO_AVATAR,
            "total_register": 0,
            "total_paid_register": 0,
            "kpi": 0,
            "revenue": 0,
        };
    }

}
