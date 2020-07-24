import {action, computed, observable} from "mobx";
import {convertTimeToSecond, showErrorNotification} from "../../../helpers/helper";
import {historyCheckinoutClassApi} from "./dashboardCheckinCheckoutApi";
import filterStore from "./filterStore";
import {getValueFromKey} from "../../../helpers/entity/object";
import {isEmpty} from "../../../helpers/entity/mobx";


export default class DashboardClassStore {
    @observable isLoading = false;
    @observable historyClasses = [];

    @action
    loadClasses = (filter) => {
        this.isLoading = true;
        historyCheckinoutClassApi(filter).then((res) => {
            this.historyClasses = res.data.history;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isLoading = false;
        });
    };

    @computed
    get classes() {
        let data = this.historyClasses.map((item) => {
            let classes = item.classes.map((itemClass) => {
                const overtime = item.timestamp <  Math.floor(Date.now() / 1000);
                const nullTeacher = getValueFromKey(itemClass, "current_lesson.teacher") == null;
                const nullTa = getValueFromKey(itemClass, "current_lesson.teaching_assistant") == null;
                const startTime = convertTimeToSecond(getValueFromKey(itemClass, "current_lesson.start_time"));
                const endTime = convertTimeToSecond(getValueFromKey(itemClass, "current_lesson.end_time"));
                const teacherCheckIn = getValueFromKey(itemClass, "current_lesson.teacher.check_in") ? convertTimeToSecond(getValueFromKey(itemClass, "current_lesson.teacher.check_in")) : 0;
                const teacherCheckOut = getValueFromKey(itemClass, "current_lesson.teacher.check_out") ? convertTimeToSecond(getValueFromKey(itemClass, "current_lesson.teacher.check_out")) : 0;
                const taCheckIn = getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_in") ? convertTimeToSecond(getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_in")) : 0;
                const taCheckOut = getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_out") ? convertTimeToSecond(getValueFromKey(itemClass, "current_lesson.teaching_assistant.check_out")) : 0;
                let teacherCheckInStatus = teacherCheckIn && !nullTeacher ? startTime >= teacherCheckIn ? "accepted" : "no-accepted" : "none";
                let teacherCheckOutStatus = teacherCheckOut && !nullTeacher ? endTime <= teacherCheckOut ? "accepted" : "no-accepted" : "none";
                let taCheckInStatus = taCheckIn && !nullTa ? startTime >= taCheckIn ? "accepted" : "no-accepted" : "none";
                let taCheckOutStatus = taCheckOut && !nullTa ? endTime <= taCheckOut ? "accepted" : "no-accepted" : "none";

                if (overtime && !teacherCheckIn && !nullTeacher) {
                    teacherCheckInStatus = "no-accepted";
                }
                if (overtime && !teacherCheckOut && !nullTeacher) {
                    teacherCheckOutStatus = "no-accepted";
                }
                if (overtime && !taCheckIn && !nullTa) {
                    taCheckInStatus = "no-accepted";
                }
                if (overtime && !taCheckOut && !nullTa) {
                    taCheckOutStatus = "no-accepted";
                }

                return {
                    ...itemClass,
                    teacherCheckInStatus,
                    teacherCheckOutStatus,
                    taCheckInStatus,
                    taCheckOutStatus
                };
            });

            if (!isEmpty(filterStore.filter.checkin_out_status)) {
                classes = classes.filter((itemClass) => (itemClass.teacherCheckInStatus == filterStore.filter.checkin_out_status ||
                    itemClass.teacherCheckOutStatus == filterStore.filter.checkin_out_status ||
                    itemClass.taCheckInStatus == filterStore.filter.checkin_out_status ||
                    itemClass.taCheckOutStatus == filterStore.filter.checkin_out_status)
                );
            }

            return {
                ...item,
                classes: classes
            };
        });

        return data;

    }

}
