import {observable, action, computed} from "mobx";
import {
    loadEvaluateTeacherDetailCommentProductApi,
    loadEvaluateTeachingAssistantDetailCommentProductApi,
} from "../evaluateTeachingApi";

export default class EvaluateTeachingCheckinCheckout {
    @observable selectedTeaching = '';
    @observable gens = [];
    @observable selectedGenId = 0;
    @observable user = 0;

    @observable isLoading = true;
    @observable data = {};

    constructor(gens, selectedTeaching, selectedGenId, user) {
        this.gens = gens;
        this.selectedTeaching = selectedTeaching;
        this.selectedGenId = selectedGenId;
        this.user = user;
    }

    @action
    loadData() {
        this.isLoading = true;
        let api = this.selectedTeaching == "teacher" ?
            loadEvaluateTeacherDetailCommentProductApi :
            loadEvaluateTeachingAssistantDetailCommentProductApi;
        api(this.selectedGenId, this.user.id).then((res) => {
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
    get getDataValid() {
        return this.data.classes.map(function (itemClass) {
            let comments = itemClass.comments.filter((item) => item.valid);
            return {
                ...itemClass,
                comments
            };
        });
    }

    @computed
    get totalDataValid() {
        let totalComment = 0;
        this.getDataValid.forEach(function (itemClass) {
            totalComment += itemClass.comments.length;
        });

        return totalComment;
    }


    @computed
    get getDataInvalid() {
        return this.data.classes.map(function (itemClass) {
            let comments = itemClass.comments.filter((item) => !item.valid);
            return {
                ...itemClass,
                comments
            };
        });
    }

    @computed
    get totalDataInvalid() {
        let totalComment = 0;
        this.getDataInvalid.forEach(function (itemClass) {
            totalComment += itemClass.comments.length;
        });
        return totalComment;
    }
}