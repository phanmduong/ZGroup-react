import {observable, action, computed} from "mobx";
import {
    loadBasesApi,
    loadEvaluateTeacherApi,
    loadEvaluateTeachingAssistantApi,
    loadGensApi
} from "./evaluateTeachingApi";

export default new class evaluateTeachingStore {
    @observable showModalCheckinCheckout = false;
    @observable selectedUser = {};
    @observable isLoadingGen = false;
    @observable gens = [];
    @observable isLoadingBase = false;
    @observable bases = [];
    @observable selectedGenId = 0;
    @observable selectedBaseId = 0;
    @observable teachings = [
        {
            key: 'teacher',
            value: 'Giảng viên',
        },
        {
            key: 'teaching_assistant',
            value: 'Trợ giảng',
        }
    ];
    @observable selectedTeaching = "teacher";
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
        let api = this.selectedTeaching == "teacher" ? loadEvaluateTeacherApi : loadEvaluateTeachingAssistantApi
        api(this.selectedGenId, this.selectedBaseId).then((res) => {
            this.data = res.data;
            console.log(this.data);
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