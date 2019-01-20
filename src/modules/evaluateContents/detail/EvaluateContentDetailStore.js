import {observable, action, computed} from "mobx";
import {
    loadEvaluateContentDetailApi
} from "../evaluateContentsApi";
// import * as helper from "../../../helpers/helper";

export default class EvaluateTeachingCheckinCheckout {

    @observable gens = [];
    @observable selectedGenId = 0;
    @observable user = 0;

    @observable isLoading = true;
    @observable data = {sum_paid_personal: 0, kpi:0};

    constructor(gens, selectedGenId, user) {
        this.gens = gens;
        this.selectedGenId = selectedGenId;
        this.user = user;
    }

    @action
    loadData() {
        if (this.user) {
            this.isLoading = true;
            loadEvaluateContentDetailApi(this.selectedGenId, this.user.id).then((res) => {
                this.data = res.data.data;
                // this.data = this.attendanceData(res.data.data.detail);
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



}