import {observable, action, computed} from "mobx";
import {loadEvaluateSalerDetailApi} from "../evaluateSalerApi";
import {convertTimeToSecond, isEmptyInput} from "../../../helpers/helper";

export default class EvaluateTeachingCheckinCheckout {
    @observable gens = [];
    @observable selectedGenId = 0;
    @observable shift_type = "shifts";
    @observable selectedBaseId = 0;
    @observable user = 0;

    @observable isLoading = true;
    @observable data = [];

    constructor(gens,  selectedGenId, user, shift_type = 'shifts') {
        this.gens = gens;
        this.selectedGenId = selectedGenId;
        this.user = user;
        this.shift_type = shift_type;
    }

    @action
    loadData() {
        this.isLoading = true;
        loadEvaluateSalerDetailApi(this.selectedGenId, this.user.id).then((res) => {
            this.data = res.data.data.detail;
            // console.log(res.data.data.detail);
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
        return this.data[this.shift_type].filter((item) => {
            // console.log(item);
            if (isEmptyInput(item.checkin_id) || isEmptyInput(item.checkout_id)) {
                return false;
            }
            if (!item.checkin_id || !item.checkout_id) {
                return false;
            }

            if ((convertTimeToSecond(item.checkin_time) > convertTimeToSecond(item.start_time))
                &&Math.abs(convertTimeToSecond(item.checkin_time) - convertTimeToSecond(item.start_time)) > 60) {

                return false;
            }

            if ((convertTimeToSecond(item.checkout_time) < convertTimeToSecond(item.end_time))
                &&Math.abs(convertTimeToSecond(item.checkout_time) - convertTimeToSecond(item.end_time)) > 60) {

                return false;
            }

            return true;
        });
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

            if ((convertTimeToSecond(item.checkin_time) > convertTimeToSecond(item.start_time))
                &&Math.abs(convertTimeToSecond(item.checkin_time) - convertTimeToSecond(item.start_time)) > 60) {

                return true;
            }

            if ((convertTimeToSecond(item.checkout_time) < convertTimeToSecond(item.end_time))
                &&Math.abs(convertTimeToSecond(item.checkout_time) - convertTimeToSecond(item.end_time)) > 60) {

                return true;
            }

            return false;
        });
    }
}