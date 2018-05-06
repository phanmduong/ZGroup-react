/**
 * Created by Kiyoshitaro on 04/05/18.
 */

import {observable, action, computed} from "mobx";
import {showErrorNotification} from "../../helpers/helper";
import * as scheduleTeachingApis from "./scheduleTeachingApis";

export default new class ScheduleTeachingStore {
    @observable isLoadingClasses = false;
    @observable isLoadingGens = false;
    @observable isLoadingBases = false;
    @observable classes = [];
    @observable isShowClassModal = false;
    @observable isLoadingClass = false;
    @observable classInModal = {};
    @observable class_id = 0;
    @observable currentGen = 0;
    @observable gens = [];
    @observable bases = [];
    @observable genId = 0;
    @observable baseId = 0;

    @action
    loadClasses() {
        this.isLoadingClasses = true;
        scheduleTeachingApis.loadClassesApi(this.genId,this.baseId)
            .then((res) => {
                this.classes = res.data.classes;
                this.isLoadingClasses = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingClasses = false;
            });

    }

    @action
    loadClass(classId) {
        this.isLoadingClass = true;
        scheduleTeachingApis.loadClass(classId)
            .then((res) => {
                this.classInModal = res.data.data.class;
                this.isLoadingClass = false;
            })
            .catch(() => {
                this.isLoadingClass = false;
            });
    }

    @action
    loadGens() {
        this.isLoadingGens = true;
        scheduleTeachingApis.loadGens()
            .then((res) => {
                this.isLoadingGens = false;
                this.gens = res.data.data.gens;
                this.genId = res.data.data.current_gen.id;
                // console.log(this.genId ,"xxxxxxxx",res.data.data.current_gen);
            })
            .catch(() => {
                this.isLoadingGens = false;
            });
    }

    @action
    loadBases() {
        this.isLoadingBases = true;
        scheduleTeachingApis.loadBases()
            .then((res) => {
                this.isLoadingBases = false;
                this.bases = res.data.data.bases;
            })
            .catch(() => {
                this.isLoadingBases = false;
            });
    }

    @computed
    get gensData() {
        let gensData = this.gens.map(function (gen) {
            return {
                key: gen.id,
                value: "Khóa " + gen.name,
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...gensData,
        ];
    }

    @computed
    get basesData() {
        let basesData = this.bases.map(function (base) {
            return {
                key: base.id,
                value:  base.name,
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...basesData,
        ];
    }


}();