import {observable, action, computed} from "mobx";
import {
    loadEvaluateTeacherDetailStudentRatingApi,
    loadEvaluateTeachingAssistantDetailStudentRatingApi,
} from "../evaluateClassesApi";
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
    @observable comments = [];

    constructor(gens, selectedTeaching, baseId, selectedGenId, user) {
        this.gens = gens;
        this.selectedTeaching = selectedTeaching;
        this.selectedBaseId = baseId;
        this.selectedGenId = selectedGenId;
        this.user = user;
    }

    @action
    loadData(class_id) {
        this.isLoading = true;
        let api = this.selectedTeaching == "teacher" ?
            loadEvaluateTeacherDetailStudentRatingApi :
            loadEvaluateTeachingAssistantDetailStudentRatingApi
        api(this.selectedGenId, this.selectedBaseId, this.user.id,class_id).then((res) => {
            this.data = res.data.data.ratings;
            this.comments = res.data.data.comments;
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
        return helper.groupBy(this.data, classData => classData.class_id, ["class", "registers"]);
    }

    @computed
    get commentsDictionary() {
        return _.sortBy(this.comments, (comment) => comment.frequency).reverse();
    }
}