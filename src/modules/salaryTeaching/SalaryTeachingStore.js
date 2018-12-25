import {observable, action, computed} from "mobx";
import {
    loadBasesApi,
    loadGensApi, loadSalaryApi
} from "./salaryTeachingApi";
import _ from 'lodash';
import {isEmptyInput} from "../../helpers/helper";

export default new class salaryTeachingStore {
    @observable isLoadingGen = false;
    @observable gens = [];
    @observable isLoadingBase = false;
    @observable bases = [];
    @observable selectedGenId = 0;
    @observable selectedBaseId = 0;
    @observable isLoading = true;
    @observable data = {};


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
    loadSalaryTeaching() {
        this.isLoading = true;
        loadSalaryApi(this.selectedGenId, this.selectedBaseId).then((res) => {
            this.data = res.data;
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @computed
    get getData() {
        if (isEmptyInput(this.data)) {
            return null;
        }
        let data = this.data;
        return _.map(data.teachers, function (item) {
            return _.merge(item, data.teaching_assistant.filter(itemData => itemData.user.id == item.user.id)[0]);
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