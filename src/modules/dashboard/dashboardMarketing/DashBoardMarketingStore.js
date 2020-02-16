import {action, computed, observable} from "mobx";
import {analyticsLead} from "./DashboardMarketingApi";
import {showErrorNotification} from "../../../helpers/helper";
import {DATE_FORMAT_SQL} from "../../../constants/constants";

export const store = new class Store {
    @observable isLoading = false;
    @observable data = {
        analytics: {
            dates: [],
            leadsCountByDates: [],
            leadsReachedCountByDates: [],
            leadsComebackCountByDates: [],
            leadsComebackTwiceCountByDates: [],
        }
    };
    @observable filter = {
        start_time: moment().subtract(350, 'days').format(DATE_FORMAT_SQL),
        end_time: moment().subtract(150, 'days').format(DATE_FORMAT_SQL),
    };

    @action
    getSumArray = (field) => {
        let count = 0;
        let arr = this.data.analytics[field];
        if(arr) arr.forEach(c => count += c);
        return count;
    }

    @action
    load = () => {
        this.isLoading = true;
        analyticsLead(this.filter).then((res) => {
            this.data.analytics = res.data.analytics;
        }).catch(e => {
            console.log(e);
            showErrorNotification('Có lỗi xảy ra!');
        }).finally(() => {
            this.isLoading = false;
        });
    };

}();
