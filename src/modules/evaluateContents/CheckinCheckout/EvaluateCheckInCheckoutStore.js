import {observable, action, computed} from "mobx";
import {loadEvaluateContentDetailApi} from "../evaluateContentsApi";
import {convertTimeToSecond, isEmptyInput} from "../../../helpers/helper";

export default class EvaluateTeachingCheckinCheckout {
    @observable gens = [];
    @observable selectedGenId = 0;
    @observable shift_type = "work_shifts";
    @observable selectedBaseId = 0;
    @observable user = 0;

    @observable isLoading = true;
    @observable data = [];

    constructor(gens,  selectedGenId, user, shift_type = 'work_shifts') {
        this.gens = gens;
        this.selectedGenId = selectedGenId;
        this.user = user;
        this.shift_type = shift_type;
    }

    @action
    loadData() {
        this.isLoading = true;
        loadEvaluateContentDetailApi(this.selectedGenId, this.user.id).then((res) => {
            this.data = res.data.data;
            console.log(res.data.data);
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
        console.log(this.shift_type);
        return this.data[this.shift_type].filter((item) => {
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

    @computed
    get checkincheckoutRejected() {
        return this.data[this.shift_type].filter((item) => {
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
}