import {observable, action} from "mobx";
import {
    loadEvaluatePersonTeacherApi,
    loadEvaluatePersonTeachingAssistantApi,
} from "../evaluateTeachingApi";

export default new class evaluatePersonTeachingStore {
    @observable showModalCheckinCheckout = false;
    @observable showModalStudentAttendance = false;
    @observable showModalStudentRating = false;
    @observable selectedUser = {};
    @observable selectedGenId = 0;
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
    loadEvaluate() {
        this.isLoading = true;
        let api = this.selectedTeaching == "teacher" ? loadEvaluatePersonTeacherApi : loadEvaluatePersonTeachingAssistantApi
        api(this.selectedUser.id).then((res) => {
            this.data = res.data;
        }).finally(() => {
            this.isLoading = false;
        });
    }
}