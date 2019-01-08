import {observable, action, computed} from "mobx";
import {
    addBonusSalaryApi, getDetailSalaryBonusApi,
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
    @observable openModalAddSalaryBonus = false;
    @observable openModalDetailSalaryBonus = false;
    @observable isAddingSalaryBonus = false;
    @observable isLoadingDetailSalaryBonus = false;
    @observable data = {};
    @observable salaryBonus = {
        teachingSalaryId: 0,
        amount: 0,
        note: ''
    };
    @observable detailSalaryBonus = [];


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

    @action
    submitAddSalaryBonus() {
        this.isAddingSalaryBonus = true;
        addBonusSalaryApi(this.salaryBonus.teachingSalaryId, this.salaryBonus.amount, this.salaryBonus.note).then((res) => {
            this.openModalAddSalaryBonus = false;
            const teachers = this.data.teachers.map((item) => {
                if (item.teaching_salary_id == res.data.data.bonus.teaching_salary_id) {
                    return {
                        ...item,
                        bonus: res.data.data.total_bonus
                    }
                }
                return item;
            });
            const teaching_assistant = this.data.teaching_assistant.map((item) => {
                if (item.teaching_salary_id == res.data.data.bonus.teaching_salary_id) {
                    return {
                        ...item,
                        bonus: res.data.data.total_bonus
                    }
                }
                return item;
            });
            this.data = {
                ...this.data,
                teachers,
                teaching_assistant
            }

        }).finally(() => {
            this.isAddingSalaryBonus = false;
        });
    }

    @action
    getDetailSalaryBonus = (teachingSalaryId) => {
        this.isLoadingDetailSalaryBonus = true;
        getDetailSalaryBonusApi(teachingSalaryId).then((res) => {
            this.detailSalaryBonus = res.data.data.salary_bonuses;
        }).finally(() => {
            this.isLoadingDetailSalaryBonus = false;
        })
    };


    @computed
    get totalSalary() {
        let total = 0;
        this.getData.map((data) => {
            const level = data.user.salary_level ? data.user.salary_level : {};
            const total_salary = (level.teacher_salary * data.total_attendance_teacher || 0)
                + (level.ta_salary * data.total_attendance_ta || 0) + data.user.salary + (data.bonus || 0);
            total += total_salary;
        });

        return total;
    }

    @computed
    get getData() {
        if (isEmptyInput(this.data)) {
            return null;
        }
        let data = this.data;
        let result = _.map(data.teachers, function (item) {
            return _.merge(item, data.teaching_assistant.filter(itemData => itemData.user.id == item.user.id)[0]);
        });
        _.forEach(data.teaching_assistant, function (item) {
            let findTeachingAssistant = result.filter(itemData => itemData.user.id == item.user.id)[0];
            if (findTeachingAssistant == undefined) {
                result = [...result, item];
            }

        });

        console.log(result);
        return result;

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

    @computed get totalBonus() {
        return _.sumBy(this.detailSalaryBonus, "amount");
    }
}