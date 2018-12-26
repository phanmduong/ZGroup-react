import {observable, action, computed} from "mobx";
import {
    loadBasesApi,
    loadEvaluateClassesApi,
    loadGensApi, loadCoursesApi
} from "./evaluateClassesApi";

export default new class evaluateTeachingStore {
    @observable selectedUser = {};
    @observable isLoadingGen = false;
    @observable isLoadingCourse = false;
    @observable gens = [];
    @observable isLoadingBase = false;
    @observable bases = [];
    @observable courses = [];
    @observable selectedGenId = 0;
    @observable selectedBaseId = 0;
    @observable selectedCourseId = 0;
    @observable isLoading = true;
    @observable showModalAttendance = false;
    @observable showModalHomework = false;
    @observable showModalRating = false;
    @observable data = [];
    @observable attendanceDetail = {};
    @observable homeworkDetail = {};
    @observable ratingDetail = {};


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
    loadCourses() {
        this.isLoadingCourse = true;
        loadCoursesApi().then((res) => {
            this.courses = res.data.data.courses;
        }).finally(() => {
            this.isLoadingCourse = false;
        });
    }

    @action
    loadEvaluate() {
        this.isLoading = true;
        let api = loadEvaluateClassesApi;
        api(this.selectedGenId, this.selectedBaseId, this.selectedCourseId).then((res) => {
            this.data = res.data;
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

    @computed
    get courseData() {
        let courseData = this.courses.map(function (obj) {
            return {
                key: obj.id,
                value: obj.name
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...courseData
        ];
    }
}