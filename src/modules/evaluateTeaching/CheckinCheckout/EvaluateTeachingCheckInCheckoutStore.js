import {observable, action, computed} from "mobx";
import {
    loadEvaluateTeacherDetailCheckinCheckoutApi,
    loadEvaluateTeachingAssistantDetailCheckinCheckoutApi,
} from "../evaluateTeachingApi";
import {convertTimeToSecond, isEmptyInput} from "../../../helpers/helper";

export default class EvaluateTeachingCheckinCheckout {
    @observable selectedTeaching = '';
    @observable gens = [];
    @observable selectedGenId = 0;
    @observable selectedBaseId = 0;
    @observable user = 0;

    @observable isLoading = true;
    @observable data = [];

    constructor(gens, selectedTeaching, baseId, selectedGenId, user) {
        this.gens = gens;
        this.selectedTeaching = selectedTeaching;
        this.selectedBaseId = baseId;
        this.selectedGenId = selectedGenId;
        this.user = user;
    }

    @action
    loadData() {
        this.isLoading = true;
        let api = this.selectedTeaching == "teacher" ?
            loadEvaluateTeacherDetailCheckinCheckoutApi :
            loadEvaluateTeachingAssistantDetailCheckinCheckoutApi
        api(this.selectedGenId, this.selectedBaseId, this.user.id).then((res) => {
            this.data = res.data.data;
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

    @computed
    get checkincheckoutPassed() {
        return this.data.filter((item) => {
            if (isEmptyInput(item.check_in) || isEmptyInput(item.check_out)) {
                return false;
            }

            if (convertTimeToSecond(item.check_in.time) > convertTimeToSecond(item.start_time)) {
                return false;
            }

            if (convertTimeToSecond(item.check_out.time) < convertTimeToSecond(item.end_time)) {
                return false;
            }

            return true;
        })
    }

    @computed
    get checkincheckoutRejected() {
        return this.data.filter((item) => {
            if (isEmptyInput(item.check_in) || isEmptyInput(item.check_out)) {
                return true;
            }

            if (convertTimeToSecond(item.check_in.time) > convertTimeToSecond(item.start_time)) {
                return true;
            }

            if (convertTimeToSecond(item.check_out.time) < convertTimeToSecond(item.end_time)) {
                return true;
            }

            return false;
        })
    }
}