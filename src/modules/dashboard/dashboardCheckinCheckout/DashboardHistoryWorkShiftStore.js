import {action, computed, observable} from "mobx";
import {convertTimeToSecond, showErrorNotification} from "../../../helpers/helper";
import {historyCheckinoutWorkShiftApi} from "./dashboardCheckinCheckoutApi";
import {isEmpty} from "../../../helpers/entity/mobx";
import filterStore from "./filterStore";


export default class DashboardHistoryWorkShiftStore {
    @observable isLoading = false;
    @observable history = [];

    @action
    loadClasses = (filter) => {
        this.isLoading = true;
        historyCheckinoutWorkShiftApi(filter).then((res) => {
            this.history = res.data.history;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

    @computed
    get work_shifts() {
        let data = this.history.map((item) => {
            let users = item.users.map((user) => {
                let shifts = user.work_shifts.map((shift) => {
                    const startTime = convertTimeToSecond(shift.start_time);
                    const endTime = convertTimeToSecond(shift.end_time);
                    const check_in_time = shift.check_in_time ? convertTimeToSecond(shift.check_in_time) : 0;
                    const check_out_time = shift.check_out_time ? convertTimeToSecond(shift.check_out_time) : 0;
                    const status = (check_in_time && check_out_time) || item.timestamp < Math.floor(Date.now() / 1000) ? startTime >= check_in_time && endTime <= check_out_time ? "accepted" : "no-accepted" : "none";

                    return {
                        ...shift,
                        status
                    };


                });

                if (!isEmpty(filterStore.filter.checkin_out_status)) {
                    shifts = shifts.filter((shift) => (shift.status == filterStore.filter.checkin_out_status));
                }

                return {
                    ...user,
                    work_shifts: shifts,
                };
            });

            users = users.filter((item) => item.work_shifts.length > 0);
            return {
                ...item,
                users: users
            };
        });

        return data;

    }

}
