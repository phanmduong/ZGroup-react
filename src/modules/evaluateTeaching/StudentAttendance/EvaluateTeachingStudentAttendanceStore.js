import {observable, action, computed} from "mobx";
import {
    loadEvaluateTeacherDetailStudentAttendanceApi,
    loadEvaluateTeachingAssistantDetailStudentAttendanceApi,
} from "../evaluateTeachingApi";
import * as helper from "../../../helpers/helper";
import _ from 'lodash';


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
            loadEvaluateTeacherDetailStudentAttendanceApi :
            loadEvaluateTeachingAssistantDetailStudentAttendanceApi;
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
    get getData() {
        let data = helper.groupBy(this.data, classData => classData.class_id, ["class", "lessons"]);

        data = data.map((classData) => {
            const max_total_student = _.maxBy(classData.lessons, 'total_student_attendance').total_student_attendance;
            classData.ratio_attendance = _.sumBy(classData.lessons, 'total_student_attendance') * 100 /
                (max_total_student * classData.lessons.length);

            classData.lessons = classData.lessons.map((lesson) => {
                return {...lesson, max_total_student};
            });

            return classData;
        });

        return data;
    }
}