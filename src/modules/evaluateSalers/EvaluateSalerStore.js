import {observable, action, computed} from "mobx";
import {
    loadBasesApi,
    loadEvaluateSalersApi,
    loadEvaluateSalerByGensApi,
    loadGensApi
} from "./evaluateSalerApi";
import * as helper from "../../helpers/helper";
import {isEmptyInput} from "../../helpers/helper";
import {convertTimeToSecond} from "../../helpers/helper";

export default new class evaluateTeachingStore {
    @observable selectedUser = {};
    @observable isLoadingGen = false;
    @observable gens = [];
    @observable isLoadingBase = false;
    @observable bases = [];
    @observable selectedGenId = 0;
    @observable selectedBaseId = 0;
    @observable selectedData = {};
    @observable isLoading = true;
    @observable showModalDetail = false;
    @observable showModalShift = false;
    @observable shift_type = "shifts";
    @observable data = [];
    @observable salerId = null;


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
        console.log(this.salerId);
        if (!this.salerId) {
            loadEvaluateSalersApi(this.selectedGenId, this.selectedBaseId).then((res) => {
                this.data = res.data.data.salers.map((obj) => {
                    return this.attendanceData(obj);
                });
                console.log(res.data.data.salers.map((obj) => {
                    return this.attendanceData(obj);
                }));
            }).finally(() => {
                this.isLoading = false;
            });
        }else {
            loadEvaluateSalerByGensApi(this.salerId).then((res) => {
                this.data = res.data.data.detail.map((obj) => {
                    return this.attendanceData(obj);
                });
            }).finally(() => {
                this.isLoading = false;
            });
        }
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
        let passed = this.checkincheckoutPassed(item, "work_shifts");
        let notPassed = this.checkincheckoutRejected(item, "work_shifts");
        let res = {};
        res.raito = Math.round(passed.length * 100 / (passed.length + notPassed.length));
        item["work_shift_detail"] = res;

        passed = this.checkincheckoutPassed(item, "shifts");
        notPassed = this.checkincheckoutRejected(item, "shifts");
        res = {};
        res.raito = Math.round(passed.length * 100 / (passed.length + notPassed.length));
        item["shift_detail"] = res;
        return item;


    }

    checkincheckoutPassed(data, shift_type) {
        return data[shift_type].filter((item) => {
            if (isEmptyInput(item.checkin_id) || isEmptyInput(item.checkout_id)) {
                return false;
            }
            if (!item.checkin_id || !item.checkout_id) {
                return false;
            }

            if (convertTimeToSecond(item.checkin_time) > convertTimeToSecond(item.start_time)) {
                return false;
            }

            if (convertTimeToSecond(item.checkout_time) < convertTimeToSecond(item.end_time)) {
                return false;
            }

            return true;
        })
    }


    checkincheckoutRejected(data, shift_type) {
        return data[shift_type].filter((item) => {
            if (isEmptyInput(item.checkin_id) || isEmptyInput(item.checkout_id)) {
                return true;
            }

            if (!item.checkin_id || !item.checkout_id) {
                return true;
            }


            if (convertTimeToSecond(item.checkin_time) > convertTimeToSecond(item.start_time)) {
                return true;
            }

            if (convertTimeToSecond(item.checkout_time) < convertTimeToSecond(item.end_time)) {
                return true;
            }

            return false;
        })
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