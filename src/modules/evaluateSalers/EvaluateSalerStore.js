import {observable, action, computed} from "mobx";
import {
    loadBasesApi,
    loadEvaluateSalersApi,
    loadGensApi
} from "./evaluateSalerApi";
import * as helper from "../../helpers/helper";

export default new class evaluateTeachingStore {
    @observable selectedUser = {};
    @observable isLoadingGen = false;
    @observable gens = [];
    @observable isLoadingBase = false;
    @observable bases = [];
    @observable selectedGenId = 0;
    @observable selectedBaseId = 0;
    @observable isLoading = true;
    @observable data = [];


    @action
    loadGens() {
        this.isLoadingGen = true;
        loadGensApi().then((res) => {
            this.gens = res.data.data.gens;
            if (this.selectedGenId == 0) {
                this.selectedGenId = res.data.data.teaching_gen.id;
            }
        }).finally(() => {
            this.isLoadingGen = false;
        });
    }

    @action
    loadBases() {
        this.isLoadingBase = true;
        loadBasesApi().then((res) => {
            this.bases = res.data.data.bases;
        }).finally(() => {
            this.isLoadingBase = false;
        });
    }

    @action
    loadEvaluate() {
        this.isLoading = true;
        loadEvaluateSalersApi(this.selectedGenId, this.selectedBaseId).then((res) => {
            this.data = res.data.data.salers.map((obj)=>{
                return this.attendanceData(obj);
            });
            console.log(res.data.data.salers.map((obj)=>{
                return this.attendanceData(obj);
            }));
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @computed
    get gensData() {
        return this.gens.map(function (gen) {
            return {
                key: gen.id,
                value: 'Khóa ' + gen.name
            };
        });
    }

    attendanceData = (item) => {

        let total_attendance = 0;
        let total_not_work = 0;
        let total_not_checkin = 0;
        let total_not_checkout = 0;
        let total_checkin_late = 0;
        let total_checkout_early = 0;
        let total_lawful = 0;
        item.work_shifts = item.work_shifts.map((attendance) => {
            let message = null;
            let isDelinquent = false;
            if (helper.isNull(attendance.checkin_id) && helper.isNull(attendance.checkout_id)) {
                attendance.isNotWork = true;
                attendance.message = "Không checkin, không checkout";
                total_not_work++;
                return attendance;
            }
            if (attendance.checkin_id) {
                let rangeTimeCheckIn = helper.convertTimeToSecond(attendance.checkin_time.substr(0, 5)) -
                    helper.convertTimeToSecond(attendance.start_time);
                if (rangeTimeCheckIn > 60) {
                    message = 'Check in muộn ' + (rangeTimeCheckIn / 60) + ' phút';
                    attendance.isCheckinLate = true;
                    total_checkin_late++;
                    isDelinquent = true;
                }
            } else {
                attendance.isNotCheckin = true;
                total_not_checkin++;
                message = "Không check in";
                isDelinquent = true;
            }

            if (attendance.checkout_id) {
                let rangeTimeCheckOut =
                    helper.convertTimeToSecond(attendance.end_time) -
                    helper.convertTimeToSecond(attendance.checkout_time.substr(0, 5));
                if (rangeTimeCheckOut > 60) {
                    message = message ? message + ", " : "";
                    message += 'check out sớm ' + (rangeTimeCheckOut / 60) + ' phút';
                    attendance.isCheckoutEarly = true;
                    total_checkout_early++;
                    isDelinquent = true;
                }
            } else {
                message = message ? message + ", " : "";
                message += "không check out";
                isDelinquent = true;
                attendance.isNotCheckout = true;
                total_not_checkout++;
            }

            if (!isDelinquent) {
                attendance.isLawful = true;
                total_lawful++;
            }

            if (attendance.checkin_id || attendance.checkout_id) {
                attendance.attendance = true;
                total_attendance++;
            }
            attendance.message = message;
            return attendance;
        });
        let res = {};
        res.total_attendance = total_attendance;
        res.total_not_work = total_not_work;
        res.total_not_checkin = total_not_checkin;
        res.total_not_checkout = total_not_checkout;
        res.total_checkin_late = total_checkin_late;
        res.total_checkout_early = total_checkout_early;
        res.total_lawful = total_lawful;
        item["work_shift_detail"] = res;



        total_attendance = 0;
        total_not_work = 0;
        total_not_checkin = 0;
        total_not_checkout = 0;
        total_checkin_late = 0;
        total_checkout_early = 0;
        total_lawful = 0;
        item.shifts = item.shifts.map((attendance) => {
            let message = null;
            let isDelinquent = false;
            if (helper.isNull(attendance.checkin_id) && helper.isNull(attendance.checkout_id)) {
                attendance.isNotWork = true;
                attendance.message = "Không checkin, không checkout";
                total_not_work++;
                return attendance;
            }
            if (attendance.checkin_id) {
                let rangeTimeCheckIn = helper.convertTimeToSecond(attendance.checkin_time.substr(0, 5)) -
                    helper.convertTimeToSecond(attendance.start_time);
                if (rangeTimeCheckIn > 60) {
                    message = 'Check in muộn ' + (rangeTimeCheckIn / 60) + ' phút';
                    attendance.isCheckinLate = true;
                    total_checkin_late++;
                    isDelinquent = true;
                }
            } else {
                attendance.isNotCheckin = true;
                total_not_checkin++;
                message = "Không check in";
                isDelinquent = true;
            }

            if (attendance.checkout_id) {
                let rangeTimeCheckOut =
                    helper.convertTimeToSecond(attendance.end_time) -
                    helper.convertTimeToSecond(attendance.checkout_time.substr(0, 5));
                if (rangeTimeCheckOut > 60) {
                    message = message ? message + ", " : "";
                    message += 'check out sớm ' + (rangeTimeCheckOut / 60) + ' phút';
                    attendance.isCheckoutEarly = true;
                    total_checkout_early++;
                    isDelinquent = true;
                }
            } else {
                message = message ? message + ", " : "";
                message += "không check out";
                isDelinquent = true;
                attendance.isNotCheckout = true;
                total_not_checkout++;
            }

            if (!isDelinquent) {
                attendance.isLawful = true;
                total_lawful++;
            }

            if (attendance.checkin_id || attendance.checkout_id) {
                attendance.attendance = true;
                total_attendance++;
            }
            attendance.message = message;
            return attendance;
        });
        res = {};
        res.total_attendance = total_attendance;
        res.total_not_work = total_not_work;
        res.total_not_checkin = total_not_checkin;
        res.total_not_checkout = total_not_checkout;
        res.total_checkin_late = total_checkin_late;
        res.total_checkout_early = total_checkout_early;
        res.total_lawful = total_lawful;
        item["shift_detail"] = res;
        return item;


    }

    @computed
    get basesData() {
        let baseData = this.bases.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...baseData
        ];
    }
}